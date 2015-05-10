<?php

class WordEN extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'word_en';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('id','object_id', 'key','value','synonyms','pronounciation','definition','definitionVi','example1','example1Vi','example2','example2Vi','example3','example3Vi','origin','attributes','similar');
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
