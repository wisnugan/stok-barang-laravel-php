<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReturnTemp extends Model
{

    protected $fillable = [
        'purchase_id',
        'product_id',
        'return_quantity',
        'return_charge'
    ];
     
}
