angular
.module('app')
.factory('returnTempService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/purchaseTemp').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    function create(data, onSuccess, onError){

        Restangular.all('api/purchaseTemp').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }

    function update(purchaseTempId, data, onSuccess, onError){

        Restangular.one("api/purchaseTemp").customPUT(data, purchaseTempId).then(function(response) {
                
                onSuccess(response);

            }, function(response){
                
                onError(response);
            
            }
        );

    }


    function remove(purchaseTempId, onSuccess, onError){
        Restangular.one('api/purchaseTemp/', purchaseTempId).remove().then(function(){

            onSuccess();

        }, function(response){

            onError(response);

        });
    }	
	
    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll,
        create: create,
        update: update,
		remove: remove
    }

}]);