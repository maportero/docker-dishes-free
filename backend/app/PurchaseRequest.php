<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PurchaseRequest extends Model
{
    
    protected $tables = 'purchase_requests';
    
    protected $fillable = [
            'ingredient_id', 'request_store_id', 'amount', 'amountPurchase', 'status' 
    ];
    
    protected function ingredient () {
        
        return $this->belongsTo('App\Ingredient','ingredient_id');
        
    }
    
    protected function requestStore(){
        
        return $this->belongsTo('App\RequestStore', 'request_store_id');
        
    }
}
