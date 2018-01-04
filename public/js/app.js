// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'satellizer',
  '720kb.datepicker',
  'yaru22.angular-timeago',
  'angular.chosen',
  'ngSanitize',
  'ngToast',
  'ngAnimate',
  'restangular',
  'LocalStorageModule',
  'chart.js',
  'angular-jwt',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'angularUtils.directives.dirPagination'
])

 .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
}])

.config(['ngToastProvider', function (ngToast) {
        ngToast.configure({
            verticalPosition: 'top',
            horizontalPosition: 'center',
            timeout: '2000',
            animation: 'slide'
        });
}])

.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('doughnut', {
      cutoutPercentage: 60
    });
    ChartJsProvider.setOptions('bubble', {
      tooltips: { enabled: false }
    });
})

  .config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
      tokenGetter: ['$http','localStorageService', 'jwtHelper', function($http, localStorageService, jwtHelper) {
    var token = localStorageService.get('token');
        if(token){
            if(jwtHelper.isTokenExpired(token)){              
                return $http({
                    url : '/api/auth/token',
                    skipAuthorization : true,
                    method: 'GET',
                    headers : { Authorization : 'Bearer '+ token},
                }).then(function(response){
                    localStorageService.set('token',response.data.token);
                    return response.data.token;
                },function(response){
                    localStorageService.remove('token');                    
                });
            }else{
                return token; 
            }
        }  
      }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  })

.filter('rupiah', function () {
        return function toRp(angka) {
            var rev = parseInt(angka, 10).toString().split('').reverse().join('');
            var rev2 = '';
            for (var i = 0; i < rev.length; i++) {
                rev2 += rev[i];
                if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
                    rev2 += '.';
                }
            }
            return 'IDR ' + rev2.split('').reverse().join('');
        }
})

.filter('myDate', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
       return angularDateFilter(theDate, 'dd MMMM @ HH:mm:ss');
    }
})

.filter('sumByKey', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }
            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseInt(data[i][key]);
            }
            return sum;
        };
})

.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
}]);