<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $tables = 'purchases';
    
    protected $fillable = [
            'ingredient_id', 'amount', 'status' 
    ];
    
    protected function ingredient () {
        
        return $this->belongsTo('App\Ingredient','ingredient_id');
        
    }
    
}
