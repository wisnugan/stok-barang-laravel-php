<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('suppliers', function (Blueprint $table) {
          $table->increments('id');
          $table->string('supplier_name', 100);
          $table->string('supplier_employee', 100);
          $table->string('supplier_email', 30);
          $table->string('supplier_phone1', 20)->nullable();
          $table->string('supplier_phone2', 20)->nullable();
          $table->string('supplier_address', 255);
          $table->string('supplier_state', 30);
          $table->string('supplier_info', 255)->nullable();
          $table->integer('user_id')->index();
          $table->timestamps();
      });        //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('suppliers');
    }
}
