<?php namespace MemMem\Mtime\Facades;
 
use Illuminate\Support\Facades\Facade;
 
class Mtime extends Facade {
 
  /**
   * Get the registered name of the component.
   *
   * @return string
   */
  	protected static function getFacadeAccessor() 
  	{ 
  		return 'Mtime'; 
	}
 
}