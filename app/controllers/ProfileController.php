<?php

class ProfileController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Profile Controller
	|--------------------------------------------------------------------------
	|
	| Control profile page of User.
	|
	*/

	/**
	 * View Profile page of User
	 *
	 * @param  $username
	 * @return View
	 */
	public function viewProfile($username)
	{
		//Check username is exists or not
		$data['user'] = User::whereRaw('username = ?', array($username))
						->first();
		//If Exists. Go further
		if($data['user'] != null)
		{
			//Viewing Profile as Member
			if(Auth::check())
			{
				//Check logged member was Following this user
				$data['isFollowing'] = Auth::user()->hasFollower($data['user']->id);
				//If member viewing it own profile
				//return to Home Profile of them
				if(Auth::user()->username == $username)
				{
					return View::make('profile.home');
				}

				return View::make('profile.profile',$data);
			}
			//Viewing Profile as Guest
			else 
			{
				return View::make('profile.profileGuest',$data);
			}
		}
		//If no Exists, return Error Page
		 return View::make('profile.notFound');
	}

}

