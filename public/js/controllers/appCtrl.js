angular
.module('app')
.controller('appCtrl', ['$scope', '$state', '$http', '$rootScope', 'userService', 'ngToast', 'stockService', function ($scope, $state, $http, $rootScope, userService, ngToast, stockService) {

    $scope.logout = function(){
        userService.logout();
        $state.go('login');
				setTimeout(function () {
           			ngToast.create({
						className: 'success',
						content: '<strong>You are now logged out</strong>, please come back soon.'
					});
				}, 1000);
    }
	
	stockService.getAll(function(response){
			$scope.stock = response;
    }, function(){
			
			// if want add error message or something just like this. xD
		
	});	
	
    if(!userService.checkIfLoggedIn())
        $state.go('login');
	
}]);