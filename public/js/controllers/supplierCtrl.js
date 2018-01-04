angular
    .module('app')
    .controller('supplierCtrl', supplierCtrl);

supplierCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'supplierService', 'userService'];

function supplierCtrl($state, $scope, $http, $rootScope, ngToast, supplierService, userService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.closeEdit = function () {
        $('#updateSupplierModal').modal('hide');
        $scope.supplierReset();
    }

    $scope.closeNew = function () {
        $('#newSupplierodal').modal('hide');
        $scope.productReset();
    }

    $scope.createSupplier = function (isValid) { // validatio form if empty
        if (isValid) {

            supplierService.create({

                supplier_name: $scope.supplierName,
                supplier_employee: $scope.supplierEmployee,
                supplier_email: $scope.supplierEmail,
                supplier_phone1: $scope.supplierPhone1,
                supplier_phone2: $scope.supplierPhone2,
                supplier_address: $scope.supplierAddress,
                supplier_state: $scope.supplierState,
                supplier_info: $scope.supplierInfo

            }, function () {

                $('#newSupplierModal').modal('hide');
                $scope.supplierReset();
                $scope.refresh();

            }, function () {

                setTimeout(function () {
                    ngToast.create({
                        className: 'danger',
                        content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                    });
                }, 500);
            });
        } else { // validation form errors
            $scope.submitted = true;
            ngToast.create({
                className: 'danger',
                content: '<i class="fa fa-times-circle"></i> Please check the field again, if there is any empty.'
            });
        }
    }

    $scope.refresh = function () {

        supplierService.getAll(function (response) {

            $scope.suppliers = response;

        }, function () {

            // if want add error message or something just like this. xD

        });

    }

    $scope.load = function (supplierId) {

        supplierService.getById(supplierId, function (response) {

            // put the values in form
            $scope.supplierId = response.supplier.id;
            $scope.supplierName = response.supplier.supplier_name;
            $scope.supplierEmployee = response.supplier.supplier_employee;
            $scope.supplierEmail = response.supplier.supplier_email;
            $scope.supplierPhone1 = response.supplier.supplier_phone1;
            $scope.supplierPhone2 = response.supplier.supplier_phone2;
            $scope.supplierAddress = response.supplier.supplier_address;
            $scope.supplierState = response.supplier.supplier_state;
            $scope.supplierInfo = response.supplier.supplier_info;


            $('#updateSupplierModal').modal('show');

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }

    $scope.updateSupplier = function (isValid) { // validatio form if empty
        if (isValid) {
            supplierService.update(
                
                $scope.supplierId, {
                    
                supplier_name: $scope.supplierName,
                supplier_employee: $scope.supplierEmployee,
                supplier_email: $scope.supplierEmail,
                supplier_phone1: $scope.supplierPhone1,
                supplier_phone2: $scope.supplierPhone2,
                supplier_address: $scope.supplierAddress,
                supplier_state: $scope.supplierState,
                supplier_info: $scope.supplierInfo
                    
                },
                function (response) {
                    $('#updateSupplierModal').modal('hide');
                    $scope.supplierReset();
                    $scope.refresh();

                    // notif update success
                    setTimeout(function () {

                        ngToast.create({
                            className: 'success',
                            content: '<i class="fa fa-check-circle"></i>The update has completed successfully.'
                        });

                    }, 500);

                },
                function (response) {
                    setTimeout(function () {
                        ngToast.create({
                            className: 'danger',
                            content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                        });
                    }, 500);
                }
            );
        } else { // validation form errors
            $scope.submitted = true;
            ngToast.create({
                className: 'danger',
                content: '<i class="fa fa-times-circle"></i> Please check the field again, if there is any empty.'
            });
        }
    }

    $scope.supplierReset = function () {
        $scope.supplierId = '';
        $scope.supplierName = '';
        $scope.supplierEmployee = '';
        $scope.supplierEmail = '';
        $scope.supplierPhone1 = '';
        $scope.supplierPhone2 = '';
        $scope.supplierAddress = '';
        $scope.supplierState = '';
        $scope.supplierInfo = '';
    }

    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.suppliers = [];

    $scope.supplierReset();
    $scope.refresh();

}
