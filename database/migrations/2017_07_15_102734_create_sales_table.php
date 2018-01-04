<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('sales', function(Blueprint $table)
      {
        $table->increments('id');
        $table->date('sale_date');
        $table->string('sale_nomor', 255);
        $table->string('source_id', 25);
        $table->string('sale_info', 255)->nullable();
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
        Schema::drop('sales');
    }
}
