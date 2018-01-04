angular
.module('app')
.factory('categorieService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(onSuccess, onError){
        Restangular.all('api/categorie').getList().then(function(response){

            onSuccess(response);
        
        }, function(){

            onError(response);

        });
    }

    function getById(categorieId, onSuccess, onError){

        Restangular.one('api/categorie', categorieId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(data, onSuccess, onError){

        Restangular.all('api/categorie').post(data).then(function(response){

            onSuccess(response);
        
        }, function(response){
            
            onError(response);
        
        });

    }

    function update(categorieId, data, onSuccess, onError){

        Restangular.one("api/categorie").customPUT(data, categorieId).then(function(response) {
                
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