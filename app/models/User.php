<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';
	/* Alowing Eloquent to insert data into our database */
	protected $fillable = array('email', 'username', 'password');
	//Guard Field to Insert data from array
	protected $guarded = array('id', 'password');
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */

	protected $hidden = array('password', 'remember_token');

	public function follower()
	{
    	return $this->belongsToMany('User', 'follower', 'follow_id', 'user_id');
	}

	public function following()
	{
    	return $this->belongsToMany('User', 'follower', 'user_id', 'follow_id');
	}

	public function isFollowing($id)
	{
		return $this->following->contains($id);
	}

	public function hasFollower($id)
	{
		return $this->follower->contains($id);
	}

	public function set()
	{
		return $this->hasMany('SetCollection','user_id');
	}

}
