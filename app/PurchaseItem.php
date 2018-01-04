<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model
{
    protected $fillable = [
        'purchase_id',
        'product_id',
        'purchaseItem_price',
        'purchaseItem_quantity',
        'purchaseItem_charge',
        'purchaseItem_discount',
        'purchaseItem_total'
    ];

	
	public function purchase()
    {
        return $this->belongsTo('App\Purchase');
    }
	
	public function product()
    {
        return $this->belongsTo('App\Product');
    }
    
    public function supplier()
    {
        return $this->belongsTo('App\Supplier');
    }

}
