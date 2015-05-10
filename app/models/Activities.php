<?php

class Activities extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'activities';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('id','user_id', 'action','object_id','note');
	//Guard Field to Insert data from array
	//protected $guarded = array('id', 'password');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	//protected $hidden = array('password', 'remember_token');
	public function owner()
	{
		return $this->belongsTo('User','user_id');
	}
}