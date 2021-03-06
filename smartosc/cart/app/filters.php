<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		Session::flash('message', "Dang nhap de thuc hien chuc nang nay");

		return Redirect::guest('user/login');
	}

});

Route::filter('admin', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
			return Response::make('Unauthorized', 401);

		Session::flash('message', "Vui lòng đăng nhập để tiếp tục");

		return Redirect::guest('/');
	}
	if( Auth::user()->role != "2" )
		{
			Session::flash('message', "Bạn không có quyền vào khu vực này.");

			return Redirect::guest('/');
		}

});

Route::filter('manager', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
			return Response::make('Unauthorized', 401);

		Session::flash('message', "Vui lòng đăng nhập để tiếp tục");

		return Redirect::guest('/');
	}
	if( (Auth::user()->role != "1") and (Auth::user()->role != "2") )
		{
			Session::flash('message', "Bạn không có quyền vào khu vực này.");

			return Redirect::guest('/');
		}

});



Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() !== Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});
