<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchaseItemTempsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('purchase_temps', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
            $table->integer('purchaseTemp_price');
            $table->integer('purchaseTemp_quantity');
            $table->integer('purchaseTemp_charge');
            $table->integer('purchaseTemp_discount');
            $table->integer('purchaseTemp_total');
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
        Schema::drop('purchase_temps');
    }
}
