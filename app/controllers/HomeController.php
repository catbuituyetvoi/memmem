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
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function home()
	{

		if(Auth::check())
		{	
			$data["setAdded"] = SetCollection::
								whereRaw('user_id = ?', array(Auth::id()))->get();

			$data["setLearned"] = SetCollection::whereRaw('user_id = ? and  learned = 1', array(Auth::id()))
									->get();

			$followingList = DB::table('follower')
										->whereRaw('follow_id = ?', array(Auth::id()))
										->lists('user_id');
			//Default list is null
			$data["activitiesList"] = null;
			//If have Following more than one person, pull data to render
			if($followingList != null)
				$data["activitiesList"] = Activities::
									whereIn('user_id',$followingList)
									->orderBy('created_at','desc')
									->get();
			//$data["followingList"] = Activities::
			//						whereIn('user_id',$followingList)
			//						->get();

			return View::make('home.auth',$data);
		}

		return View::make('home.guest');
	}

}

