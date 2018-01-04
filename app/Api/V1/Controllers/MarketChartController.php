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
use Response;
use Carbon\Carbon;

class MarketChartController extends Controller
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
 
        $produk = DB::table('products')
            ->select(DB::raw('count(id) as produk'), DB::raw('sum(product_quantity) as stock'))
            ->get();
        
        $totalR = DB::table('return_purchases')
                ->select(DB::raw('count(id) as total'), DB::raw('sum(return_quantity) as qty'))
                ->get();
        
        $ttlSale = DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
                ->select(DB::raw('count(sales.id) as total'), DB::raw('sum(sale_Items.saleItem_quantity) as qty'))
                ->get();
        
        $ttlPurchase = DB::table('purchases')->join('purchase_items', 'purchase_items.purchase_id', '=', 'purchases.id' )
                ->select(DB::raw('count(purchases.id) as total'), DB::raw('sum(purchase_items.purchaseItem_quantity) as qty'))
                ->get();
        
        $mChart = Sale::with('source')->groupBy('source_id')
               ->selectRaw('count(id) as point, source_id')
               ->get();
        
        $sChart = DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->whereYear('sales.sale_date', '=', 2016)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $dChart = DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $BP17 =  DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->where('sales.source_id', '=', 1)
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });

        $TP17 =  DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->where('sales.source_id', '=', 2)
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $KK17 =  DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->where('sales.source_id', '=', 3)
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $OT17 =  DB::table('sales')->join('sale_items', 'sale_items.sale_id', '=', 'sales.id' )
            ->select('sale_items.saleItem_quantity as qty', 'sales.sale_date')
            ->where('sales.source_id', '=', 4)
            ->whereYear('sales.sale_date', '=', 2017)
            ->orderBy('sales.sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $orderChart = DB::table('purchases')
            ->select('id', 'purchase_date')
            ->orderBy('purchase_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->purchase_date)->format('m'); // grouping by months
        });
        
        $ttlQty = DB::table('purchases')->join('purchase_items', 'purchase_items.purchase_id', '=', 'purchases.id' )
            ->select('purchase_items.purchaseItem_quantity as qty', 'purchases.purchase_date')
            
            ->orderBy('purchases.purchase_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->purchase_date)->format('m'); // grouping by months
        });   
        
        $cSale =  DB::table('sales')
            ->select('id', 'sale_date')
            ->orderBy('sale_date')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->sale_date)->format('m'); // grouping by months
        });
        
        $ttlReturn = DB::table('return_purchases')
            ->select('id', 'created_at')
            ->orderBy('created_at')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->created_at)->format('m'); // grouping by months
        });

        $tR = [];
        $tReturn = [];

        foreach ($ttlReturn as $key => $value) {
            $tR[(int)$key] = count($value);
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($tR[$i])){
                $tReturn[$i] = $tR[$i];    
            }else{
                $tReturn[$i] = 0;    
            }
        }        
        
        $tCSale = [];
        $tSale = [];

        foreach ($cSale as $key => $value) {
            $tCSale[(int)$key] = count($value);
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($tCSale[$i])){
                $tSale[$i] = $tCSale[$i];    
            }else{
                $tSale[$i] = 0;    
            }
        }         
        
        $OD2017 = [];
        $order17 = [];

        foreach ($orderChart as $key => $value) {
            $OD2017[(int)$key] = count($value);
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($OD2017[$i])){
                $order17[$i] = $OD2017[$i];    
            }else{
                $order17[$i] = 0;    
            }
        }      

        $qtyP = [];
        $ttlStock = [];

        foreach ($ttlQty as $key => $value) {
            $qtyP[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($qtyP[$i])){
                $ttlStock[$i] = $qtyP[$i];    
            }else{
                $ttlStock[$i] = 0;    
            }
        }           
        
        $BP2017 = [];
        $bukalapak = [];

        foreach ($BP17 as $key => $value) {
            $BP2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($BP2017[$i])){
                $bukalapak[$i] = $BP2017[$i];    
            }else{
                $bukalapak[$i] = 0;    
            }
        }   
 
        $TP2017 = [];
        $tokopedia = [];

        foreach ($TP17 as $key => $value) {
            $TP2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($TP2017[$i])){
                $tokopedia[$i] = $TP2017[$i];    
            }else{
               $tokopedia[$i] = 0;    
            }
        }  
 
        $KK2017 = [];
        $fjb = [];

        foreach ($KK17 as $key => $value) {
            $KK2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($KK2017[$i])){
                $fjb[$i] = $KK2017[$i];    
            }else{
                $fjb[$i] = 0;    
            }
        }  

        $OT2017 = [];
        $othercod = [];

        foreach ($OT17 as $key => $value) {
            $OT2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($OT2017[$i])){
                $othercod[$i] = $OT2017[$i];    
            }else{
                $othercod[$i] = 0;    
            }
        }         
        
        $bar2016 = [];
        $data16 = [];

        foreach ($sChart as $key => $value) {
            $bar2016[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($bar2016[$i])){
                $data16[$i] = $bar2016[$i];    
            }else{
                $data16[$i] = 0;    
            }
        }    
        
        
        $bar2017 = [];
        $data17 = [];

        foreach ($dChart as $key => $value) {
            $bar2017[(int)$key] = $value->sum('qty');
        }

        for($i = 1; $i <= 12; $i++){
            if(!empty($bar2017[$i])){
                $data17[$i] = $bar2017[$i];    
            }else{
                $data17[$i] = 0;    
            }
        }     
        
        
        return response()->json([
            "totalR" => $totalR,
            "tReturn" => $tReturn,
            "produk" => $produk,
            "ttlSale" => $ttlSale,
            "tSale" => $tSale,
            "ttlPurchase" => $ttlPurchase,
            "order17" => $order17,
            "mChart" => $mChart,
            "data16" => $data16,
            "data17" => $data17,
            "bukalapak" => $bukalapak,
            "tokopedia" => $tokopedia,
            "fjb" => $fjb,
            "othercod" => $othercod,
            "ttlStock" => $ttlStock
        ]);
	}
    
}