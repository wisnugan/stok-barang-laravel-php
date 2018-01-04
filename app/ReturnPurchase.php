<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ReturnPurchase extends Model
{

    protected $fillable = [
        'purchase_id',
        'product_id',
        'return_quantity',
        'return_price',
        'return_charge',
        'return_total',
        'return_info'
    ];
	
    public function getCreatedAtAttribute($attr) {        
        return Carbon::parse($attr)->format('d F Y'); //Change the format to whichever you desire
    }
	
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
