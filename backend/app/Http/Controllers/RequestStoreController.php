<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RequestStore;
use App\Ingredient;;
use Illuminate\Support\Facades\DB;
use App\PurchaseRequest;

class RequestStoreController extends Controller
{
    
    public function index($status = null ) {
        
       $requestsStores = null;
        $sql = null;
        
        if ($status === null  ){
            
              $sql ='SELECT i.name as ingredient_name, oi.order_id ,ro.* FROM request_stores ro JOIN ingredients i ON ro.ingredient_id = i.id JOIN order_ingredient oi ON ro.order_ingredient_id = oi.id WHERE  ro.status <> "Ingrediente entregado" order by oi.order_id asc' ; 

        } else if ($status !== null & $status === 'all') {

              $sql ='SELECT i.name as ingredient_name, oi.order_id ,ro.* FROM request_stores ro JOIN ingredients i ON ro.ingredient_id = i.id JOIN order_ingredient oi ON ro.order_ingredient_id = oi.id WHERE  ro.status = "Ingrediente entregado"  order by oi.order_id asc';
              
        } else {
            
             $data = array(
                
                'status' => 'error',
                'code' => 400,
                'message' => 'Consulta fallida',
                
               );
            
            
        }
        if($sql !== null ) {
            
            $sth = DB::connection()->getPdo()->prepare($sql);
            $sth->execute();
            $results = $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            $requestsStores = $results;
            
             $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'requestStores' => $requestsStores
                
             );
            
        }
        return response()->json($data, $data['code']);
        
    }
    


    public function process(Request $request) {
        
         // Obtenemos parámetros con el id de la solicitud de ingrediente
         
        $json = $request->input('json',null);
        $params_array = json_decode($json,true);
        $statusRequestStore = null;
        $statusPurchaseRequest = null;
        
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
                        'message' => 'No se ha procesado la solicitud',
                        'errors' => $validator->errors()

                    );
                
               } else {
              
                // Buscamos la solicitud
                $requestStore_id = $params_array['id'];
                
                $requestStore  = RequestStore::find($requestStore_id);   
                       
                
                $statusRequestStore = $requestStore->status;
                
                // validamos disponibilidad del ingrediente contra la solicitud
               
                $ingredient = $requestStore->ingredient;
                $stockAvailable = $ingredient->stock - $ingredient->stockReserved;
                
                /*** buscamos cantidad disponible ya del ingrediente en la orden **/
                
                 if ( $stockAvailable >=  $requestStore->amount && $statusRequestStore !== 'Ingrediente entregado' ){
                     
                     // Se reserva en inventario las unidades del ingrediente
                     
                     $ingredient->stockReserved +=  $requestStore->amount;
                     $ingredient->save();
                     
                     // Se cambia el estado de la solicitud de ingrediente
                     $statusRequestStore = 'Ingrediente entregado';
                     
                     $requestStore->status = $statusRequestStore;
                     $requestStore->save();
                     
                     // Buscamos el ingrediente en la orden y actualizamos la cantidad disponible
                     $orderIngredient = $requestStore->orderIngredient;
                     
                     $orderIngredient->amountAvailable +=  $requestStore->amount;                     
                     $orderIngredient->save();
                     
                     
                     
                 } else if ($stockAvailable <  $requestStore->amount && $statusRequestStore  === 'Ingrediente solicitado' ) {
                     
                     $requestStoreAmount = $requestStore->amount;
                             
                     if ($stockAvailable    > 0 ){
                         
                         //Reservamos las unidades que hayan en inventario del ingrediente
                         $requestStoreAmount -= $stockAvailable;
                         
                         // Se reserva en inventario las unidades del ingrediente
                         $ingredient->stockReserved +=  $stockAvailable;
                         $ingredient->save();
                         
                          // Buscamos el ingrediente en la orden y actualizamos la cantidad disponible
                          $orderIngredient = $requestStore->orderIngredient;
                          
                     
                           $orderIngredient->amountAvailable +=  $stockAvailable;                     
                           $orderIngredient->save();
                                 
                     }
                     
                     // Se crea solicitud de compra
                     
                     $purchaseRequest = new PurchaseRequest();
                     
                     $statusPurchaseRequest =  'Enviado a  compra';
                     
                     $purchaseRequest->ingredient_id = $requestStore->ingredient_id;
                     $purchaseRequest->request_store_id = $requestStore->id;
                     $purchaseRequest->amount = $requestStoreAmount;
                     $purchaseRequest->amountPurchase = 0;
                     $purchaseRequest->status = $statusPurchaseRequest ; 
                     $purchaseRequest->save();
                     
                     $statusRequestStore = 'Pendiente por compra';
                     $requestStore->status = $statusRequestStore;
                     
                     $requestStore->save();
                     
                 }
                               
                               
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El proceso se ha ejecutado satisfactoriamente',
                    'requestStore' => $requestStore
                );
                
            }
            
            
        }
        
        return response()->json($data,$data['code']);
        
    }

    
}
