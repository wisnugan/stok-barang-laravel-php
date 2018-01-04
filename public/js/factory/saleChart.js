angular
.module('app')
.factory('MarketChartService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/marketChart').getList().then(function(response){

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