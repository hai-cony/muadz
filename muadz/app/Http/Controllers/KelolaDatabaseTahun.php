<?php

namespace App\Http\Controllers;

use App\Models\Tahun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelolaDatabaseTahun extends Controller
{
    public function index()
    {
        return Inertia::render('KelolaDatabase');
    }

    public function tahun()
    {
        $tahun = DB::table("tahuns")->get();
        return Inertia::render('KelolaDatabase/Tahun', [
            'tahun' => $tahun
        ]);
    }

    public function insert(Request $request)
    {
        $inserting = Tahun::create([
            'thn' => $request->newThn
        ]);
        if (!$inserting) {
            return redirect(route('kelola-database-tahun'))->with([
                'message' => 'Tahun gagal ditambahkan'
            ]);
        }

        return redirect(route('kelola-database-tahun'))->with([
            'message' => 'Tahun berhasil ditambahkan'
        ]);
    }

    public function delete(Request $request)
    {
        $deleting = DB::table("tahuns")->where('id', '=', $request->id)->delete();

        if (!$deleting) {
            return redirect(route('kelola-database-tahun'))->with([
                'message' => 'Tahun gagal dihapus'
            ]);
        }

        return redirect(route('kelola-database-tahun'))->with([
            'message' => 'Tahun berhasil dihapus'
        ]);
    }
}
