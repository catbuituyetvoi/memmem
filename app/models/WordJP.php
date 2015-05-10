<?php

class WordJP extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'word_jp';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('romaji','exampleEn','hiragana','englishMean','kanjiMean','phonetic','id','object_id', 'key','value','synonyms','pronounciation','definition','definitionVi','exampleJp','exampleVi','origin','attributes','similar');
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
