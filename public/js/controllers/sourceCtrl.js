angular
    .module('app')
    .controller('sourceCtrl', sourceCtrl);

sourceCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast', 'userService', 'sourceService', 'saleTempService'];

function sourceCtrl($state, $scope, $http, $rootScope, ngToast, userService, sourceService, saleTempService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.closeEdit = function () {
        $('#updateSourceModal').modal('hide');
        $scope.sourceReset();
    }

    $scope.closeNew = function () {
        $('#newSourceModal').modal('hide');
        $scope.sourceReset();
    }

    $scope.createSource = function (isValid) { // validatio form if empty
        if (isValid) {

            sourceService.create({

                source_name: $scope.sourceName

            }, function () {
                $scope.sourceReset();
                $scope.refresh();
                $('#newSourceModal').modal('hide');

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

        sourceService.getAll(function (response) {

            $scope.sources = response;

        });

    }

    $scope.load = function (categorieId) {

        sourceService.getById(categorieId, function (response) {

            // put the values in form
            $scope.sourceId = response.source.id;
            $scope.sourceName = response.source.source_name;

            $('#updateSourceModal').modal('show');

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }


    $scope.updateSource = function (isValid) { // validatio form if empty
        if (isValid) {

            sourceService.update(
                $scope.sourceId, {
                    source_name: $scope.sourceName
                },
                function (response) {

                    $scope.sourceReset();
                    $scope.refresh();
                    $('#updateSourceModal').modal('hide');

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
    // get purchase item from purchase
    $scope.getSI = function (saleId) {
        $scope.saleId = null; // Clear Selected State if any
        $scope.sItem = null; // Clear previously loaded product list


        // load purchase item
        saleTempService.getById(saleId, function (response) {

            $scope.sItem = response;

        }, function () {

            // if want add error message or something just like this. xD

        });
    }

    $scope.sourceReset = function () {
        $scope.sourceId = '';
        $scope.sourceName = '';
    }
    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.sources = [];
    $scope.sItem = [];

    $scope.sourceReset();
    $scope.refresh();

}