<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Sale extends Model
{
	
    protected $fillable = [
        'sale_date',
        'sale_nomor',
        'source_id',
        'sale_info'
    ];
    
    public function getSaleDateAttribute($attr) {        
        return Carbon::parse($attr)->format('d F Y'); //Change the format to whichever you desire
    }
	
	public function saleitem()
    {
        return $this->hasMany('App\SaleItem', 'sale_id');
    }	
    
 	public function source()
    {
        return $this->belongsTo('App\Source');
    }   
  
}
