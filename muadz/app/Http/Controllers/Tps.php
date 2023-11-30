<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Tps extends Controller
{
    public function index($uid)
    {
        $tps = DB::table('tps')->where('uid', $uid)
            ->join('desas', 'tps.desaId', '=', 'desas.id')
            ->join('kecamatans', 'desas.kecId', '=', 'kecamatans.id')
            ->join('kabupatens', 'kecamatans.kabId', '=', 'kabupatens.id')
            ->join('tahuns', 'kabupatens.thnId', '=', 'tahuns.id')
            ->select('desa', 'desaId', 'kab', 'kabId', 'kec', 'kecId', 'thn', 'thnId', 'kotak_tps', 'suara', 'uid')->get();
        return Inertia::render('User/TpsDetail', [
            'data' => $tps
        ]);
    }

    public function desa($id)
    {
        $desa = DB::table('desas')
            ->where('id', $id)->get();

        $tps = DB::table('tps')->where('desaId', $id)->get();

        return Inertia::render('DesaTps', [
            'data' => [
                'desa' => $desa,
                'tps' => $tps
            ]
        ]);
    }

    public function getData($id)
    {
        return "Get data" . $id;
    }
}
