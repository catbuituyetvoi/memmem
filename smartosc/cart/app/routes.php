<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.

|*/

Route::get('/', 
	array('as' => 'home', 
		'uses' => 'HomeController@home'
));
	/*
	|--------------------------------------------------------------------------
	| Product View
	|--------------------------------------------------------------------------
	|
	| This route for view a product choosed by user

	|*/
	Route::get('/view/{productId}', 
	array('as' => 'product-view', 
		'uses' => 'ProductController@view'
	));
	/*
	|--------------------------------------------------------------------------
	| add product to Cart
	|--------------------------------------------------------------------------
	|
	| This route for add a Product to Cart

	|*/

	Route::get('/addToCart/{productId}', 
	array('as' => 'product-add-to-cart', 
		'uses' => 'CartController@addProduct'
	));
	/*
	|--------------------------------------------------------------------------
	| view Cart
	|--------------------------------------------------------------------------
	|
	| This route for view Cart

	|*/

	Route::get('/cart', 
	array('as' => 'cart-view', 
		'uses' => 'CartController@view'
	));
	/*
	|--------------------------------------------------------------------------
	| cart Delete
	|--------------------------------------------------------------------------
	|
	| This route for view Cart

	|*/

	Route::get('/deleteItem/{itemId}', 
	array('as' => 'cart-delete-item', 
		'uses' => 'CartController@deleteItem'
	));

	/*
	|--------------------------------------------------------------------------
	| cart Delete
	|--------------------------------------------------------------------------
	|
	| This route for view Cart

	|*/

	Route::get('/updateItem/{itemId}', 
	array('as' => 'cart-update-item', 
		'uses' => 'CartController@updateItem'
	));



//Push Array
//array_push(var, value1,value2)
//unset($arr);  
/*

		@foreach( $session[0] as  $key => $value)
			<div class="layer row">
				<div class="face1">
					{{ $value["key"]}}
				</div>
				<div class="face2">
					{{ $value["value"] }}
				</div>
			</div>
		@endforeach
*/