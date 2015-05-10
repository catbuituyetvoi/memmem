<?php

class Feed extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'feed';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('id','user_id', 'feed_type','feed_content','source_id');
	//Guard Field to Insert data from array
	//protected $guarded = array('id', 'password');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	//protected $hidden = array('password', 'remember_token');
	public function object()
	{
		return $this->belongsTo('Object','object_id');
	}
}
