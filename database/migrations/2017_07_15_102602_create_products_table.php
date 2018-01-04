<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('products', function (Blueprint $table) {
          $table->increments('id');
          $table->string('product_code', 100);
          $table->string('product_name', 100);
          $table->integer('categorie_id')->unsigned()->nullable();
          $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('restrict');
          $table->integer('location_id')->unsigned()->nullable();;
          $table->foreign('location_id')->references('id')->on('locations')->onDelete('restrict');
          $table->integer('product_cost');
          $table->integer('product_quantity');
          $table->string('product_info', 255)->nullable();
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
        Schema::drop('products');
    }
}
