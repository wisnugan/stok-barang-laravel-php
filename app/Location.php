<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'location_name',
        'location_sub',
    ];
	
	public function item()
    {
        return $this->hasMany('App\Item', 'location_id');
    }
}
