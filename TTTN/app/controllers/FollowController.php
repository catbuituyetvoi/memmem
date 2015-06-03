<?php
class FollowController extends BaseController {
	//Process Following and Unfollow User
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function ajaxFollow()
	{
		//get User's Id to followng or unfollow
		$userId = Input::get('userId');

		///Check if user has followed this user.
		$count = DB::table('follower')
					->whereRaw('follow_id = ?', array(Auth::id()))
					->whereRaw('user_id = ?', array($userId))
					->count();

		$action = null;
		//If not following, follow this user.
		if( $count == 0 )
		{

			//Add to Activities for "follow" action of this user
			Activities::create(
							array(
								'user_id' => Auth::id(),
								'action' => 2,
								//Action 2 mean "Follow"
								'object_id' => $userId
								
							));

			DB::table('follower')
				->insert(
    					array(
    					'follow_id' => Auth::id(),
    					'user_id' => $userId
    					)
					);
			//Set the response is 1 when unfollow
			$action  = 1;


		}
		else
		{

			Activities::whereRaw('action = 2 and user_id = ?', array(Auth::id()))
					->whereRaw('object_id = ?', array($userId))
					->delete();
					
		//If has followed, unfollow.	
			DB::table('follower')
				->whereRaw('follow_id = ?', array(Auth::id()))
				->whereRaw('user_id = ?', array($userId))
       			->delete();
       		//Set the response is 0 when unfollow
       		$action=0;
		}
		//Return 1 if successful Follow and 0 if  Unfollow
        return Response::json($action);
	}
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function viewFollowingList($username)
	{
		$data['user'] = User::whereRaw('username = ?', array($username))->first();
	}
}