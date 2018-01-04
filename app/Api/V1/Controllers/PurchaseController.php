<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\Purchase;
use App\PurchaseTemp;
use App\PurchaseItem;
use App\Product;
use Carbon\Carbon;


class PurchaseController extends Controller
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
            ->purchase()->with('supplier', 'user')
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
			
			$purchase = new Purchase;
			$purchase->supplier_id = $request->get('supplier_id');
            $purchase->purchase_date = Carbon::createFromFormat('d F Y', $request->get('purchase_date'));
            $purchase->purchase_order = $request->get('purchase_order');
			$purchase->purchase_info = $request->get('purchase_info');
            $purchase->user_id = $user->id;
			$purchase->save();
			
            // process receiving items
            $purchaseTemp = PurchaseTemp::all();
			foreach ($purchaseTemp as $value) {
				$purchaseItemsData = new PurchaseItem;
				$purchaseItemsData->purchase_id = $purchase->id;
                $purchaseItemsData->supplier_id = $request->get('supplier_id');
				$purchaseItemsData->product_id = $value->product_id;
				$purchaseItemsData->purchaseItem_price = $value->purchaseTemp_price;
				$purchaseItemsData->purchaseItem_quantity = $value->purchaseTemp_quantity;
				$purchaseItemsData->purchaseItem_charge = $value->purchaseTemp_charge;
				$purchaseItemsData->purchaseItem_discount = $value->purchaseTemp_discount;
				$purchaseItemsData->purchaseItem_total = $value->purchaseTemp_total;
				$purchaseItemsData->user_id = $user->id;
				$purchaseItemsData->save();
				
				//process inventory
				$product = Product::find($value->product_id);
			
				//process item quantity
	            $product->product_quantity = $product->product_quantity + $value->purchaseTemp_quantity;
	            $product->save();
			}
			
			//delete all data on ReceivingTemp model
			PurchaseTemp::truncate();
			return $purchase;
	}
	
	public function show($id)
	{
		$purchase = $this->currentUser()
            ->purchaseItem()
            ->with('supplier', 'purchase', 'product')
            ->where('purchase_id',$id)
            ->get()->toArray();
		
		return $purchase;
	}	

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request,$id)
	{
          
	}


}
