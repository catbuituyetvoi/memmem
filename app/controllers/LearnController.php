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

	public function startLearn($objectId)
	{
		$data["object_id"] = $objectId;

		Session::set('objectId', $objectId);

		$data["object"] = Object::find( $objectId );

		$language = $data["object"]->language;

		$data["setCollection"] = SetCollection::
				whereRaw('user_id = ?', array(Auth::id()))
				->whereRaw('object_id = ?', array($objectId))
				->first();
		
		if($data["setCollection"])
		{
			if($data["setCollection"]->learned == 0)
			{
				$data["object"] = Object::find( $objectId );

				return View::make('learn.filter',$data);
			}
			//Get array of whole words where user choose to learn (learn=1)
			if($language == "en")
			{
				$wordlist = WordCollectionEN::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')
							->lists('word_id');

				$data["word"] = WordEN::
									whereIn('id',$wordlist)
									->get()
									->toArray();
			}
			//Get array of whole words where user choose to learn (learn=1)
			if($language == "jp")
			{
				$wordlist = WordCollectionJP::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')
							->lists('word_id');

				$data["word"] = WordJP::
									whereIn('id',$wordlist)
									->get()
									->toArray();
			}

			//If wwant to save currrent course id
			//$data["course_id"] = Redis::incr('course_id');
			//$data["session"] = Session::get($data["course_id"]);
			Event::fire('set.learnStart',array($data));
			
			return View::make('learn.learn',$data);
		}

		return View::make('learn.errAuth',$data);
	}


	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	//get all data for Course
	public function getCourseData($objectId){

		//Get array of whole words where user choose to learn (learn=1)
		if( Object::find($objectId)->language == "en")
		{

			$wordlist = WordCollectionEN::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')
							->lists('word_id');

			$wordlist = WordEN::whereIn('id',$wordlist)
									->get()
									->toArray();
		}

		//Get array of whole words where user choose to learn (learn=1)
		if( Object::find($objectId)->language == "jp")
		{

			$wordlist = WordCollectionJP::
							whereRaw('user_id = ?', array(Auth::id()))
							->whereRaw('object_id = ?', array($objectId))
							->whereRaw('learn = 1')
							->lists('word_id');

			$wordlist = WordJP::whereIn('id',$wordlist)
								->get()
								->toArray();
		}
		$data = array();
		//Shuffle word list of the course
		shuffle($wordlist);

		foreach ($wordlist as $word) 
		{
			$word_data = $word;


			$word_data["image"] = 'img/object/'.$objectId.'/'.$word["id"].'.jpg';


			//Push thís word to array of Course
			array_push($data,$word_data);
		}
		//This json data will be process by Javascript
		//To generate a complete course from this data
		//Include MCQ, TFQ, typing Quiz.
		return Response::json( $data );
	}
	//Generate Filter Data
	//Include all word for user choose which need to learn
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

	//If filtered complete, call this function
	/**
	 * Create a new cache repository with the given implementation.
	 *
	 * @param  \Illuminate\Cache\StoreInterface  $store
	 * @return \Illuminate\Cache\Repository
	 */
	public function ajaxFilter($objectId)
	{
		$filterResult = Input::get('filterResult');

		$currentObject = Object::find($objectId);

		$word = $currentObject->word;
		//loop i, get array data in filter result
		$i = 0;

		$count  = SetCollection::
					whereRaw('user_id = ?', array(Auth::id()))
					->whereRaw('object_id = ?', array($objectId))
					->count();

		//If this set is not add by this User, return.
		if($count == 0){
			return Response::json(0);
		}

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

		SetCollection::
			whereRaw('user_id = ?', array(Auth::id()))
				->whereRaw('object_id = ?', array($objectId))
				->update(array('learned' => 1));

		//Return 1 if successful Follow and 0 if  Unfollow
        return Response::json(1);
	}
}
