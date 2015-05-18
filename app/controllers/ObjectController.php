<?php 
/**
* 
*/
class ObjectController extends BaseController
{
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getAdd($setId) 
	{
		$data["setId"] = $setId;

		return View::make('object.add',$data);
	}
		/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
		public function postAdd($setId) 
		{
			$validator = Validator::make(Input::all(),
				array(
					'oTitle' 	=> 'required|max:50|min:5',
					'oDesc'	=> 'max:500|min:5'
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
				//Get value from Input
	            $title = Input::get('oTitle');
	            $desc = Input::get('oDesc');

				// Create a new user in the database...
	            //$img = Input::file('setThumb');
	            $img = $_FILES["objectThumb"];

	            $language = Set::find($setId)->language;

				$create = Object::create(
								array(
									'set_id' => $setId,
									'title' => $title,
									'desc' => $desc,
									'language' => $language
									)
								);
				
				if($create) 
				{
					//Get objectId, lastest if of inserted
					$objectId = $create->id;
					// upload Object thumbnail
					Mimg::uploadObjectThumbnail($img,$objectId);

					//Event::fire('object.create',$create->id);

					$data["authId"] = Auth::id();
					$data["setId"] = $create->id;

					return Redirect::back()
						->with('message', 'Tạo chủ đề thành công');
				} 
				else 
				{
					return Redirect::back()
						->with('global', 'Lỗi, xin vui lòng liên hệ Admin.');
				}

			}
		}

	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */

	public function viewObject($objectId)
	{
		//Find the object
		$data['object'] = Object::find($objectId);
		//If Object exists
		if($data['object'])
		{
			$count  = Object::
						whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($setId))
							->count();

			if($count == 1)
				return View::make('object.addedView',$data);

				return View::make('object.guestView',$data);
		}

		return View::make('set.errNotFound');
	}

}
