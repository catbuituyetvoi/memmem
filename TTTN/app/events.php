<?php
	Event::listen('set.addToCollection', function($data)
	{
		//This event fire at
		//User 
		$setId = $data["setId"];

    	$set = Set::find( $setId );

    	$author = $set->author_id;

    	$count  = SetCollection::
			whereRaw('user_id = ?', array(Auth::id()))
				->whereRaw('set_id = ?', array( $setId ))
				->count();

		if($count == 0)
		{
			foreach( $set->object as $object )
			{
		    	SetCollection::create(
					array(
						'user_id' => Auth::id(),
						'set_id' => $data["setId"],
						'object_id' => $object->id,
						'learned' => 0,
						'course_id' => 0
						)
					);
	    	}

	    	//Add to Activities, tell that user was add this set
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
		SetCollection::
					whereRaw('user_id = ?', array(Auth::id()))
					->whereRaw('object_id = ?', array($data["object_id"]))
					->update(array('course_id' => $data["course_id"]));

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

