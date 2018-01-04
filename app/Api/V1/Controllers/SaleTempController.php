<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\SaleTemp;
use App\SaleItem;

class SaleTempController extends Controller
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
		
		$saleTemp = SaleTemp::with('product')->get()->toArray();
		return $saleTemp;
		
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
		$saleTemp = new SaleTemp;
		$saleTemp->product_id = $request->get('product_id');
		$saleTemp->saleTemp_price = $request->get('saleTemp_price');
		$saleTemp->saleTemp_quantity = 1;
		$saleTemp->saleTemp_extra = 0;
		$saleTemp->saleTemp_discount = 0;
		$saleTemp->saleTemp_total = $request->get('saleTemp_total');
		$saleTemp->save();
		return  $saleTemp;
	}
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$sale = $this->currentUser()
            ->saleItem()
            ->where('source_id', $id)
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
	public function update($id)
	{
		$saleTemp = SaleTemp::find($id);
        $saleTemp->saleTemp_quantity = input::get('saleTemp_quantity');
		$saleTemp->saleTemp_extra = input::get('saleTemp_extra');
		$saleTemp->saleTemp_discount = input::get('saleTemp_discount');
        $saleTemp->saleTemp_total = input::get('saleTemp_total');
        $saleTemp->save();
        return $saleTemp;
	}
	
	public function destroy($id)
	{
		SaleTemp::destroy($id);
	}	
}
