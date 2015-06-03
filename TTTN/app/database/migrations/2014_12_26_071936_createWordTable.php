<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWordTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		if (Schema::hasTable('word'))
		{
		    //
		}
		else
		{
			Schema::create('word', function($table)
			{
		        $table->integer('id')->primary();
		        $table->integer('set_id');
		        $table->string('key',50);
		        $table->string('value', 50);
		        $table->string('desc');
		        $table->timestamps();
	    	});
		}
    	Schema::create('setCollection', function($table)
		{
	        $table->integer('user_id');
	        $table->integer('set_id');
	        $table->integer('author_id');
	        $table->integer('owner_id');
	        $table->integer('learned');
	        $table->integer('course_id');
	        $table->timestamps();
    	});
    	Schema::create('wordCollection', function($table)
		{
	        $table->integer('user_id');
	        $table->integer('set_id');
	        $table->integer('word_id');
	        //If Learn is set to 1, this will be in learning list
	        $table->integer('learn');
	        $table->integer('remembered');
	        $table->timestamps();

    	});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::drop('word');
	}

}
