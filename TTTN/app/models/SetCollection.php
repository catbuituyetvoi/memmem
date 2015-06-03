<?php

class SetCollection extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'setcollection';

	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('user_id','set_id','object_id', 'learned','course_id');
	
	public function set()
	{
		return $this->belongsTo('Set','set_id');
	}

	public function currentLearningObject()
	{
		return $this->belongsTo('Object','object_id');
	}
}
