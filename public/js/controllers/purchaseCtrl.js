angular
    .module('app')
    .controller('purchaseCtrl', purchaseCtrl);

purchaseCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'purchaseService', 'userService', 'productService', 'supplierService', 'purchaseApiService', 'purchaseTempService'];

function purchaseCtrl($state, $scope, $http, $rootScope, ngToast, purchaseService, userService, productService, supplierService, purchaseApiService, purchaseTempService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    // clode modal new purchase
    $scope.closeNew = function () {
        $('#addNewPurchase').modal('hide');
        $scope.purchaseReset();
		$scope.refreshTemp();
    }

    // get purchase and for refresh
    $scope.refresh = function () {

        purchaseService.getAll(function (response) {

            $scope.purchases = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

    }

    // get data supplier
    supplierService.getAll(function (response) {

        $scope.suppliers = response;

    }, function(){
			
			// if want add error message or something just like this. xD
		
	});

    // get data items
    productService.getAll(function (response) {

        $scope.products = response;

    }, function(){
			
			// if want add error message or something just like this. xD
		
	});

    // get purchase temp and for refresh
    $scope.refreshTemp = function () {
        purchaseTempService.getAll(function (response) {

            $scope.purchasetemps = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
		});
    }


    // load one for detail purchase
    $scope.load = function (purchaseId) {

        purchaseService.getById(purchaseId, function (response) {

            $scope.detailP = response;
            
        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

        $('#detailPurchase').modal('show');
    }

    // new purchase temp
    $scope.addPurchaseTemp = function (product, newpurchasetemp) {

        purchaseTempService.create({

            product_id: product.id,
            purchaseTemp_price: product.product_cost,
            purchaseTemp_total: product.product_cost

        }, function () {

            $scope.refreshTemp();
            setTimeout(function () {
                ngToast.create({
                    className: 'info',
					
                    content: '<i class="fa fa-info-circle"></i> Product add in the list.'
                });
            }, 200);
			
        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }

    // update purchase temp
    $scope.updatePurchaseTemp = function (purchaseTempId, newTemp) {
        purchaseTempService.update(
            $scope.purchaseTempId = newTemp.id, {
                purchaseTemp_quantity: newTemp.purchaseTemp_quantity,
                purchaseTemp_charge: newTemp.purchaseTemp_charge,
                purchaseTemp_discount: newTemp.purchaseTemp_discount,
                purchaseTemp_total: newTemp.purchaseTemp_price * newTemp.purchaseTemp_quantity + newTemp.purchaseTemp_charge * 1 - newTemp.purchaseTemp_discount
            }, 
			function(response){

			     // if want add notif or something just like this.

			}, function(response){
 
                // if want add notif or something just like this.
            }
        );

    }
	
	// sum total
    $scope.sum = function (list) {
        var total = 0;
        angular.forEach(list, function (newTemp) {
            total += parseFloat(newTemp.purchaseTemp_price * newTemp.purchaseTemp_quantity + newTemp.purchaseTemp_charge * 1 - newTemp.purchaseTemp_discount);
        });
        return total;
    }

	// remove purchase temp
    $scope.removePurchaseTemp = function (purchaseTempId) {

        purchaseTempService.remove(purchaseTempId, function () {
            $scope.refreshTemp();
            setTimeout(function () {
                ngToast.create({
                    className: 'warning',
					
                    content: '<i class="fa fa-warning"></i> Product removed from the list.'
                });
            }, 200);

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"><strong> Oh no!</strong> Something went wrong.'
                });
            }, 200);
        });

    }

    // create new purchase
    $scope.createPurchase = function (isValid) { // fungsi dimana saat proses form terjadi
        if (isValid) {

            purchaseService.create({

                purchase_date: $scope.purchaseDate,
                purchase_order: $scope.purchaseOrder,
                supplier_id: $scope.supplierId,
                purchase_info: $scope.purchaseInfo

            }, function () {

                $('#addNewPurchase').modal('hide');
                $scope.refresh();
                $scope.refreshTemp();
				$scope.purchaseReset();
            }, function () {

                setTimeout(function () {
                    ngToast.create({
                        className: 'danger',
                        content: '<i class="fa fa-times-circle"><strong> Oh no!</strong> Something went wrong.'
                    });
                }, 500);
            });

        } else {
            $scope.submitted = true;
            ngToast.create({
                className: 'danger',
                content: '<i class="fa fa-times-circle"><strong> Oh no!</strong> Please completely field first.'
            });
        }
    }

	// reset field
    $scope.purchaseReset = function () {
        $scope.purchaseDate = '';
        $scope.purchaseNomor = '';
        $scope.supplierId = '';
        $scope.purchaseInfo = '';
    }

    // cek user
    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.purchases = [];
    $scope.purchasetemps = [];
    $scope.products = [];
    $scope.suppliers = [];
    $scope.newTemp = {};

    $scope.refresh();
    $scope.refreshTemp();
}
