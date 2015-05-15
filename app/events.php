<?php

	//This event fire at
	//User add add a set to their collection
	Event::listen('set.addToCollection', function($data)
	{
			$setId = $data["setId"];

    	$set = Set::find( $setId );

    	$author = $set->author_id;

    	$count  = SetCollection::
								whereRaw('user_id = ?', array(Auth::id()))
									->whereRaw('set_id = ?', array( $setId ))
									->count();
		//Ìf this Set Exists
		if($count == 0)
		{
			//Add this set to user's collection
			SetCollection::create(
						array(
							'user_id' => Auth::id(),
							'set_id' => $data["setId"],
							'course_id' => 0
							)
						);

			//Add all object of this set
			foreach( $set->object as $object )
			{
				
		    	ObjectCollection::create(
						array(
							'user_id' => Auth::id(),
							'object_id' => $object->id,
							'learned' => 0,
							//'language' => $set->language
							)
						);
	    }

	    	//Add to Activities, tell other that user was add this set
	    	Activities::create(
	    					array
	    					(
	    						'user_id' => Auth::id(),
	    						'action' => 1,
	    						'object_id' => $setId
	    					)
	    				);
    	}

  
   
	});

	//if User sharing this sets, add to Share Area
	Event::listen('set.addToShare', function($data)
	{
		//Add to Shared Set for community

	});

	//if User create new set
	Event::listen('set.createNewSet', function($data)
	{
		//Add to Shared Set for community

	});

	//Event for Leaning stored in session
	Event::listen('set.learnStart', function($data)
	{
		//if is start learning, create and save a COURSE
		//After learning COURSE, delete it
		//SetCollection::
		//			whereRaw('user_id = ?', array(Auth::id()))
		//			->whereRaw('object_id = ?', array($data["object_id"]))
		//			->update(array('course_id' => $data["course_id"]));

	});

	//Event for Leaning stored in session
	Event::listen('set.learnFinish', function($data)
	{
		//Update Course Id to 0. To Ensure this is finish.
		SetCollection::
					whereRaw('user_id = ?', array(Auth::id()))
					->whereRaw('set_id = ?', array($data["set_id"]))
					->update(array('course_id' => 0));

	});

