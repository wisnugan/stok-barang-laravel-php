<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
	
	public function __construct()
	{
		$this->middleware('auth');
	}
	
    public function index()
    {
        return view('app');
    }
}
