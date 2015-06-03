<?php 
/**
* 
*/
class WordController extends BaseController
{
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getAdd($objectId)
	{
		$data["objectId"] = $objectId;

		if( Object::find($objectId)->language == "en")
			return View::make('word.addEN',$data);

		if( Object::find($objectId)->language == "jp")
			return View::make('word.addJP',$data);
	}

		/**
		 * Create a new cache repository with the given implementation.
		 *
		 * @param  \Illuminate\Cache\StoreInterface  $store
		 * @return \Illuminate\Cache\Repository
		 */
		public function postAdd($objectId) 
		{
			
			$validator = Validator::make(Input::all(),
				array(
					'key' 	=> 'required|max:50',
					'value'  => 'required|max:50'
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
	            $key = Input::get('key');
	            $value = Input::get('value');

				// Create a new user in the database...
	            //$img = Input::file('setThumb');
	            $img = $_FILES["wordThumb"];

	            if( Object::find($objectId)->language == "en")
	            {
	            	//increment index
	        	 	//count how many total word 
	            	WordIndex::find(1)->increment('index');

					$add = WordEN::create(
								array(
									'id' => WordIndex::find(1)->index,
									'object_id' => $objectId,
									'key' => $key,
									'value' => $value,
									'synonyms' => Input::get('synonyms'),
									'pronounciation' => Input::get('pronounciation'),
									'definition' => Input::get('definition'),
									'definitionVi' => Input::get('definitionVi'),
									'example1' => Input::get('example1'),
									'example1Vi' => Input::get('example1Vi'),
									'example2' => Input::get('example2'),
									'example2Vi' => Input::get('example2Vi'),
									'example3' => Input::get('example3'),
									'example3Vi' => Input::get('example3Vi'),
									'origin' => Input::get('origin'),
									'attributes' => Input::get('attributes'),
									'similar' => Input::get('similar'),
									)
								);
	            }
	            
	        	if( Object::find($objectId)->language == "jp")
	        	 {
	        	 	//increment index
	        	 	//count how many total word 
	        	 	WordIndex::find(1)->increment('index');

	        	 	$add = WordJP::create(
								array(
									'id' => WordIndex::find(1)->index,
									'object_id' => $objectId,
									'key' => $key,
									'value' => $value,
									'synonyms' => Input::get('synonyms'),
									'romaji' => Input::get('romaji'),
									'definition' => Input::get('definition'),
									'definitionVi' => Input::get('definitionVi'),
									'example1' => Input::get('example1'),
									'example1Vi' => Input::get('example1Vi'),
									'example2' => Input::get('example2'),
									'example2Vi' => Input::get('example2Vi'),
									'example3' => Input::get('example3'),
									'example3Vi' => Input::get('example3Vi'),
									'origin' => Input::get('origin'),
									'attributes' => Input::get('attributes'),
									'similar' => Input::get('similar'),
									'phonetic' => Input::get('phonetic')
									)
								);
	        	 }
				
				if($add) 
				{
					//Get Lastest insert id of Word
					$wordId = WordIndex::find(1)->index;

					Mimg::uploadWordThumbnail($img,$objectId,$wordId);

					return Redirect::back()
						->with('message', 'Tạo từ mới thành công');
				} 
				else 
				{
					return Redirect::back()
						->with('message', 'Unknow Errow while create new sets');
				}

					return Redirect::back()
						->with('message', 'Set creating: There is a problem.');

			}
		}
}
