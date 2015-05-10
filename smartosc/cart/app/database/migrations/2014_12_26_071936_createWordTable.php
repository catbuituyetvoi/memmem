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
		if (Schema::hasTable('users'))
		{
		    //
		}
		else
		{
			Schema::create('users', function($table)
			{
		        $table->increments('id')->primary();
		        $table->string('name',50);
		        $table->string('username',50);
		        $table->string('email',50);
		        //password must be 100 length for store hashes remember token
		        $table->string('password', 100);
		         $table->integer('type', 1);
		        $table->string('remember_token',60);
		        $table->timestamps('expire');
		        $table->timestamps();
	    	});
		}
		//
		if (Schema::hasTable('software'))
		{
		    //
		}
		else
		{
			Schema::create('software', function($table)
			{
		        $table->increments('id')->primary();
		        $table->string('notation',50);
		        $table->string('name',50);
		        $table->timestamps();
	    	});
		}

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::drop('user');
	}

}
