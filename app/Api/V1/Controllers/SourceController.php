<?php

namespace  App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Source;


class SourceController extends Controller
{
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
		
	public function index()
	{
        return $this->currentUser()
            ->source()
            ->orderBy('id', 'ASC')
            ->get()
            ->toArray();
	}

	public function store(Request $request)
	{
        $source = new Source;
        $source->source_name = $request->get('source_name');
        
        if($this->currentUser()->source()->save($source))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_source', 500);	
	}
	
	public function show($id)
	{
       $source = $this->currentUser()->source()->find($id);
        if(!$source)
            throw new NotFoundHttpException; 
        return $source;
		

	}	
	
	public function update(Request $request, $id)
	{
        $source = $this->currentUser()->source()->find($id);
        if(!$source)
            throw new NotFoundHttpException;
        $source->fill($request->all());
        if($source->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_source', 500);

	}	
}
