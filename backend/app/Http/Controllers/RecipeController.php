<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Recipe;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
public function index() {
        
            $recipes = Recipe::All();
           
            $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'recipes' => $recipes
                
              );

        return response()->json($data, $data['code']);
        
    }

public function detail ($id){
        
        $data = null;
       
        // Buscamos la receta 
        
        $recipe = Recipe::find($id);
;       
        
        if (is_object($recipe)){
            
           
             // Buscamos el detalle de la orden con los ingredientes asociados
            
             $sql ='select ri.*, i.name as ingredient_name from recipe_ingredient ri JOIN ingredients i ON ri.ingredient_id = i.id where ri.recipe_id =' .$id; 
              
             
              
             $sth = DB::connection()->getPdo()->prepare($sql);
             $sth->execute();
             $ingredients = $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            
            
            $data = array (
                    "status" => "sucess",
                    'code' => 200,
                    'message' => 'Datos encontrados',
                    'recipe' => $recipe,
                    'details' => $ingredients
             );
            
        } else {
            
            $data = array(
              'status' => 'error',
               'code' => 400,
               'message' => 'No existe la receta'
            );
                
        }
        
        return response()->json($data, $data['code']);
        
    }

public function detailRecipe ($id){
        
        $data = null;
       
        // Buscamos la receta 
        
        $recipe = Recipe::find($id);
;       
        
        if (is_object($recipe)){
            
           
             // Buscamos el detalle de la orden con los ingredientes asociados
            
             $details = $recipe->details;
            
             foreach ($details as $detail){
                 
                 $ingredient = $detail->ingredient;
                 
             }
            
            $data = array (
                    "status" => "success",
                    'code' => 200,
                    'message' => 'Datos encontrados',
                    'recipe' => $recipe,
                    
                    
             );
            
        } else {
            
            $data = array(
              'status' => 'error',
               'code' => 400,
               'message' => 'No existe la receta'
            );
                
        }
        
        return response()->json($data, $data['code']);
        
    }
    
}
