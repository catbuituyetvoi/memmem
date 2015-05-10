<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/


	public function home()
	{
		/**
		 * List of product
		 *
		 * @var array
		 */
		$product = array();

		$product[] = array(
	                'id' => 1,
	                'name' => 'Sony Xperia Z1',
	                'price'  => 13900000,
	                'brand' => 'Sony'
                	);

		$product[] = array(
	                'id' => 2,
	                'name' => 'Sony Xperia Z2',
	                'price'  => 900000,
	                'brand' => 'Sony'
                	);

		$product[] = array(
	                'id' => 3,
	                'name' => 'Nokia 3300',
	                'price'  => 1300000,
	                'brand' => 'Nokia'
                	);

		$product[] = array(
	                'id' => 4,
	                'name' => 'HTC One X',
	                'price'  => 2900000,
	                'brand' => 'HTC'
                	);

		$product[] = array(
	                'id' => 5,
	                'name' => 'Sony A2',
	                'price'  => 21900000,
	                'brand' => 'Sony'
                	);

		$product[] = array(
	                'id' => 6,
	                'name' => 'HTC One N8',
	                'price'  => 2100000,
	                'brand' => 'HTC'
                	);

		$product[] = array(
	                'id' => 7,
	                'name' => 'Sony P22',
	                'price'  => 200000,
	                'brand' => 'Sony'
                	);

		$product[] = array(
	                'id' => 8,
	                'name' => 'Sony X1',
	                'price'  => 13300000,
	                'brand' => 'Sony'
                	);

		$product[] = array(
	                'id' => 9,
	                'name' => 'HTC M3',
	                'price'  => 213900000,
	                'brand' => 'HTC'
                	);

		$product[] = array(
	                'id' => 10,
	                'name' => 'Lumia X2',
	                'price'  => 1800000,
	                'brand' => 'Nokia'
                	);

		$data["productList"] = $product;

		Session::put('productList', $product);

		return View::make('home.home',$data);
	}

}

