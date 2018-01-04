<?php

namespace App;

use Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Automatically creates hash for the user password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function purchase()
    {
        return $this->hasMany('App\Purchase');
    }
	
     public function purchaseItem()
    {
        return $this->hasMany('App\PurchaseItem');
    }
    
    public function product()
    {
        return $this->hasMany('App\Product');
    }
    
    public function categorie()
    {
        return $this->hasMany('App\Categorie');
    }
	
	public function location()
    {
        return $this->hasMany('App\Location');
    }

	public function returnPurchase()
    {
        return $this->hasMany('App\ReturnPurchase');
    }

    public function sale()
    {
        return $this->hasMany('App\Sale');
    }   
    
    public function saleItem()
    {
        return $this->hasMany('App\SaleItem');
    }      
    
    public function source()
    {
        return $this->hasMany('App\Source');
    }
    
    public function supplier()
    {
        return $this->hasMany('App\Supplier');
    }   
}
