angular
.module('app')
.factory('saleTempService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/saleTemp').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }
	
    function getById(saleId, onSuccess, onError){

        Restangular.one('api/saleTemp', saleId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }
	
    function create(data, onSuccess, onError){

        Restangular.all('api/saleTemp').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }
	
    function update(saleTempId, data, onSuccess, onError){

        Restangular.one("api/saleTemp").customPUT(data, saleTempId).then(function(response) {
                
                onSuccess(response);

            }, function(response){
                
                onError(response);
            
            }
        );

    }


    function remove(saleTempId, onSuccess, onError){
        Restangular.one('api/saleTemp/', saleTempId).remove().then(function(){

            onSuccess();

        }, function(response){

            onError(response);

        });
    }	
	
    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll,
		getById: getById,
        create: create,
        update: update,
		remove: remove
    }

}]);