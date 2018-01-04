<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{

    protected $fillable = [
        'sale_id',
        'source_id',
        'product_id',
        'saleItem_price',
        'saleItem_quantity',
        'saleItem_extra',
        'saleItem_discount',
        'saleItem_total'
    ];
	
	public function product()
    {
        return $this->belongsTo('App\Product');
    }

	public function sale()
    {
        return $this->belongsTo('App\Sale');
    }

	public function source()
    {
        return $this->belongsTo('App\Source');
    }    
}
