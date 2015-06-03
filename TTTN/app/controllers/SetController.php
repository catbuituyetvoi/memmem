<?php 
/**
* 
*/
class SetController extends BaseController
{
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function showNewSet()
	{
		return View::make('hello');
	}
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getCreate() 
	{
		return View::make('set.create');
	}
		/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
		public function postCreate() 
		{
			$validator = Validator::make(Input::all(),
				array(
					'ipTitle' 	=> 'required|max:50|min:5',
					'ipDesc'	=> 'max:500|min:5'
				)
			);

			if($validator->fails()) 
			{
				return Redirect::route('set-create')
					->withErrors($validator)
					->withInput(); 
					  // redirect with inputs
			} 
			else 
			{
				//Generate ID base on Redis
				//Because own ID design contain number and character
				//So cannot use default Auto Increment from MySQL
				//$setId = Redis::incr('setId');

				//Get value from Input
	            $title = Input::get('ipTitle');
	            $desc = Input::get('ipDesc');

				// Create a new user in the database...
	            //$img = Input::file('setThumb');
	            $img = $_FILES["setThumb"];

	          	

				$create = Set::create(
								array(
									'author_id' => Auth::id(),
									'owner_id' => Auth::id(),
									'title' => $title,
									'desc' => $desc,
									'language' => Input::get('ipLanguage')
									)
								);
				
				if($create) 
				{
					//upload Set thumbnails
					Mimg::uploadSetThumbnail($img,$create->id);
					//$response = Event::fire('set.create',$create->id);

					//add to Activities for the creator:
					Activities::create(
								array(
									'user_id' => Auth::id(),
									'action'  => 3,
									//action 3 is for Create a new set
									'object_id' => $create->id
									)
								);

					$data["authId"] = Auth::id();
					$data["setId"] = $create->id;

					return Redirect::route('set-view', $data);
				} 
				else 
				{
					return Redirect::route('set-create')
						->with('global', 'Unknow Errow while create new sets');
				}

				return Redirect::route('set-create')
					->with('global', 'Set creating: There is a problem.');

			}
		}
	//Set Viewer
	//Return when view a Set
	//By Default, show Rank and lastest learned object
		/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function viewSet($setId)
	{
		$data['set'] = Set::find($setId);

		if($data['set'])
		{
			$count  = SetCollection::
				whereRaw('user_id = ?', array(Auth::id()))
					->whereRaw('set_id = ?', array($setId))
					->count();

			//If user is added this set
			//Therefore in SetCollection must have rows have this set
			if($count != 0)
			{
				$countObjectLearned = SetCollection::whereRaw('user_id = ? and set_id = ? and learned = 1 ORDER BY updated_at',array(Auth::id(),$setId))
				->count();
			

				if($countObjectLearned != 0)
				{
				    $data["currentLearningObject"] = SetCollection::whereRaw('user_id = ? and set_id = ? and learned = 1 ORDER BY updated_at',array(Auth::id(),$setId))
					->first()
					->currentLearningObject;
			     }

				return View::make('set.addedView',$data);
			}

				return View::make('set.guestView',$data);
		}

		return View::make('set.errNotFound');
	}
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function addSet($setId)
	{
		$data["setId"] = $setId;
		//Fire Event when Add Set
		//Event: Add all object to SetCollection
		Event::fire('set.addToCollection',array($data));
		
		return Redirect::back();
	}


}
