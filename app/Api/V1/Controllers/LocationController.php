<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Location;


class LocationController extends Controller
{
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
		
	public function index()
	{
        return $this->currentUser()
            ->location()
            ->orderBy('location_name', 'ASC')
            ->get()
            ->toArray();
	}

	public function store(Request $request)
	{
        $location = new Location;
        $location->location_name = $request->get('location_name');
        $location->location_sub = $request->get('location_sub');

        
        if($this->currentUser()->location()->save($location))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_locations', 500);	
	}
	
	public function show($id)
	{
       $location = $this->currentUser()->location()->find($id);
        if(!$location)
            throw new NotFoundHttpException; 
        return $location;
		

	}	
	
	public function update(Request $request, $id)
	{
        $location = $this->currentUser()->location()->find($id);
        if(!$location)
            throw new NotFoundHttpException;
        $location->fill($request->all());
        if($location->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_locations', 500);

	}	
}
