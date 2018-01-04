<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReturnTempsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('return_temps', function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('return_id')->unsigned()->nullable();
        $table->foreign('return_id')->references('id')->on('return_purchases')->onDelete('restrict');
        $table->integer('purchase_id')->unsigned()->nullable();
        $table->foreign('purchase_id')->references('id')->on('purchases')->onDelete('restrict');
        $table->integer('product_id')->unsigned()->nullable();
        $table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
        $table->integer('returnTemp_quantity');
        $table->integer('returnTemp_price')->nullable();
        $table->integer('returnTemp_charge');
        $table->string('return_info', 255)->nullable();
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
        Schema::drop('return_temps');
    }
}
