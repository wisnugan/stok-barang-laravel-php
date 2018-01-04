angular
.module('app')
.factory('locationService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/location').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    function getById(locationId, onSuccess, onError){

        Restangular.one('api/location', locationId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(data, onSuccess, onError){

        Restangular.all('api/location').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }

    function update(locationId, data, onSuccess, onError){

        Restangular.one("api/location").customPUT(data, locationId).then(function(response) {
                
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