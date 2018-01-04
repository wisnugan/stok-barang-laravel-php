angular
    .module('app')
    .controller('locationCtrl', locationCtrl);

locationCtrl.$inject = ['$state', '$scope', '$http', '$rootScope', 'ngToast',  'userService', 'locationService'];

function locationCtrl($state, $scope, $http, $rootScope, ngToast, userService, locationService) {

    $scope.sort = function (keyname) {
        $scope.sortBy = keyname; //set the sortBy to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    $scope.closeEdit = function () {
        $('#updateLocationModal').modal('hide');
        $scope.locationReset();
    }

    $scope.closeNew = function () {
        $('#newLocationModal').modal('hide');
        $scope.locationReset();
    }

    $scope.createLocation = function (isValid) { // validatio form if empty
        if (isValid) {

        locationService.create({

            location_name: $scope.locationName,
            location_sub: $scope.locationSub

        }, function () {

            $('#newLocationModal').modal('hide');
            $scope.locationReset();
            $scope.refresh();

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i> <strong>Oh no!</strong> Something went wrong.'
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

        locationService.getAll(function (response) {

            $scope.locations = response;

        }, function(){
			
			// if want add error message or something just like this. xD
		
	});

    }

    $scope.load = function (locationId) {

        locationService.getById(locationId, function (response) {

            // put the values in form
            $scope.locationId = response.location.id;
            $scope.locationName = response.location.location_name;
            $scope.locationSub = response.location.location_sub;

            $('#updateLocationModal').modal('show');

        }, function () {

            setTimeout(function () {
                ngToast.create({
                    className: 'danger',
                    content: '<i class="fa fa-times-circle"></i><strong> Oh no!</strong> Something went wrong.'
                });
            }, 500);
        });

    }


    $scope.updateLocation = function (isValid) { // validatio form if empty
        if (isValid) {

        locationService.update(
            $scope.locationId, {
                location_name: $scope.locationName,
                location_sub: $scope.locationSub
            },
            function (response) {
                $('#updateLocationModal').modal('hide');
                $scope.locationReset();
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

    $scope.locationReset = function () {
        $scope.locationId = '';
        $scope.locationName = '';
        $scope.locationSub = '';

    }

    if (!userService.checkIfLoggedIn())
        $state.go('login');

    $scope.locations = [];

    $scope.locationReset();
    $scope.refresh();

}
