angular
    .module('app')
    .controller('orderCtrl', orderCtrl)
    .controller('stockCtrl', stockCtrl)
    .controller('returnCtrl', returnCtrl)
    .controller('cSaleCtrl', cSaleCtrl)
    .controller('marketCtrl', marketCtrl)
    .controller('productTotalCtrl', productTotalCtrl)
    .controller('marketProductCtrl', marketProductCtrl)


returnCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function returnCtrl($scope, $http, $rootScope, marketChartService) {
    
   $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Returns'];
    $scope.data = [];

    $scope.data2017 = [];

    $scope.data.push($scope.data2017);


    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.tReturn, function (key) {
            $scope.data2017.push(key)
        });

    }, function () {
        // if want add error message or something just like this. xD
    });
}


stockCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function stockCtrl($scope, $http, $rootScope, marketChartService) {
    
   $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Items'];
    $scope.data = [];

    $scope.data2017 = [];

    $scope.data.push($scope.data2017);


    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.ttlStock, function (key) {
            $scope.data2017.push(key)
        });

    }, function () {
        // if want add error message or something just like this. xD
    });
}


orderCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function orderCtrl($scope, $http, $rootScope, marketChartService) {
    
   $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Orders'];
    $scope.data = [];

    $scope.data2017 = [];

    $scope.data.push($scope.data2017);


    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.order17, function (key) {
            $scope.data2017.push(key)
        });

    }, function () {
        // if want add error message or something just like this. xD
    });
}

cSaleCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function cSaleCtrl($scope, $http, $rootScope, marketChartService) {
    
   $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Sale'];
    $scope.data = [];

    $scope.data2017 = [];

    $scope.data.push($scope.data2017);


    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.tSale, function (key) {
            $scope.data2017.push(key)
        });

    }, function () {
        // if want add error message or something just like this. xD
    });
}

marketCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function marketCtrl($scope, $http, $rootScope, marketChartService) {
    
    $scope.colors = ['#d71149', '#42b549', '#1998ed', '#cccccc'];
    
    $scope.labels = [];
    $scope.data = [];

    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.mChart, function (value) {
            $scope.labels.push(value.source.source_name);
            $scope.data.push(value.point);

        });

    }, function () {
        // if want add error message or something just like this. xD
    });

    $scope.type = 'polarArea';
    $scope.toggleM = function () {
        $scope.type = $scope.type === 'polarArea' ?
            'pie' : 'polarArea';
    }
}


productTotalCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function productTotalCtrl($scope, $http, $rootScope, marketChartService) {
    
    $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];  
    $scope.options = {

        legend: {display: true}
    }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['2017', '2016'];
    $scope.data = [];

    $scope.data2016 = [];
    $scope.data2017 = [];

    $scope.data.push($scope.data2017);
    $scope.data.push($scope.data2016);

    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.data16, function (key) {
            $scope.data2016.push(key)
        });

        angular.forEach($scope.markets.data17, function (key) {
            $scope.data2017.push(key)
        });

    }, function () {
        // if want add error message or something just like this. xD
    });
    
    $scope.datasetOverride = [
      {
        label: "2017",
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: "2016",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
      }
    ];
}

marketProductCtrl.$inject = ['$scope', '$http', '$rootScope', 'marketChartService'];
function marketProductCtrl($scope, $http, $rootScope, marketChartService) {
    
    $scope.colors = ['#d71149', '#42b549', '#1998ed', '#cccccc']; 
    $scope.options = {

        legend: {display: true}
    }

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.series = ['Bukalapak', 'Tokopedia', 'FJB', 'Other' ];
    $scope.data = [];

    $scope.bp = [];
    $scope.tp = [];
    $scope.fjb = [];
    $scope.otcod = [];

    $scope.data.push($scope.bp);
    $scope.data.push($scope.tp);
    $scope.data.push($scope.fjb);
    $scope.data.push($scope.otcod);

    marketChartService.getAll(function (response) {

        console.log(response.plain());
        $scope.markets = response.plain();

        angular.forEach($scope.markets.bukalapak, function (key) {
            $scope.bp.push(key)
        });

        angular.forEach($scope.markets.tokopedia, function (key) {
            $scope.tp.push(key)
        });

        angular.forEach($scope.markets.fjb, function (key) {
            $scope.fjb.push(key)
        });
        
         angular.forEach($scope.markets.othercod, function (key) {
            $scope.otcod.push(key)
        });
        
    }, function () {
        // if want add error message or something just like this. xD
    });
}