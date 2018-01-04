<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleTemp extends Model
{
   protected $fillable = [
        'product_id',
        'saleTemp_price',
        'saleTemp_quantity',
        'saleTemp_extra',
        'saleTemp_discount',
        'saleTemp_total'
    ];
	
	public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
