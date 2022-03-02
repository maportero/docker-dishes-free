<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $tables =  'ingredients';
    
    protected $fillable = [
        'name', 'stock', 'stockMin', 'stockReserved'
    ];
    
}
