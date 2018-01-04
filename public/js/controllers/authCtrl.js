angular
.module('app')
.controller('SignupCtrl',  ['$state', '$scope', 'userService', 'ngToast', function ($state, $scope, userService, ngToast) {

    $scope.signup = function() {
        userService.signup(
            $scope.name, $scope.email, $scope.password,
            function(response){
                
                $state.go('app.main');
				setTimeout(function () {
           			ngToast.create({
						className: 'success',
						content: '<strong>Fighting!</strong> Welcome.'
					});
				}, 1500);
			},
            function(response){
				setTimeout(function () {
           			ngToast.create({
						className: 'success',
						content: '<strong>Oh no!</strong> Something went wrong with the signup process. Try again later.'
					});
				}, 500);
            }
        );
    }

    $scope.name = '';
    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
    $state.go('app.main');

}])

.controller('LoginCtrl',   ['$state', '$scope', '$http', 'userService', 'ngToast', function ($state, $scope, $http, userService, ngToast) {

    $scope.login = function() {
        userService.login(
            $scope.email, $scope.password,
            function(response){
                $state.go('app.main');
				setTimeout(function () {
           			ngToast.create({
						className: 'success',
						content: '<strong>Welcome!</strong> You are now signed in. Fighting!'
					});
				}, 1500);
            },
            function(response){
				setTimeout(function () {
           			ngToast.create({
						className: 'danger',
						content: '<strong>Oh no!</strong> Something went wrong with the login process. Try again later!'
					});
				}, 500);
            }
        );
    }

    $scope.email = '';
    $scope.password = '';

    if(userService.checkIfLoggedIn())
         $state.go('app.main');

}]);