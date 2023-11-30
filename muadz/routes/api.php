<?php

use App\Http\Controllers\SearchController;
use App\Models\Desa;
use App\Models\Tps;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tps/delete', function (Request $req) {

    $deleting = DB::table("tps")->where('uid', '=', $req->uid)->delete();
    if (!$deleting) return;

    $tps = DB::table('tps')->where('desaId', $req->desaId)->get();

    return $tps;
})->name('delete-tps');

Route::post('tps/ubah-suara', function (Request $req) {
    try {
        $updating = DB::table('tps')->where('uid', $req->uid)
            ->update(['suara' => $req->newSuara, 'userId' => $req->user]);

        $tps = DB::table('tps')->where('uid', $req->uid)
            ->join('desas', 'tps.desaId', '=', 'desas.id')
            ->join('kecamatans', 'desas.kecId', '=', 'kecamatans.id')
            ->join('kabupatens', 'kecamatans.kabId', '=', 'kabupatens.id')
            ->join('tahuns', 'kabupatens.thnId', '=', 'tahuns.id')
            ->select('desa', 'desaId', 'kab', 'kabId', 'kec', 'kecId', 'thn', 'thnId', 'kotak_tps', 'suara', 'uid')->get();

        return $tps;
    } catch (\Exception $e) {
        return;
    }
})->name('ubah-suara');

Route::post('tps/add', function (Request $req) {
    if ($req->val == 1) {
        $str = Carbon::now()->timestamp;
        $base64 = rtrim(strtr(base64_encode($str), '+/', '-_'), '=');

        $addTps = new Tps;
        $addTps->kotak_tps = $req->name;
        $addTps->uid = $base64;
        $addTps->suara = 0;
        $addTps->desaId = $req->desaId;
        $addTps->userId = 1;
        $addTps->save();

        $tps = DB::table('tps')->where('desaId', $req->desaId)->get();

        return $tps;
    } elseif ($req->val > 1) {
        $total = $req->val + $req->name;
        for ($i = $req->name; $i < $total; $i++) {
            $str = Carbon::now()->timestamp;
            $base64 = rtrim(strtr(base64_encode($str), '+/', '-_'), '=');
            $randomStr = Str::random(5);
            $uid = $base64 . $randomStr;

            $addTps = new Tps;
            $addTps->kotak_tps = "TPS " . $i;
            $addTps->uid = $uid;
            $addTps->suara = 0;
            $addTps->desaId = $req->desaId;
            $addTps->userId = 1;
            $addTps->save();
        }

        $tps = DB::table('tps')->where('desaId', $req->desaId)->get();

        return $tps;
    }
})->name('add-tps');

Route::get('get-all-data', function () {
    $tahun = DB::table('tahuns')->get();
    $kabupaten = DB::table('kabupatens')->select('kab')->groupBy('kab')->get();
    $kecamatan = DB::table('kecamatans')->select('kec')->groupBy('kec')->get();

    return response()->json([
        'tahun' => $tahun,
        'kabupaten' => $kabupaten,
        'kecamatan' => $kecamatan
    ]);
})->name('get-all-data');


Route::post('search-tps', [SearchController::class, 'searchTps'])->name('search-tps');
Route::post('search-data', [SearchController::class, 'search'])->name('search-data');

Route::post('/kabupaten', function (Request $req) {

    $tahun = DB::table('tahuns')->where("thn", "=", $req->tahun)
        ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')->get();

    return $tahun;
})->name('api-get-kabupaten');

Route::post('/get-kecamatan', function (Request $req) {
    try {
        $kecamatan = DB::table('tahuns')->where("thn", "=", $req->tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->select('kecamatans.*', 'kabupatens.kab', 'tahuns.thn')
            ->where('tahuns.thn', $req->tahun)
            ->where('kecamatans.kabId', $req->kabId)->get();

        return $kecamatan;
    } catch (\Exception $e) {
        return;
    }
})->name('api-get-kecamatan');

Route::get('/desa/{tahun}/{kecamatan}', function ($tahun, $kecamatan) {
    try {
        $desa = DB::table('tahuns')->where("thn", "=", $tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->select('desas.*', 'kecamatans.kec', 'kabupatens.kab', 'tahuns.thn')
            ->where('desas.kecId', $kecamatan)->get();

        return $desa;
    } catch (\Exception $e) {
        return;
    }
})->name('api-get-desa');

Route::get('/desa-and-tps/{tahun}/{kecamatan}', function ($tahun, $kecamatan) {
    try {
        $desa = DB::table('tahuns')->where("thn", "=", $tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->select('desas.*', 'kecamatans.kec', 'kabupatens.kab', 'tahuns.thn')
            ->where('desas.kecId', $kecamatan)->get();

        return $desa;
    } catch (\Exception $e) {
        return "gagal";
    }
})->name('api-get-desa-and-tps');

Route::get('/pemilihan/desa-tps/{tahun}/{desa}', function ($tahun, $desa) {
    try {
        $desa = DB::table('tahuns')->where("thn", "=", $tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->join('tps', 'desas.id', '=', 'tps.desaId')
            ->select('tps.*', 'desas.desa', 'kecamatans.kec', 'kabupatens.kab', 'tahuns.thn')
            ->where('tps.desaId', $desa)->get();

        return $desa;
    } catch (\Exception $e) {
        return "gagal";
    }
})->name('api-get-tps-pemilihan');

Route::post('/desa/delete', function (Request $req) {
    try {
        $deleting = DB::table("desas")->where('id', '=', $req->desaId)->delete();
        if (!$deleting) return;

        $desa = DB::table('tahuns')->where("thn", "=", $req->tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->select('desas.*', 'kecamatans.kec', 'kabupatens.kab', 'tahuns.thn')
            ->where('desas.kecId', $req->kecId)->get();

        return $desa;
    } catch (\Exception $e) {
        return response()->json(['status' => 'Delete Desa failed!'], 405);
    }
})->name('api-delete-desa');

Route::post('/desa/insert', function (Request $req) {
    try {
        $newDesa = new Desa;

        $newDesa->desa = $req->newDesa;
        $newDesa->kecId = $req->kecId;
        $newDesa->save();

        $desa = DB::table('tahuns')->where("thn", "=", $req->tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->select('desas.*', 'kecamatans.kec', 'kabupatens.kab', 'tahuns.thn')
            ->where('desas.kecId', $req->kecId)->get();

        try {
            $str = Carbon::now()->timestamp;
            $base64 = rtrim(strtr(base64_encode($str), '+/', '-_'), '=');

            $addTps = new Tps;
            $addTps->kotak_tps = "TPS 1";
            $addTps->uid = $base64;
            $addTps->suara = 0;
            $addTps->desaId = $newDesa->id;
            $addTps->userId = 1;
            $addTps->save();
        } catch (\Exception $e) {
            $str = Carbon::now()->timestamp;
            $base64 = rtrim(strtr(base64_encode($str), '+/', '-_'), '=');

            $addTps = new Tps;
            $addTps->kotak_tps = "TPS 1";
            $addTps->uid = $base64;
            $addTps->suara = 0;
            $addTps->desaId = $newDesa->id;
            $addTps->userId = 1;
            $addTps->save();
        }

        return $desa;
    } catch (\Exception $e) {
        return "failed";
    }
})->name('api-insert-desa');
