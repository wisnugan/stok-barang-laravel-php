angular
    .module('app')
    .controller('returnCtrl', returnCtrl);

returnCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'returnService', 'userService', 'purchaseApiService', 'returnTempService', 'purchaseService'];

function returnCtrl($state, $scope, $http, $rootScope, ngToast, returnService, userService,   purchaseApiService, returnTempService, purchaseService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    // clode modal new return
    $scope.closeNew = function () {
        $('#addNewReturn').modal('hide');
        $scope.returnReset();

    }
    
    // clode modal new return
    $scope.closeEdit = function () {
        $('#editReturn').modal('hide');
        $scope.returnReset();

    }
    
    // get return data and refresh
    $scope.refresh = function () {

        returnService.getAll(function (response) {

            $scope.returns = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

    }

    // get purchase data
    purchaseApiService.getAll(function (response) {

        $scope.purchases = response;

    }, function(){
			
			// if want add error message or something just like this. xD
		
	});
    
    // get purchase item from purchase
    $scope.getPI = function (purchaseId) {
            $scope.productId = null; // Clear Selected State if any
            $scope.pItem = null; // Clear previously loaded product list
            $scope.ss = null; 
        
            // get purchase data
        
            $scope.textToShow = "Please wait..."; // loading data
        
            // load purchase item
            purchaseService.getById(purchaseId, function (response) {

                $scope.pItem = response;
                $scope.textToShow = "Select product";
                
                $scope.supplierId = $scope.pItem[0].supplier_id;
            }, function(){
			
			// if want add error message or something just like this. xD
		
            });
    }
    
    // load one for detail purchase
    $scope.load = function (returnId) {

        returnService.getById(returnId, function (response) {

            $scope.returnId = response.return_purchase.id;
            $scope.purchaseId = response.return_purchase.purchase.purchase_order;
            $scope.productId = response.return_purchase.product.product_name;
            $scope.returnQty = response.return_purchase.return_quantity;
            $scope.returnCharge = response.return_purchase.return_charge;
            $scope.returnInfo = response.return_purchase.return_info;
            
        }, function(){
			
			// if want add error message or something just like this. xD
		
		});

        $('#editReturn').modal('show');
    }

    $scope.updateReturn = function (isValid) { // validatio form if empty
        if (isValid) {
            returnService.update(
                $scope.returnId, 
                {
                    return_quantity: $scope.returnQty,
                    return_charge: $scope.returnCharge,
                    return_info: $scope.returnInfo
                }, 
                function(response){

                    $('#editReturn').modal('toggle');
                    $scope.returnReset();
                    $scope.refresh();
					
					// notif update success
					setTimeout(function () {

						ngToast.create({
							className: 'success',
							content: '<i class="fa fa-check-circle"></i>The update has completed successfully.'
						});

					}, 500);
				
                }, function(response){
                    setTimeout(function () {
                        ngToast.create({ // error communication with backend
                        className: 'danger',
                        content: '<strong>Oh no!</strong> There was an error.'
                        });
                    }, 500);
                }
            );
         } else { // validation form errors
            $scope.submitted = true;
            ngToast.create({
                className: 'danger',
                content: 'Please check the field again, if there is any empty.'
            });
        }       
    } 

    
    // create new purchase
    $scope.createReturn = function (isValid) { // validation form if empty
        if (isValid) {

            returnService.create({
                supplier_id: $scope.supplierId,
                purchase_id: $scope.purchaseId,
                product_id: $scope.productId,
                return_quantity: $scope.returnQty,
                return_charge: $scope.returnCharge,
                return_info: $scope.returnInfo

            }, function () {

                $('#addNewReturn').modal('hide');
                $scope.refresh();
				$scope.returnReset();
                
                setTimeout(function () {
                    ngToast.create({
                        className: 'success',
                        content: 'Return created successfuly.'
                    });
                }, 500);
                
            }, function () {
                setTimeout(function () {
                    ngToast.create({
                        className: 'danger',
                        content: '<strong>Oh no!</strong> Something went wrong.'
                    });
                }, 500);
            });

        } else {
            $scope.submitted = true;
            ngToast.create({
                className: 'danger',
                content: '<strong>Oh no!</strong> Something went wrong.'
            });
        }
    }

	// reset field
    $scope.returnReset = function () {
        $scope.purchaseId = '';
        $scope.supplierId = '';
        $scope.productId = '';
        $scope.returnQty = '';
        $scope.returnCharge = '';
        $scope.returnInfo = '';
    }

    // cek user
    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.returns = [];

    $scope.purchase_id = [];
    $scope.product_id = [];
    $scope.purchases = [];
    $scope.purchaseItems = [];

    $scope.refresh();
    $scope.returnReset();
    
}
