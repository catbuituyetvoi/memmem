<?php 
/**
* 
*/
class LearnController extends BaseController
{
	/**
	 * Start learning new course
	 *
	 * @param  $objectId
	 * @return View::Learn
	 */

	public function startLearn( $objectId )
	{
		$data["object_id"] = $objectId;

		Session::set('objectId', $objectId);

		$data["object"] = Object::find( $objectId );

		$language = $data["object"]->language;

		$data["objectCollection"] = ObjectCollection::
															whereRaw('user_id = ?', array(Auth::id()))
															->whereRaw('object_id = ?', array($objectId))
															->first();
		
		if($data["objectCollection"])
		{
			//If it is not learned ( learned = 0) 
			//It will need filter before Learn
			if($data["objectCollection"]->learned == 0)
			{
				$data["object"] = Object::find( $objectId );

				return View::make('learn.filter',$data);
			}
			
			//If wwant to save currrent course id
			//$data["course_id"] = Redis::incr('course_id');
			//$data["session"] = Session::get($data["course_id"]);
			//Event::fire('set.learnStart',array($data));
			
			return View::make('learn.learn',$data);
		}

		return View::make('learn.errAuth',$data);
	}


	/**
	 * Get Course Data for the LEarning
	 *
	 * get all data for Course
	 * These data will be process by Jquery
	 * Final, render as Layer: Word. MCQ. Typing. etc.
	 *
	 * @param $objectId
	 * @return \Illuminate\Cache\Repository
	 */
	public function getCourseData($objectId){
		//There are some type of Learning Language 
		// Therefore, They have different structure 
		//So, we need to distrubte them as different Table

		/****************************************
		* The data STRUCTURE 
		* 
		* array[wordData,ListOfScore,ObjectSetting] 
		*
		* id - word_id - key - value ...(other WORD attributes)
		*
		* 
		* 
		* id is id of WORD COLLECTION (for easy UPDATE them)
		/******************************************/

		//Get array of whole words where user choose to learn (learn=1)
		if( Object::find($objectId)->language == "en")
		{
			$wordCollection = WordCollectionEN::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')->get();
			//				->lists('word_id');

			//$listId	= $wordCollection->lists('word_id');

			$wordlist = WordEN::whereIn('id',$listId)
									->get()
									->toArray();
		}
		//Get array of whole words where user choose to learn (learn=1)
		if( Object::find($objectId)->language == "jp")
		{
			$wordCollection = WordCollectionJP::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')
							->get();

			//$listId	= $wordCollection->lists('word_id');

			//$wordlist = WordJP::whereIn('id',$listId)
								//->get()
								//->toArray();
		}

		$responseData = array();

		$wordData = array();
		
		$word_score = array();
		//This data, include id and wordId got from WordCollection, 
		//Other data got from WORD original table
		foreach ($wordCollection as $word) 
		{
			//Copy all ORIGINAL WORD attributes to new Array: word_data()
			$word_data = $word->word->toArray();


			//Add Image for this word
			//Because Image is get by Id, and this field not save in database
			$word_data["image"] = 'img/object/'.$objectId.'/'.$word["word_id"].'.jpg';
			//$word_data["score"] = $wordCollection::whereRaw('word_id = ?',array($word.id))->get()->toArray
			//Push thís word to array of Course
			$word_data["id"] = $word["id"];
			$word_data["word_id"] = $word["word_id"];
			$word_data["word_id"] = $word["word_id"];

			$word_score[ $word["id"] ] = $word["score"];

			array_push($wordData,$word_data);
		}
		//Shuffle word list of the course
		shuffle($wordData);

		array_push($responseData, $wordData);

		array_push($responseData, $word_score);

		//This json data will be process by Javascript
		//To generate a complete course from this data
		//Include MCQ, TFQ, typing Quiz.s
		return Response::json( $responseData );
	}
	//Generate Filter Data
	//Include all word for user choose which need to learn
	//Filter data will not flush
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function getFilterData($objectId)
	{
		//Get all word of set for filter
		$wordlist = Object::find($objectId)->word;

		$data = array();

		foreach ($wordlist as $word) 
		{

			$layer = array();

			$layer["type"] 		= "filter";
			$layer["wordId"] 	= $word["id"];
			$layer["key"] 		= $word["key"];
			$layer["value"] 	= $word["value"];
			$layer["image"] = 'img/object/'.$objectId.'/'.$word["id"].'.jpg';
			//Push thís word to array of Course
			array_push($data,$layer);
		}
		//Return type as json Ajax.
		return Response::json($data);
	}
	//handle data after end Course
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function ajaxEndLearning()
	{
		Event::fire('set.learnEnd',array($data));
	}


	/**
	 * If filtered complete, then update and this will be a "Learned Object"
	 *
	 * Save to database 
	 * @param  $objectId
	 * @return View
	 */
	public function ajaxFilter($objectId)
	{
		$filterResult = Input::get('filterResult');

		$currentObject = Object::find($objectId);

		$word = $currentObject->word;
		//loop i, get array data in filter result
		$i = 0;

		//If this Object is not add by this User, return.
		if( !Auth::user()->ownThisObject( $objectId )){
			return Response::json(0);
		}
		//Update the word as R
		if( $currentObject->language == "en")
		{
			foreach($word as $words)
			{
				WordCollectionEN::create(array(
						'user_id' 	=> Auth::id(),
						'object_id'	=> $objectId,
						'word_id'	=> $words->id,
						'learn'		=> $filterResult[$i] == 1 ? 1 : 0,
						'remembered'=> 0
					));

				$i++;
			}
		}

		if( $currentObject->language == "jp")
		{
			foreach($word as $words)
			{

				WordCollectionJP::create(array(
						'user_id' 	=> Auth::id(),
						'object_id'	=> $objectId,
						'word_id'	=> $words->id,
						'learn'		=> $filterResult[$i] == 1 ? 1 : 0,
						'remembered'=> 0
					));

				$i++;
			}
		}

		ObjectCollection::
			whereRaw('user_id = ?', array(Auth::id()))
				->whereRaw('object_id = ?', array($objectId))
				->update(array('learned' => 1));

		//Return 1 if successful Follow and 0 if  Unfollow
        return Response::json(1);
	}



	public function trueMcq($objectId)
	{
		$wordId = Input::get('id');
		//Check type
		if( Object::find($objectId)->language == "jp" )
		{
			WordCollectionJP::find($wordId)->update("");
		}
	}
}
