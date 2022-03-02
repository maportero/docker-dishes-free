<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestStore extends Model
{
    protected $tables = 'request_stores';
    
    protected $fillable = [
        'ingredient_id', 'order_ingredient_id', 'amount', 'status'
    ];
    
    
    protected function orderIngredient () {
        
        
        return $this->belongsTo('App\OrderIngredient', 'order_ingredient_id');
        
    }
    
    protected function ingredient () {
        
        return $this->belongsTo('App\Ingredient','ingredient_id');
        
    }
    
}
