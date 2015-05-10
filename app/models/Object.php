<?php

class Object extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'object';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('id','set_id','title','desc','language');
	//Guard Field to Insert data from array
	//protected $guarded = array('id', 'password');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	//protected $hidden = array('password', 'remember_token');

	public function word()
	{
		if($this->language == "en")
			return $this->hasMany('WordEN','object_id');

		if($this->language == "jp")
			return $this->hasMany('WordJP','object_id');

	}

}
