<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $fillable = [
        'source_name'
    ];
	
	public function sale()
    {
        return $this->hasMany('App\Sale', 'source_id');
    }
    
	public function saleItem()
    {
        return $this->hasMany('App\SaleItem', 'source_id');
    }
}
