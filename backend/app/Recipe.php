<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $tables = 'recipes';
    
    protected $fillable = [
        'name'
    ] ;
    
    /*
    protected function ingredients(){
        
       return $this->belongsToMany('App\Ingredient')->using('App\RecipeIngredient');
        
    } 
     */
    
    protected function details() {
        
        return $this->hasMany('App\RecipeIngredient');
        
    }
}
