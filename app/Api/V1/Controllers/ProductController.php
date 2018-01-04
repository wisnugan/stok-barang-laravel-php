<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\Product;


class ProductController extends Controller
{
	
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
	
	public function index()
	{
        return $this->currentUser()
            ->product()->with('location', 'categorie')
            ->orderBy('created_at', 'DESC')
            ->get()
            ->toArray();
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
        $product = new Product;
        $product->product_code = $request->get('product_code');
        $product->product_name = $request->get('product_name');
        $product->categorie_id = $request->get('categorie_id');
        $product->location_id = $request->get('location_id');
        $product->product_cost = $request->get('product_cost');
        $product->product_quantity = $request->get('product_quantity');
        $product->product_info = $request->get('product_info');
        
        if($this->currentUser()->product()->save($product))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_product', 500);	
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
       $product = $this->currentUser()->product()->find($id);
        if(!$product)
            throw new NotFoundHttpException; 
        return $product;
		

	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id)
	{
        $product = $this->currentUser()->product()->find($id);
        if(!$product)
            throw new NotFoundHttpException;
        $product->fill($request->all());
        if($product->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_product', 500);

	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{

	}
}
