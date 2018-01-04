angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', '$authProvider', '$provide',function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider, $authProvider, $provide) {

  $urlRouterProvider.otherwise('/login');

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
    
  
    .state('login', {
        url: '/login',
        templateUrl: '/views/pages/login.html',
        controller: 'LoginCtrl'
    })

		.state('app', {
			abstract: true,
			templateUrl: 'views/common/layouts/full.html',
			
			ncyBreadcrumb: {
			  label: 'Root',
			  skip: true
			},
			resolve: {
			  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				// you can lazy load controllers
				return $ocLazyLoad.load({
				  name: 'appCtrl',
				  files: ['js/controllers/appCtrl.js']
				});
			  }]
			}
		})
		.state('app.main', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
		   
			ncyBreadcrumb: {
			  label: 'Home',
			},
			resolve: {
				
			  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				// you can lazy load controllers
				return $ocLazyLoad.load({
				 
				  files: ['js/controllers/dashboardCtrl.js']
				});
			  }]
			}
		})
		.state('app.items', {
			url: "/items",
			abstract: true,
			template: '<ui-view></ui-view>',
			ncyBreadcrumb: {
			  label: 'Items'
			}
		 })
  
		.state('app.items.products', {
			url: '/products',
			templateUrl: 'views/items/products.html',
			
			//page title goes here
			ncyBreadcrumb: {
			  label: 'Products',
			},
			//page subtitle goes here
			params: { subtitle: 'Master Items' },
			resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
       
			return $ocLazyLoad.load({
			
			files: ['js/controllers/productCtrl.js']
			});
			}]
			}
		})
    
		.state('app.items.categories', {
			url: '/categories',
			templateUrl: 'views/items/categories.html',
			
			//page title goes here
			ncyBreadcrumb: {
			  label: 'Categories',
			},
			//page subtitle goes here
			params: { subtitle: 'Categories list' },
			resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
       
			return $ocLazyLoad.load({
			
			files: ['js/controllers/categorieCtrl.js']
			});
			}]
			}
		})
 
		.state('app.items.locations', {
			url: '/locations',
			templateUrl: 'views/items/locations.html',
			
			//page title goes here
			ncyBreadcrumb: {
			  label: 'Locations',
			},
			//page subtitle goes here
			params: { subtitle: 'Locations list' },
			resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
       
			return $ocLazyLoad.load({
			
			files: ['js/controllers/locationCtrl.js']
			});
			}]
			}
		})
 
		.state('app.purchasings', {
			url: "/purchasings",
			abstract: true,
			template: '<ui-view></ui-view>',
			ncyBreadcrumb: {
			  label: 'Purchasings'
			}
		 })
  
		.state('app.purchasings.orders', {
			url: '/orders',
			templateUrl: 'views/purchase/orders.html',
			
			//page title goes here
			ncyBreadcrumb: {
			  label: 'Orders',
			},
			//page subtitle goes here
			params: { subtitle: 'Purchase Orders' },
			resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
       
			return $ocLazyLoad.load({
			
			files: ['js/controllers/purchaseCtrl.js']
			});
			}]
			}
		})
    
 		.state('app.purchasings.returns', {
			url: '/returns',
			templateUrl: 'views/purchase/returns.html',
			
			//page title goes here
			ncyBreadcrumb: {
			  label: 'Returns',
			},
			//page subtitle goes here
			params: { subtitle: 'Purchase Returns' },
			resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
       
			return $ocLazyLoad.load({
			
			files: ['js/controllers/returnCtrl.js']
			});
			}]
			}
		})
    
       .state('app.sales', {
        url: '/sales',
        templateUrl: 'views/sales/sales.html',
        ncyBreadcrumb: {
          label: 'Sales'
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/saleCtrl.js']
            });
          }]
        }
      })         
      
      .state('app.suppliers', {
        url: '/suppliers',
        templateUrl: 'views/suppliers/suppliers.html',
        ncyBreadcrumb: {
          label: 'Suppliers'
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/supplierCtrl.js']
            });
          }]
        }
      }) 
      
      .state('app.sources', {
        url: '/markets',
        templateUrl: 'views/sources/sources.html',
        ncyBreadcrumb: {
          label: 'Markets'
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/sourceCtrl.js']
            });
          }]
        }
      })   
    
    ;

}]);
