<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\Pivot;

class OrderIngredient extends Pivot
{
    protected $tables = 'order_ingredient';
    
    protected $fillable = [
        'order_id', 'ingredient_id', 'amountNeeded', 'amountAvailable'
    ];
    
    protected function ingredient(){
        
        return $this->belongsTo('App\ingredient', 'ingredient_id');
        
    }
    
}
