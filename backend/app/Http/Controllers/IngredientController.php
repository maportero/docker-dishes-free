<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;

class IngredientController extends Controller
{
    
    public function index() {
        
            $ingredients = Ingredient::All();
           
            $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'ingredients' => $ingredients
                
              );

        return response()->json($data, $data['code']);
    }
    
}
