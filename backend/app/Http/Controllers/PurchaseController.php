<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Purchase;

class PurchaseController extends Controller
{
        public function index( ) {
        
           $purchases = null;
       
          $sql ='select i.name as ingredient_name, p.* FROM purchases p JOIN ingredients i ON p.ingredient_id = i.id order by p.created_at desc';
            
            $sth = DB::connection()->getPdo()->prepare($sql);
            $sth->execute();
            $results = $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            $purchases = $results;
            
             $data = array(
                
                'status' => 'success',
                'code' => 200,
                'message' => 'Consulta procesada',
                'purchases' => $purchases
                
             );
            

        return response()->json($data, $data['code']);
        
    }
}
