angular
    .module('app')
    .controller('categorieCtrl', categorieCtrl);

categorieCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'userService', 'categorieService'];

function categorieCtrl($state, $scope, $http, $rootScope, ngToast, userService, categorieService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.closeEdit = function () {
        $('#updateCategorieModal').modal('hide');
        $scope.categorieReset();
    }

    $scope.closeNew = function () {
        $('#newCategorieModal').modal('hide');
        $scope.categorieReset();
    }

    $scope.createCategorie = function (isValid) { // validatio form if empty
        if (isValid) {

            categorieService.create({

                categorie_name: $scope.categorieName,
                categorie_sub: $scope.categorieSub

            }, function () {

                $('#newCategorieModal').modal('hide');
                $scope.categorieReset();
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

        categorieService.getAll(function (response) {

            $scope.categories = response;

        });

    }

    $scope.load = function (categorieId) {

        categorieService.getById(categorieId, function (response) {

            // put the values in form
            $scope.categorieId = response.category.id;
            $scope.categorieName = response.category.categorie_name;
            $scope.categorieSub = response.category.categorie_sub;

            $('#updateCategorieModal').modal('show');

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }


    $scope.updateCategorie = function (isValid) { // validatio form if empty
        if (isValid) {

            categorieService.update(
                $scope.categorieId, {
                    categorie_name: $scope.categorieName,
                    categorie_sub: $scope.categorieSub
                },
                function (response) {
                    $('#updateCategorieModal').modal('hide');
                    $scope.categorieReset();
                    $scope.refresh();

                    // notif update success
                    setTimeout(function () {

                        ngToast.create({
                            className: 'success',
                            content: '<i class="fa fa-check-circle"></i> The update has completed successfully'
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

    $scope.categorieReset = function () {
        $scope.categorieId = '';
        $scope.categorieName = '';
        $scope.categorieSub = '';

    }

    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.categories = [];

    $scope.categorieReset();
    $scope.refresh();

}
