<?php

class Set extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'set';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('id','author_id', 'last_edit','title','desc');
	//Guard Field to Insert data from array
	//protected $guarded = array('id', 'password');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	//protected $hidden = array('password', 'remember_token');
	public function author()
	{
		return $this->belongsTo('User','author_id');
	}
	public function word()
	{
		return $this->hasMany('Word','set_id');
	}
}
