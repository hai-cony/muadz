<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelolaDatabaseTps extends Controller
{
    public function index()
    {
        // $data = DB::table('tahuns')
        //     ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn, uid')
        //     ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
        //     ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
        //     ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
        //     ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn', 'uid')
        //     ->take(10)->get();

        // $count = DB::table('tps')->count();

        $data = DB::table('tahuns')
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->join('tps', 'desas.id', '=', 'tps.desaId')
            ->take(10)->get();

        return Inertia::render('User/Tps', [
            'all' => $data
        ]);
    }

    // FIX HERE
    public function query(Request $req)
    {
        // $data = DB::table('tahuns')->where('thn', $req->tahun)
        //     ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
        //     ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
        //     ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
        //     ->join('tps', 'desas.id', '=', 'tps.desaId')
        //     ->skip($req->last)->take(100)->get();

        // return response()->json([
        //     'data' => $data
        // ]);

        if ($req->tahun && !$req->kab && !$req->kec) {
            $data = DB::table('tahuns')->where('thn', $req->tahun)
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->get();
            return $data;
        } elseif ($req->kab && !$req->tahun && !$req->kec) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)
                ->skip($req->last)->take(100)->get();
            return $data;
        } elseif ($req->kec && !$req->tahun && !$req->kab) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kec', $req->kec)
                ->skip($req->last)->take(100)->get();
            return $data;
        } elseif ($req->kec && $req->kab && !$req->tahun) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)
                ->where('kec', $req->kec)
                ->skip($req->last)->take(100)->get();
            return $data;
        } elseif ($req->tahun && $req->kec && !$req->kab) {
            $data = DB::table('tahuns')->where('thn', $req->tahun)
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kec', $req->kec)
                ->skip($req->last)->take(100)->get();
            return $data;
        } elseif ($req->tahun && $req->kab && !$req->kec) {
            $data = DB::table('tahuns')->where('thn', $req->tahun)
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)
                ->skip($req->last)->take(100)->get();
            return $data;
        } elseif (!$req->kec && !$req->tahun && !$req->kab) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->skip($req->last)->take(100)->get();
            return $data;
        }
        $data = DB::table('tahuns')
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->join('tps', 'desas.id', '=', 'tps.desaId')
            ->where('thn', $req->tahun)
            ->where('kab', $req->kab)
            ->where('kec', $req->kec)
            ->skip($req->last)->take(100)->get();
        dd($data);
        return $data;
    }
}