<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Order;
use App\Recipe;
use App\Ingredient;
use App\RequestStore;
use App\RecipeIngredient;
use App\OrderIngredient;

class OrderController extends Controller
{
    public function index($status = null ) {
        
       $orders = null;
        
        if ($status === null  ){
            
            $orders = Order::where('status', '<>', 'Orden completada')->get();
           
            $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'orders' => $orders
                
              );
            
        } else if ($status !== null & $status === 'all') {
            
            $orders = Order::where('status', '=', 'Orden completada')->get();
            
            $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'orders' => $orders
                
             );
            
        } else {
            
             $data = array(
                
                'status' => 'error',
                'code' => 400,
                'message' => 'Consulta fallida',
                
               );
            
            
        }
        
        
        return response()->json($data, $data['code']);
        
    }
    
    
    public function detail ($id){
        
        $data = null;
       
        // Buscamos la orden con su receta asociada
        
        $sql ='select o.*, r.name as recipe_name from orders o JOIN recipes r ON o.recipe_id = r.id where o.id ='.$id ; 
        $sth = DB::connection()->getPdo()->prepare($sql);
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        
        
        
        $order = $result;
;       
        if (count($order) > 0){
            
           
             // Buscamos el detalle de la orden con los ingredientes asocialeos
            
             $sql ='select i.name as ingredient_name, oi.* from order_ingredient oi JOIN ingredients i ON oi.ingredient_id = i.id where oi.order_id = ' .$id; 
              
              
             $sth = DB::connection()->getPdo()->prepare($sql);
             $sth->execute();
             $ingredients = $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            
            
            $data = array (
                    "status" => "success",
                    'code' => 200,
                    'message' => 'Datos encontrados',
                    'order' => $order,
                    'details' => $ingredients
             );
            
        } else {
            
            $data = array(
              'status' => 'error',
               'code' => 400,
               'message' => 'No existe la orden'
            );
                
        }
        
        return response()->json($data, $data['code']);
        
    }
    
    
    public function store(Request $request) {
        
        //Recogemnos datos de la orden
        
        $json = $request->input('json',null);
        $params_array = json_decode($json,true);
        
        if (!empty($params_array)) {
            
            //limpiamos los datos
            
            $params_array = array_map('trim',$params_array);
            
            //Validamos los datos
            
            $validator = \Validator::make($params_array, [
               'amount' => 'required|integer|min:1|max:5' 
            ]);
            
            if ($validator->fails()){
                
                $data = array(
                    
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'No se ha registrado la orden',
                    'errors' => $validator->errors()
                        
                );
                
            } else {
              
                // Buscamos una receta aleatoriamente
                
                $sql ='SELECT id FROM recipes ORDER BY RAND() LIMIT 1'; 
                $sth = DB::connection()->getPdo()->prepare($sql);
                $sth->execute();
                $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
                
                $recipe_id = $result[0]['id'];
                
                //Creamos la orden
                $order = new Order();
                $order->amount = $params_array['amount'];
                $order->recipe_id = $recipe_id;
                $order->status = 'Orden nueva';
                
                $order-> save();
                
                
                
               // Buscamos los ingredientes de la receta seleccionada
                
                $recipeIngredients = RecipeIngredient::where([
                    'recipe_id' => $recipe_id
                ])->get();
                
                
                 // Creamos los ingredientes de la orden
                
                foreach($recipeIngredients as $recipeIngredient){
                    
                    $orderIngredient = new OrderIngredient();
                    $orderIngredient->ingredient_id = $recipeIngredient->ingredient_id;
                    $orderIngredient->order_id = $order->id;
                    $orderIngredient->amountNeeded = $order->amount * $recipeIngredient->amount;
                    $orderIngredient->amountAvailable = 0;
                    $orderIngredient->save();
                    
                }
                
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'La orden se ha generado satisfactoriamente',
                    'order' => $order
                );
                
            }
        } else {
            $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Los datos no son correctos'
             );
        }
        
        return response()->json($data, $data['code']);
        
    }
    

    public function process(Request $request) {
        
         // obtenemos parámetros con el id de la orden
         
        $json = $request->input('json',null);
        $params_array = json_decode($json,true);
        
        if (!empty($params_array)) {
        
            $params_array = array_map('trim',$params_array);
            
            //Validamos los datos
            
            $validator = \Validator::make($params_array, [
               'id' => 'required|integer' 
            ]);
            
             if ($validator->fails()){
                
                    $data = array(

                        'status' => 'error',
                        'code' => 404,
                        'message' => 'No se ha procesado la orden',
                        'errors' => $validator->errors()

                    );
                
               } else {
              
                // Buscamos la orden
                
                $order_id =  $params_array['id'];  
                $order = Order::find($order_id);   
                
                // obtenemos los ingredientes de la orden 
                
                $details = $order->details;
                $statusOrder = $order->status;
                
                $totalAmountNeeded = 0;
                $totalAmountAvailable = 0;
                
                foreach ($details as $detail ) {
                    
                    // Validamos si faltan unidades del ingrediente
                    $amountLack = $detail->amountNeeded - $detail->amountAvailable;
                    
                    $totalAmountNeeded += $detail->amountNeeded;
                    $totalAmountAvailable += $detail->amountAvailable;

                    
                    if ( $amountLack > 0 && $statusOrder === 'Orden nueva') {   //Faltan unidades del ingrediente
                        
                        //Solicitamos los ingredientes a la bodega si la orden es nueva
                        
                            $requestStore = new RequestStore();
                            
                            $requestStore->ingredient_id = $detail->ingredient_id;
                            $requestStore->order_ingredient_id = $detail->id;
                            $requestStore->amount = $detail->amountNeeded;
                            $requestStore->status = 'Ingrediente solicitado';
                            
                            $requestStore->save();
                                                                                
                    }
               
                }// end foreach
                
                $update_values_order = null;
                
                // Validamos si faltan ingredientes y la Orden es nueva para cambiar estado a la orden
                If ( $totalAmountNeeded > $totalAmountAvailable && $statusOrder === 'Orden nueva' ) { 
                    
                    $update_values_order = array(
                      'status' => 'Ingredientes solicitados'  
                    );
                    
                    
                    
                }else  if ($totalAmountNeeded === $totalAmountAvailable && $statusOrder === 'Ingredientes solicitados') {
                    
                    $update_values_order = array(
                      'status' => 'Ingredientes disponibles'  
                    );
                    
                    
                    
                }else  if ($totalAmountNeeded === $totalAmountAvailable && $statusOrder === 'Ingredientes disponibles') {
                  
                    //Completamos la orden y descontamos los ingredientes del inventario
                    
                    foreach ($details as $detail ) {
                        
                        $ingredient = Ingredient::find($detail->ingredient_id);
                        
                        $update_values_ingredient = array(
                                    'stock' => $ingredient->stock - $detail->amountAvailable,
                                    'stockReserved' => $ingredient->stockReserved - $detail->amountAvailable,
                        );
                        
                       $ingredient_updated = Ingredient::where('id', $detail->ingredient_id )->update($update_values_ingredient);
                        
                    }
                    
                    //Cambiamos el estado de la orden
                    
                    $update_values_order = array(
                      'status' => 'Orden completada'  
                    );
                    
                    
                    
                }
                
                if ($update_values_order !== null  ) {
                    
                    $order_updated = Order::where('id',$order_id)->update($update_values_order); 
                    
                }   
                
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El proceso se ha ejecutado satisfactoriamente',
                    'order' => $order
                );
                
            }
            
            
        }
        
        return response()->json($data,$data['code']);
        
    }

    
    
    
   }
