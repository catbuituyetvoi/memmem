<?php
class UserController extends BaseController {

	/* Viewing the form */
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getRegister() 
	{
		 return View::make('user.register');
	}
			
		/* Submitting the form */
		/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
		public function postRegister() 
		{
			$validator = Validator::make(Input::all(),
				array(
					'email' 		=> 'required|max:50|email|unique:users',
					'username'		=> 'required|alpha_dash|max:20|min:3|unique:users',
					'password'		=> 'required|min:6',
					'password_again'=> 'required|same:password'
				)
			);

			if($validator->fails()) 
			{
				return Redirect::route('user-register')
					->withErrors($validator)
					->withInput(); 
					  // redirect with inputs

			} 
			else 
			{
				// create an account
				$email 		= Input::get('email');
				// Get username
				$username 	= Input::get('username');
				// Get password
				$password 	= Input::get('password');

				echo "đã gán input";
				// record				
				$userdata = User::create(array(
					'email' 	=> $email,
					'username' 	=> $username,
					'password' 	=> Hash::make($password)
				));

				if($userdata) 
				{		
					Session::flash('message', 'Dang ki thanh  cong');

					echo Session::get('message');

					ob_end_flush();
					flush();
					usleep(8000000);
					
					$dataAttempt = array(
	            		'username' => $username,
	            		'password' => $password
	        		);

					//attempt Login
					$auth = Auth::attempt($dataAttempt,true);

					if($auth) 
					{
					// Redirect to the intented page
					// For example, a user will be redirected to '/
					// when the user tried to change password without login'
						return Redirect::route('home')
							->with('global', 'auth thanh  cong');
					} 
					else 
					{
						return Redirect::route('home')
						->with('global', 'Dang ki thanh  cong');				
					}
					
				}

			}
		}
	//Get Login page
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */	
	public function getLogin() 
	{
		 return View::make('user.login');
	}
	//Check user Login
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
		public function postLogin() 
		{
			$validator = Validator::make(Input::all(),
				array(
					'username' 	=> 'required',
					'password'	=> 'required'
				)
			);

			if($validator->fails()) 
			{
				return Redirect::back()
					->withErrors($validator)
					->withInput(); 
					  // redirect with inputs
			} 
			else 
			{
				// record	
				$dataAttempt = array(
	            	'username' => Input::get('username'),
	            	'password' => Input::get('password')
	        	);		

				//attempt Login
				$auth = Auth::attempt($dataAttempt,true);
				
				if($auth) 
				{
				// Redirect to the intented page
				// For example, a user will be redirected to '/
				// when the user tried to change password without login'
					return Redirect::intended('/');
				} 
				else 
				{
					return Redirect::back()
						->with('global', 'Tên đăng nhập hoặc mật khẩu không đúng.');
				}

				return Redirect::back()
					->with('global', 'There is a problem.');

			}
	}

	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getSignOut() 
	{
		Auth::logout();

		return Redirect::route('home');
	}

}
