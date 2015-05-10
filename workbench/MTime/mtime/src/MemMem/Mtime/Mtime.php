<?php namespace MemMem\Mtime;

use Carbon\Carbon;
 
class Mtime {
	 
	
  	/**
	 * Calculate last time
	 *
	 * @param  Time to calculate
	 * @return String
	 */
  	public static function getTime($time)
  	{
  		echo $time->diffForHumans(Carbon::now());
  	}
  	
}