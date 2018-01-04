<?php

namespace  App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Categorie;


class CategorieController extends Controller
{
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
		
	public function index()
	{
        return $this->currentUser()
            ->categorie()
            ->orderBy('categorie_name', 'ASC')
            ->get()
            ->toArray();
	}

	public function store(Request $request)
	{
        $categorie = new Categorie;
        $categorie->categorie_name = $request->get('categorie_name');
        $categorie->categorie_sub = $request->get('categorie_sub');

        
        if($this->currentUser()->categorie()->save($categorie))
            return $this->response->created();
        else
            return $this->response->error('could_not_create_categorie', 500);	
	}
	
	public function show($id)
	{
       $categorie = $this->currentUser()->categorie()->find($id);
        if(!$categorie)
            throw new NotFoundHttpException; 
        return $categorie;
		

	}	
	
	public function update(Request $request, $id)
	{
        $categorie = $this->currentUser()->categorie()->find($id);
        if(!$categorie)
            throw new NotFoundHttpException;
        $categorie->fill($request->all());
        if($categorie->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_category', 500);

	}	
}
