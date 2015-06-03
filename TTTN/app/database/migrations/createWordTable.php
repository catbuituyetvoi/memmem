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
		Schema::create('word', function($table)
		{
	        $table->int('id')->primary();
	        $table->int('set_id');
	        $table->string('key',50);
	        $table->string('value', 50);
	        $table->string('desc');
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