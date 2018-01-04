<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\Supplier;

class SupplierController extends Controller
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
            ->supplier()
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
        $supplier = new Supplier;
        $supplier->supplier_name = $request->get('supplier_name');
        $supplier->supplier_employee = $request->get('supplier_employee');
        $supplier->supplier_email = $request->get('supplier_email');
        $supplier->supplier_phone1 = $request->get('supplier_phone1');
        $supplier->supplier_phone2 = $request->get('supplier_phone2');
        $supplier->supplier_address = $request->get('supplier_address');
        $supplier->supplier_state = $request->get('supplier_state');
        $supplier->supplier_info = $request->get('supplier_info');
        
        if($this->currentUser()->supplier()->save($supplier))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_supplier', 500);	
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
       $supplier = $this->currentUser()->supplier()->find($id);
        if(!$supplier)
            throw new NotFoundHttpException; 
        return $supplier;
		

	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Request $request, $id)
	{
        $supplier = $this->currentUser()->supplier()->find($id);
        if(!$supplier)
            throw new NotFoundHttpException;
        $supplier->fill($request->all());
        if($supplier->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_supplier', 500);

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
