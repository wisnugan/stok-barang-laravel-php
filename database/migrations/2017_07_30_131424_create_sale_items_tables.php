<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSaleItemsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('sale_items', function(Blueprint $table)
      {
        $table->increments('id');
  		$table->integer('sale_id')->unsigned();
  		$table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
        $table->integer('source_id')->unsigned();
  		$table->foreign('source_id')->references('id')->on('sources')->onDelete('restrict');
        $table->integer('product_id')->unsigned();
  		$table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
        $table->integer('saleItem_price');
        $table->integer('saleItem_quantity');
        $table->integer('saleItem_extra');
        $table->integer('saleItem_discount');
        $table->integer('saleItem_total');
        $table->integer('user_id')->index();
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
        Schema::drop('sale_items');
    }
}
