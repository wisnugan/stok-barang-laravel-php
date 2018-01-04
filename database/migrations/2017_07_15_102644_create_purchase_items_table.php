<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchaseItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('purchase_items', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('purchase_id')->unsigned();
            $table->foreign('purchase_id')->references('id')->on('purchases')->onDelete('cascade');
            $table->integer('supplier__id')->unsigned();
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('restrict');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('restrict');
            $table->integer('purchaseItem_price');
            $table->integer('purchaseItem_quantity');
            $table->integer('purchaseItem_charge');
            $table->integer('purchaseItem_discount');
            $table->integer('purchaseItem_total');
            $table->string('purchaseItem_info', 255)->nullable();
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
        Schema::drop('purchase_items');
    }
}
