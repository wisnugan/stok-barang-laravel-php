<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\Sale;
use App\SaleTemp;
use App\SaleItem;
use App\Product;
use Carbon\Carbon;

class SaleController extends Controller
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
            ->sale()
            ->with('source')
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
			
			$sales = new Sale;
			$sales->sale_date = Carbon::createFromFormat('d F Y', $request->get('sale_date'));
            $sales->sale_nomor = $request->get('sale_nomor');
            $sales->source_id = $request->get('source_id');
			$sales->sale_info = $request->get('sale_info');
            $sales->user_id = $user->id;
			$sales->save();

			
            // process receiving items
            $saleTemp = SaleTemp::all();
			foreach ($saleTemp as $value) {
				$saleItemsData = new SaleItem;
				$saleItemsData->sale_id = $sales->id;
				$saleItemsData->product_id = $value->product_id;
				$saleItemsData->source_id = $request->get('source_id');
				$saleItemsData->saleItem_price = $value->saleTemp_price;
				$saleItemsData->saleItem_quantity = $value->saleTemp_quantity;
				$saleItemsData->saleItem_extra = $value->saleTemp_extra;
				$saleItemsData->saleItem_discount = $value->saleTemp_discount;
				$saleItemsData->saleItem_total = $value->saleTemp_total;
				$saleItemsData->user_id = $user->id;
				$saleItemsData->save();
				
                // get avaible quantity for decrease or increase
                $product = Product::find($value->product_id);
                if($product->product_quantity >= $value->saleTemp_quantity)
                {
                    // process quantity
                    $product->product_quantity = $product->product_quantity - $value->saleTemp_quantity;
                    $product->save();
                }
                else
                {
                    $saleItemsData->delete();
                    $sales->delete();
                    return error;
                } 
			}
			
			//delete all data on ReceivingTemp model
			SaleTemp::truncate();
			return $sales;
	}
	
	public function show($id)
	{
		$sale = $this->currentUser()
            ->saleItem()
            ->where('sale_id', $id)
            ->with('sale', 'product', 'source')
            ->get()
            ->toArray();
		
		return $sale;
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
