<?php

namespace App;
use \Illuminate\Database\Eloquent\Relations\Pivot;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Pivot
{
    protected $tables = 'recipe_ingredient';
    
    protected $fillable = [
        'recipe_id', 'ingredient_id', 'amount'
    ];
    
    protected function ingredient () {
        
        return $this->belongsTo('App\Ingredient', 'ingredient_id');
        
    }
    
    
}
