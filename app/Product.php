<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    protected $fillable = [
        'product_code',
        'product_name',
        'categorie_id',
        'locations_id',
        'product_cost',
        'product_quantity',
        'product_info'
    ];
	
	public function purchasetemp()
    {
        return $this->hasMany('App\PurchaseTemp', 'product_id')->orderBy('id', 'DESC');
    }
	
	public function purchaseitem()
    {
        return $this->hasMany('App\PurchaseItem', 'product_id')->orderBy('id', 'DESC');
    }
	
	public function returnPurchase()
    {
        return $this->hasMany('App\ReturnPurchase', 'product_id');
    }
	
	public function saleitem()
    {
        return $this->hasMany('App\SaleItem', 'product_id');
    }
	
	public function saletemp()
    {
        return $this->hasMany('App\SaleTemp', 'product_id');
    }
	
	public function location()
    {
        return $this->belongsTo('App\Location');
    }
	
    public function categorie()
    {
        return $this->belongsTo('App\Categorie');
    }
	
}
