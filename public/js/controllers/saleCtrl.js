angular
    .module('app')
    .controller('saleCtrl', saleCtrl);

saleCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'userService', 'productService', 'saleService', 'saleTempService', 'sourceService'];

function saleCtrl($state, $scope, $http, $rootScope, ngToast, userService, productService, saleService, saleTempService, sourceService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    // clode modal new purchase
    $scope.closeNew = function () {
        $('#addNewSale').modal('hide');
        $scope.saleReset();
		$scope.refreshTemp();
    }

    // get sale and for refresh
    $scope.refresh = function () {

        saleService.getAll(function (response) {

            $scope.sales = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

    }

    // get data items
    productService.getAll(function (response) {

        $scope.products = response;

    }, function(){
			
			// if want add error message or something just like this. xD
		
	});
    
    // get data market
    sourceService.getAll(function (response) {

        $scope.sources = response;

    }, function(){
			
			// if want add error message or something just like this. xD
		
	});
    
    // get purchase temp and for refresh
    $scope.refreshTemp = function () {
        saleTempService.getAll(function (response) {

            $scope.saleTemps = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
		});
    }


    // load one for detail purchase
    $scope.load = function (purchaseId) {

        saleService.getById(purchaseId, function (response) {

            $scope.detailSales = response;
        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

        $('#detailSale').modal('show');
    }

    // new purchase temp
    $scope.addSaleTemp = function (product) {

        saleTempService.create({

            product_id: product.id,
            saleTemp_price: product.product_cost,
            saleTemp_total: product.product_cost

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
    $scope.updateSaleTemp = function (saleTempId, newTemp) {
        saleTempService.update(
            $scope.saleTempId = newTemp.id, {
                saleTemp_quantity: newTemp.saleTemp_quantity,
                saleTemp_extra: newTemp.saleTemp_extra,
                saleTemp_discount: newTemp.saleTemp_discount,
                saleTemp_total: newTemp.saleTemp_price * newTemp.saleTemp_quantity + newTemp.saleTemp_extra * 1 - newTemp.saleTemp_discount
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
            total += parseFloat(newTemp.saleTemp_price * newTemp.saleTemp_quantity + newTemp.saleTemp_charge * 1 - newTemp.saleTemp_discount);
        });
        return total;
    }

	// remove purchase temp
    $scope.removeSaleTemp = function (saleTempId) {

        saleTempService.remove(saleTempId, function () {
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
    $scope.createSale = function (isValid) { // fungsi dimana saat proses form terjadi
        if (isValid) {

            saleService.create({

                sale_date: $scope.saleDate,
                sale_nomor: $scope.saleNomor,
                source_id: $scope.sourceId,
                sale_info: $scope.saleInfo

            }, function () {

                $('#addNewSale').modal('hide');
                $scope.refresh();
                $scope.refreshTemp();
				$scope.saleReset();
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
    $scope.saleReset = function () {
        $scope.saleDate = '';
        $scope.saleNomor = '';
        $scope.sourceId = '';
        $scope.saleInfo = '';
    }

    // cek user
    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.sales = [];
    $scope.saleTemps = [];
    $scope.products = [];
    $scope.newTemp = {};

    $scope.refresh();
    $scope.refreshTemp();
}
