<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;
use App\Order;
use App\RequestStore;


class TestController extends Controller
{
    
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
    
    public function index() {
        
        $amount  = $this->marketPurchase('lemon');
        
        echo $amount;
        
       /*
        $orders = Order::all();
        
        foreach ($orders as $order) {
            
                        echo '<h4>'. $order->status .'</h4></br>';
                        echo '<h4>'. $order->recipe->name .'</h4></br>';
                        
            
            
                        $details = $order->details;
            
        
            foreach ($details as $detail){
                       
                                echo '<h5>'.$detail->amountNeeded.'</h5></br>';
                                echo '<h5>'.$detail->ingredient->name.'</h5></br>';
                
    
            }
             
             
        }
        */
       /* 
        $recipes = Recipe::all();
        
        foreach ($recipes as $recipe) {
            
                        echo '<h4>'. $recipe->name .'</h4></br>';
                        
            
            
                        $details = $recipe->details;
            
        
            foreach ($details as $detail){
                       
                                echo '<h5>'.$detail->amount.'</h5></br>';
                                echo '<h5>'.$detail->ingredient->name.'</h5></br>';
                
    
            }
             
             
        }
        
        
        $requests_s = RequestStore::all();
        
        foreach ($requests_s as $obj_request) {
            
                            echo '<h4>'. $obj_request->status .'</h4></br>';
                            echo '<h4>'. $obj_request->ingredient->name .'</h4></br>';
                            echo '<h4>'. $obj_request->detailOrder->amountNeeded .'</h4></br>';
             
        }
        */
        
        
        die();
        
    }
    
}
