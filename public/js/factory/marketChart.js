angular
.module('app')
.factory('marketChartService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.oneUrl('api/marketChart').get().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll
    }

}]);