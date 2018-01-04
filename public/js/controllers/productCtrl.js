angular
    .module('app')
    .controller('productCtrl', productCtrl);

productCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'productService', 'userService', 'categorieService', 'locationService'];

function productCtrl($state, $scope, $http, $rootScope, ngToast, productService, userService, categorieService, locationService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.closeEdit = function () {
        $('#updateProductModal').modal('hide');
        $scope.productReset();
    }

    $scope.closeNew = function () {
        $('#newProductModal').modal('hide');
        $scope.productReset();
    }

    $scope.createProduct = function (isValid) { // validatio form if empty
        if (isValid) {

            productService.create({

                product_code: $scope.productCode,
                product_name: $scope.productName,
                categorie_id: $scope.categorieId,
                location_id: $scope.locationId,
                product_cost: $scope.productCost,
                product_quantity: $scope.productQuantity,
                product_info: $scope.productInfo

            }, function () {

                $('#newProductModal').modal('hide');
                $scope.productReset();
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

        productService.getAll(function (response) {

            $scope.products = response;

        }, function () {

            // if want add error message or something just like this. xD

        });

    }

    $scope.load = function (productId) {

        productService.getById(productId, function (response) {

            // put the values in form
            $scope.productId = response.product.id;
            $scope.productCode = response.product.product_code;
            $scope.productName = response.product.product_name;
            $scope.categorieId = response.product.categorie_id;
            $scope.locationId = response.product.location_id;
            $scope.productCost = response.product.product_cost;
            $scope.productQuantity = response.product.product_quantity;
            $scope.productInfo = response.product.product_info;


            $('#updateProductModal').modal('show');

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }

    categorieService.getAll(function (response) {

        $scope.categories = response;

    }, function () {

        // if want add error message or something just like this. xD

    });

    locationService.getAll(function (response) {

        $scope.locations = response;

    }, function () {

        // if want add error message or something just like this. xD

    });

    $scope.updateProduct = function (isValid) { // validatio form if empty
        if (isValid) {
            productService.update(
                $scope.productId, {
                    product_code: $scope.productCode,
                    product_name: $scope.productName,
                    categorie_id: $scope.categoriesId,
                    location_id: $scope.locationsId,
                    product_cost: $scope.productCost,
                    product_quantity: $scope.productQuantity,
                    product_info: $scope.productInfo
                },
                function (response) {
                    $('#updateProductModal').modal('hide');
                    $scope.productReset();
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

    $scope.productReset = function () {
        $scope.productId = '';
        $scope.productCode = '';
        $scope.productName = '';
        $scope.categorieId = '';
        $scope.locationId = '';
        $scope.productCost = '';
        $scope.productQuantity = '';
        $scope.productInfo = '';
    }

    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.products = [];
    $scope.categories = [];
    $scope.locations = [];

    $scope.productReset();
    $scope.refresh();

}
