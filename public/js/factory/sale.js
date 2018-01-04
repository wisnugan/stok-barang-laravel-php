angular
.module('app')
.factory('saleService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/sale').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    function getById(saleId, onSuccess, onError){

        Restangular.one('api/sale', saleId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(data, onSuccess, onError){

        Restangular.all('api/sale').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }

    function update(saleId, data, onSuccess, onError){

        Restangular.one("api/sale").customPUT(data, saleId).then(function(response) {
                
                onSuccess(response);

            }, function(response){
                
                onError(response);
            
            }
        );

    }

    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update
    }

}]);