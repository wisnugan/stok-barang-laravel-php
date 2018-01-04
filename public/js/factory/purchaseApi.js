angular
.module('app')
.factory('purchaseApiService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/purchaseApi').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }
	
    function getById(purchaseId, onSuccess, onError){

        Restangular.one('api/purchaseApi', purchaseId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }


    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
		
        getAll: getAll,
        getById: getById
    }

}]);