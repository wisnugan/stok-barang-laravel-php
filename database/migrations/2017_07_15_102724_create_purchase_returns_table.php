<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchaseReturnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('return_purchases', function(Blueprint $table)
      {
        $table->increments('id');
        $table->integer('purchase_id')->unsigned();
  		$table->foreign('purchase_id')->references('id')->on('purchases')->onDelete('cascade');
        $table->integer('supplier_id')->unsigned();
  		$table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('restrict');
        $table->integer('product_id')->unsigned();
  		$table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
        $table->integer('return_quantity');
        $table->integer('return_price');
        $table->integer('return_charge');
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
        Schema::drop('return_purchases');
    }
}
