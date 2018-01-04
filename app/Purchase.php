<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Purchase extends Model
{

    protected $fillable = [
        'supplier_id',
        'purchase_date',
        'purchase_order',
        'purchase_info'
    ];
    
    public function getPurchaseDateAttribute($attr) {        
        return Carbon::parse($attr)->format('d F Y'); //Change the format to whichever you desire
    }
    
	public function purchaseitem()
    {
        return $this->hasMany('App\PurchaseItem', 'purchase_id')->orderBy('id', 'DESC');
    }
	
	public function returnPurchase()
    {
        return $this->hasMany('App\Purchase', 'purchase_id');
    }
	
    public function supplier()
    {
        return $this->belongsTo('App\Supplier');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    
}
