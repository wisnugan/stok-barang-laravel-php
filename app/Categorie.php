<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = [
        'categorie_name',
        'categorie_sub',
    ];
	
	public function item()
    {
        return $this->hasMany('App\Item', 'categorie_id');
    }

}
