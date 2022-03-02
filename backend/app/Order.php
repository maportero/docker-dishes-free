<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    
    protected $tables = 'orders';
    
    protected $fillable = [
        'recipe_id',  'amount', 'status' 
    ];
  
    /*
    protected function ingredients(){
        
       return $this->belongsToMany('App\Ingredient')->using('App\OrderIngredient');
       
        
    } 
    */
    protected function details(){
        
         return $this->hasMany('App\OrderIngredient');
        
    }
    
    protected function recipe(){
        
        return $this->belongsTo('App\Recipe');
        
    }
    
}
