<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\PurchaseTemp;
use App\Product;


class PurchaseTempController extends Controller
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
		
		$purchasetemp = PurchaseTemp::with('product')->get()->toArray();
		return $purchasetemp;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$PurchaseTemps = new PurchaseTemp;
		$PurchaseTemps->product_id = $request->get('product_id');
		$PurchaseTemps->purchaseTemp_price = $request->get('purchaseTemp_price');
		$PurchaseTemps->purchaseTemp_quantity = 1;
		$PurchaseTemps->purchaseTemp_charge = 0;
		$PurchaseTemps->purchaseTemp_discount = 0;
		$PurchaseTemps->purchaseTemp_total = $request->get('purchaseTemp_total');
		$PurchaseTemps->save();
		return  $PurchaseTemps;
	}
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$PurchaseTemps = PurchaseTemp::find($id);
        $PurchaseTemps->purchaseTemp_quantity = input::get('purchaseTemp_quantity');
		$PurchaseTemps->purchaseTemp_charge = input::get('purchaseTemp_charge');
		$PurchaseTemps->purchaseTemp_discount = input::get('purchaseTemp_discount');
        $PurchaseTemps->purchaseTemp_total = input::get('purchaseTemp_total');
        $PurchaseTemps->save();
        return $PurchaseTemps;
	}
	
	public function destroy($id)
	{
		PurchaseTemp::destroy($id);
	}	
}
