<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\ReturnPurchase;
use App\ReturnTemp;
use App\Product;


class ReturnController extends Controller
{
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
    
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	 
	public function index()
	{

        return $this->currentUser()
            ->returnPurchase()
			->with('purchase', 'product', 'supplier')
            ->orderBy('created_at', 'DESC')
            ->get()
            ->toArray();
	
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
    
	public function store(Request $request)
	{
		    $user = JWTAuth::parseToken()->authenticate();
			
			// process return temp
			$returnTemp = new ReturnTemp;
			$returnTemp->purchase_id = $request->get('purchase_id');
            $returnTemp->product_id = $request->get('product_id');
            $returnTemp->returnTemp_quantity = $request->get('return_quantity');
            $returnTemp->returnTemp_charge = $request->get('return_charge');
			$returnTemp->save();
			
            $rTemp = ReturnTemp::all();
			foreach ($rTemp as $value) {
                
				//get product
				$product = Product::find($value->product_id);
                
				//process inventory
				$returnPurchase = new ReturnPurchase;
				$returnPurchase->purchase_id = $value->purchase_id;
				$returnPurchase->supplier_id = $request->get('supplier_id');
				$returnPurchase->product_id = $value->product_id;
				$returnPurchase->return_price = $product->product_cost;
				$returnPurchase->return_quantity = $value->returnTemp_quantity;
				$returnPurchase->return_charge = $value->returnTemp_charge;
				$returnPurchase->return_info = $request->get('return_info');
				$returnPurchase->user_id = $user->id;
				$returnPurchase->save();

				//process item quantity
	            $product->product_quantity = $product->product_quantity - $value->returnTemp_quantity;
	            $product->save();
			}
			
			//delete all data on ReceivingTemp model
			ReturnTemp::truncate();
			
			return $returnPurchase;
	}

	public function show($id)
	{
       $returnP = $this->currentUser()
           ->returnPurchase()
           ->with('purchase', 'product')
           ->find($id);
        
        if(!$returnP)
            throw new NotFoundHttpException; 
        return $returnP;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    
	public function update(Request $request, $id)
	{
        $returnP = $this->currentUser()->returnPurchase()->find($id);
        
			// process return temp
			$returnTemp = new ReturnTemp;
            $returnTemp->return_id = $returnP->id;
			$returnTemp->purchase_id = $returnP->purchase_id;
            $returnTemp->product_id = $returnP->product_id;
            $returnTemp->returnTemp_quantity = $returnP->return_quantity;
            $returnTemp->returnTemp_price = $returnP->return_price;
            $returnTemp->returnTemp_charge = $returnP->return_charge;
            $returnTemp->returnTemp_info = $returnP->return_info;
			$returnTemp->save();
        
            //get return temp data 
		    $rTemp = ReturnTemp::all();
		    foreach ($rTemp as $value) {

                // get avaible quantity for decrease or increase
                $product = Product::find($value->product_id);
                if($product->product_quantity + $value->returnTemp_quantity >= $request->get('return_quantity'))
                {
                    // process quantity
                    $product->product_quantity = $product->product_quantity + $value->returnTemp_quantity - $request->get('return_quantity');
                    $product->save();
                    
                      // update return
                    $returnP->return_quantity = $request->get('return_quantity');
                    $returnP->return_charge = $request->get('return_charge');
                    $returnP->return_info = $request->get('return_info');
                    $returnP->save();
                    
                    ReturnTemp::truncate();
                    
                }
                else
                {

                    ReturnTemp::truncate();
                    return error;
                    
                } 
            }
        
        
	}

}
