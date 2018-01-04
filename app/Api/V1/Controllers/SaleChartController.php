<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Http\Requests;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;
use App\SaleItem;
use App\Sale;
use DB;
use \Response;
use Carbon\Carbon;

class SaleChartController extends Controller
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
        
     $datas = DB::table('products')
    ->select(DB::raw('count(id) as produk'), DB::raw('sum(product_quantity) as stock'))
    ->get();
        
        
        $dChart =  DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->where('sales.source_id', '=', 1)
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
                        ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
            });
        
          
        
        $label2017 = [];
        $data17 = [];

        foreach ($dChart as $key => $value) {
            $label2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($label2017[$i])){
                $data17[$i] = $label2017[$i];    
            }else{
                $data17[$i] = 0;    
            }
        }    
        
        $totalyear = [];
        foreach ($dChart as $key => $value) {
            $totalyear[(int)$key] = count($value);
        }
        
        return response()->json(["aw" => $dChart, "datas" => $datas]);
	}
}