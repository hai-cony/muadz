<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelolaDatabaseDesa extends Controller
{
    public function index()
    {
        $tahun = DB::table('tahuns')->get();
        return Inertia::render('KelolaDatabase/Desa', [
            'tahun' => $tahun
        ]);
    }
}
