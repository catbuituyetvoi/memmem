<?php

class ObjectCollection extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'objectcollection';

	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('user_id','object_id','learned','setting','language');
	
	public function object()
	{
		return $this->belongsTo('Object');
	}
}
