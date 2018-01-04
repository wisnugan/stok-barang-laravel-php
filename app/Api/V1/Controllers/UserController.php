<?php

namespace App\Api\V1\Controllers;


use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\User;

class UserController extends Controller
{
	use Helpers;

    private function currentUser() {
        return JWTAuth::parseToken()->authenticate();
    }
	
	public function index()
	{
        return JWTAuth::parseToken()->authenticate();
	}

}
