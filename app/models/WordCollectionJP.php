<?php

class WordCollectionJP extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'wordcollection_jp';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('user_id','object_id','word_id','learn','remembered');
	//Turn off timestamps
	public function word()
	{
		return $this->belongsTo('WordJP');
	}
}
