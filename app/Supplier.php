<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    
    protected $fillable = [
        'supplier_name',
        'supplier_employee',
        'supplier_email',
        'supplier_phone1',
        'supplier_phone2',
        'supplier_address',
        'supplier_state',
        'supplier_info'
    ];
	
    public function purchase()
    {
        return $this->hasMany('App\Purchase', 'supplier_id');
    }
    
    public function purchaseItem()
    {
        return $this->hasMany('App\PurchaseItem', 'supplier_id');
    }
    
    public function returnPurchase()
    {
        return $this->hasMany('App\ReturnPurchase', 'supplier_id');
    }
    
}
