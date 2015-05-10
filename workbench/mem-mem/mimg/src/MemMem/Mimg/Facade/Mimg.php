<?php namespace MemMem\Mimg\Facades;
 
use Illuminate\Support\Facades\Facade;
 
class Mimg extends Facade {
 
  /**
   * Get the registered name of the component.
   *
   * @return string
   */
  	protected static function getFacadeAccessor() 
  	{ 
  		return 'Mimg'; 
	}
 
}