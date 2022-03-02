<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\PurchaseRequest;
use App\Purchase;

class PurchaseRequestController extends Controller
{
    
    public function index($status = null ) {
        
       $purchaseRequests = null;
       $sql = null;
        
        if ($status === null  ){
            
              $sql ="SELECT i.name as ingredient_name, oi.order_id, pr.* FROM purchase_requests pr JOIN ingredients i ON pr.ingredient_id = i.id
                        JOIN request_stores rs ON pr.request_store_id = rs.id
                        JOIN order_ingredient oi ON rs.order_ingredient_id = oi.id 
                        WHERE  pr.status <> 'Compra completada' order by oi.order_id";
              
              
        } else if ($status !== null & $status === 'all') {

              $sql ='SELECT i.name as ingredient_name, oi.order_id, pr.* FROM purchase_requests pr JOIN ingredients i ON pr.ingredient_id = i.id
                        JOIN request_stores rs ON pr.request_store_id = rs.id
                        JOIN order_ingredient oi ON rs.order_ingredient_id = oi.id order by oi.order_id';
              
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
            
            $purchaseRequests = $results;
            
             $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'purchaseRequests' => $purchaseRequests
                
             );
            
        }
        return response()->json($data, $data['code']);
        
    }
    
        protected function marketPurchase($ingredient) {
        
        $amountSold = 0;
        
        $url = env('URL_MARKETPLACE').$ingredient;
        
        $client = curl_init($url);
        curl_setopt($client,CURLOPT_RETURNTRANSFER,true);
        $response = curl_exec($client);
        $result = json_decode($response);
        $amountSold = $result->quantitySold;
        
        return $amountSold;
        
    }
    
    
    public function process(Request $request) {
        
         $statusPurchaseRequest = null;
         
         // Obtenemos parámetros con el id de la solicitud de ingrediente
         
        $json = $request->input('json',null);
        $params_array = json_decode($json,true);
        $statusPurchase = null;
        $statusPurchaseRequest = null;
        $test = array();
        
        
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
                   $purchaseRequest_id = $params_array['id'];

                   $purchaseRequest  = PurchaseRequest::find($purchaseRequest_id);   


                   $statusPurchaseRequest = $purchaseRequest->status;
                   $ingredient = $purchaseRequest->ingredient;
                   
                   if ($statusPurchaseRequest !== 'Compra completada' ){
                       
                       // Calculamos el monto a comprar basado en la solicitud y el stockMin
                        array_push($test, [ 'ingredien' => $ingredient]);

                        $stockAvailable = $ingredient->stock - $ingredient->stockReserved;
                        array_push($test, [ 'stockAvailable' => $stockAvailable]);

                        $amountPurchaseRequest = $purchaseRequest->amount;
                        array_push($test, [ 'amountPurchaseRequest' => $amountPurchaseRequest]);
/*
                        if ($stockAvailable < $ingredient->stockMin){

                            $amountPurchaseRequest += ($ingredient->stockMin - $stockAvailable);
                            array_push($test, [ 'amountPurchaseRequest-withStock' => $amountPurchaseRequest]);

                        }
*/
                        // Realizamos la compra en La plaza de mercado  

                        $amountSold = $this->marketPurchase($ingredient->name);

                        if( $amountSold === 0 ){

                             $statusPurchase = 'Compra fallida';

                             $data = array(

                             'status' => 'error',
                             'code' => 404,
                             'message' => 'No hay ese ingrediente en el mercado'

                              );

                        }else{


                             $statusPurchase = 'Compra exitosa';

                            // Se actualiza la cantidad en el stock del ingrediente
                             $ingredient->stock += $amountSold;
                             $ingredient->save();
                             array_push($test, [ 'ingredient' => $ingredient]);
                             
                             
                             $purchaseRequest->amountPurchase +=  $amountSold;
                             
                             if ($purchaseRequest->amountPurchase >= $purchaseRequest->amount ){
                                 
                                        //Se cambia el estado de la solicitud de compra
                                        $purchaseRequest->status = 'Compra completada';
                                        
                                        // se cambia el estado de la solicitud de orden 
                                        $requestStore = $purchaseRequest -> requestStore;
                                        $requestStore->status = 'Ingrediente entregado';
                                        $requestStore->save();
                                        
                                        //se actualiza el monto disponible del ingrediente de la orden
                                        
                                        $orderIngredient = $requestStore->orderIngredient;
                                        $orderIngredient->amountAvailable += $purchaseRequest->amount;
                                        $orderIngredient->save();
                                        
                                 
                             }
                             
                             
                             $purchaseRequest->save();
                             array_push($test, [ '$purchaseRequest' => $purchaseRequest]);



                        }

                             // Se registra la compra del mercado exitosa o fallida

                            $purchase = new Purchase();
                            $purchase->ingredient_id = $purchaseRequest->ingredient_id;
                            $purchase->amount = $amountSold;
                            $purchase->status = $statusPurchase;
                            $purchase->save();

                    }
                   }

            }
               
            $data = array(
                       'status' => 'success',
                       'code' => 200,
                       'message' => 'El proceso se ha ejecutado satisfactoriamente',
                       'purchaseRequest' => $purchaseRequest,
                       
            );

           return response()->json($data,$data['code']);
    }
    
    
}
