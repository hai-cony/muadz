<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $req)
    {
        if (!$req->kab && !$req->kec) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('thn', $req->tahun)->get();
            return $data;
        } elseif (!$req->tahun && !$req->kec) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('kab', $req->kab)->get();
            return $data;
        } elseif (!$req->tahun && !$req->kab) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->tahun) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('kab', $req->kab)
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->kab) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('thn', $req->tahun)
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->kec) {
            $data = DB::table('tahuns')
                ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
                ->where('thn', $req->tahun)
                ->where('kab', $req->kab)->get();
            return $data;
        }
        $data = DB::table('tahuns')
            ->selectRaw('count(desaId) as total, desaId, desa, kec, kab, thn')
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->join('tps', 'desas.id', '=', 'tps.desaId')->groupBy('desaId', 'desa', 'kec', 'kab', 'thn')
            ->where('thn', $req->tahun)
            ->where('kab', $req->kab)
            ->where('kec', $req->kec)->get();
        return $data;
    }

    public function searchTps(Request $req)
    {
        if (!$req->kab && !$req->kec) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('thn', $req->tahun)->get();
            return $data;
        } elseif (!$req->tahun && !$req->kec) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)->get();
            return $data;
        } elseif (!$req->tahun && !$req->kab) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->tahun) {
            $data = DB::table('tahuns')
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->kab) {
            $data = DB::table('tahuns')->where('thn', $req->tahun)
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kec', $req->kec)->get();
            return $data;
        } elseif (!$req->kec) {
            $data = DB::table('tahuns')->where('thn', $req->tahun)
                ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
                ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
                ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
                ->join('tps', 'desas.id', '=', 'tps.desaId')
                ->where('kab', $req->kab)->get();
            return $data;
        }
        $data = DB::table('tahuns')->where('thn', $req->tahun)
            ->join('kabupatens', 'tahuns.id', '=', 'kabupatens.thnId')
            ->join('kecamatans', 'kabupatens.id', '=', 'kecamatans.kabId')
            ->join('desas', 'kecamatans.id', '=', 'desas.kecId')
            ->join('tps', 'desas.id', '=', 'tps.desaId')
            ->where('kab', $req->kab)
            ->where('kec', $req->kec)->get();
        return $data;
    }
}
