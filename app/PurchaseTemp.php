<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseTemp extends Model
{
    protected $fillable = [
        'product_id',
        'purchaseTemp_price',
        'purchaseTemp_quantity',
        'purchaseTemp_charge',
        'purchaseTemp_discount',
        'purchaseTemp_total'
    ];

	public function product()
    {
        return $this->belongsTo('App\Product');
    }
}
