<?php

class WordCollectionEN extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'wordcollection_en';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('user_id','object_id','word_id','learn','remembered');
	//Turn off timestamps

}
