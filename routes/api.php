<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

$api->version('v1', function (Router $api) {
    $api->group(['prefix' => 'auth'], function(Router $api) {
        $api->post('signup', 'App\\Api\\V1\\Controllers\\Auth\\SignUpController@signUp');
        $api->post('login', 'App\\Api\\V1\\Controllers\\Auth\\LoginController@login');

        $api->get('token', 'App\\Api\\V1\\Controllers\\Auth\\AuthController@token');
        
        $api->post('recovery', 'app\\Api\\V1\\Controllers\\Auth\\ForgotPasswordController@sendResetEmail');
        $api->post('reset', 'app\\Api\\V1\\Controllers\\Auth\\ResetPasswordController@resetPassword');
    });

    $api->group(['middleware' => 'jwt.auth'], function(Router $api) {
        $api->get('protected', function() {
            return response()->json([
                'message' => 'Access to protected resources granted! You are seeing this text as you provided the token correctly.'
            ]);
        });

        $api->get('refresh', [
            'middleware' => 'jwt.refresh',
            function() {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                ]);
            }
        ]);
	
		$api->resource('user', 'App\Api\V1\Controllers\UserController');
		$api->resource('product', 'App\Api\V1\Controllers\ProductController');
		$api->resource('categorie', 'App\Api\V1\Controllers\CategorieController');
		$api->resource('location', 'App\Api\V1\Controllers\LocationController');
		$api->resource('source', 'App\Api\V1\Controllers\SourceController');
		$api->resource('purchase', 'App\Api\V1\Controllers\PurchaseController');
		$api->resource('supplier', 'App\Api\V1\Controllers\SupplierController');
		$api->resource('return', 'App\Api\V1\Controllers\ReturnController');
        
		$api->resource('stock', 'App\Api\V1\Controllers\ProductApiController');
		$api->resource('purchaseApi', 'App\Api\V1\Controllers\PurchaseApiController');
		$api->resource('purchaseTemp', 'App\Api\V1\Controllers\PurchaseTempController');
		$api->resource('sale', 'App\Api\V1\Controllers\SaleController');
		$api->resource('saleTemp', 'App\Api\V1\Controllers\SaleTempController');
		$api->resource('marketChart', 'App\Api\V1\Controllers\MarketChartController');
		
    });

    $api->get('hello', function() {
        return response()->json([
            'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
        ]);
    });
});
