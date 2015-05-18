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


/* CSRF protection */
Route::group(array('before' => 'guest'), function() {

	Route::get('/user/register',
		array('as' => 'user-register',
			'uses' => 'UserController@getRegister'
	));

	Route::get('/user/login',
		array('as' => 'user-login',
			'uses' => 'UserController@getLogin'
	));
});



Route::group(array('before'=>'csrf'), function(){
	/* Create an account (POST) */
	Route::post('/user/register', 
		array('as' => 'user-register-post',
			'uses' => 'UserController@postRegister'
	));
	Route::post('/user/login', 
		array('as' => 'user-login-post',
			'uses' => 'UserController@postLogin'
	));
		//Create new Sets
	Route::post('/set/create',
		array('as' => 'set-create-post',
			'uses' => 'SetController@postCreate'
	));
});



/* Authenticated group */
Route::group(array('before' => 'auth'), function() {

	/* Sign out (GET) */
	Route::get('/user/sign-out', 
		array('as' => 'user-sign-out',
			'uses' => 'UserController@getSignOut'
	));
	//Create new Sets
	Route::get('/set/create',
			array('as' => 'set-create',
				'uses' => 'SetController@getCreate'
	));

	Route::post('/user/follow',
			array('as' => 'user-follow',
				'uses' => 'FollowController@ajaxFollow'
	));

});

Route::get('/set/{setId}',
	array('as' => 'set-view',
		'uses' => 'SetController@viewSet'
));
	Route::get('/object/{objectId}',
	array('as' => 'object-view',
		'uses' => 'ObjectController@viewObject'
	));
/* Authenticated group */
Route::group(array('before' => 'auth'), function() {
	
	Route::get('/learn/{objectId}',
		array('as' => 'set-learn',
			'uses' => 'LearnController@startLearn'
	));

	Route::get('/learn/{objectId}/filterData',
		array('as' => 'get-filter-data',
			'uses' => 'LearnController@getFilterData'
	));

	Route::get('/set/{setId}/add',
		array('as' => 'set-add',
			'uses' => 'SetController@addSet'
	));

	Route::get('/set/{objectId}/addWord',
		array('as' => 'word-add-get',
			'uses' => 'WordController@getAdd'
	));

		Route::post('/set/{objectId}/addWord',
			array('as' => 'word-add-post',
				'uses' => 'WordController@postAdd'
		));

	Route::get('/set/{setId}/addObject',
		array('as' => 'object-add-get',
			'uses' => 'ObjectController@getAdd'
	));

		Route::post('/set/{setId}/addObject',
			array('as' => 'object-add-post',
				'uses' => 'ObjectController@postAdd'
		));


	Route::get('/learn/{objectId}/data',
		array('as' => 'course-data',
			'uses' => 'LearnController@getCourseData'
	));

		Route::get('/learn/{objectId}/truemcq',
			array('as' => 'true-mcq',
				'uses' => 'LearnController@trueMcq'
		));
});

//ajax Filtered
Route::post('/learn/{objectId}/filtered',
			array('as' => 'learn-filtered',
				'uses' => 'LearnController@ajaxFilter'
	));

Route::get('/user/{username}',
	array('as' => 'view-profile',
		'uses' => 'ProfileController@viewProfile'
));
	Route::get('/user/{username}/following',
		array('as' => 'view-following-list',
			'uses' => 'FollowController@viewFollowingList'
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