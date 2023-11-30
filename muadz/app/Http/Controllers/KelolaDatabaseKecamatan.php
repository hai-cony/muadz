<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelolaDatabaseKecamatan extends Controller
{
    public function index()
    {
        $tahun = DB::table('tahuns')->get();
        return Inertia::render('KelolaDatabase/Kecamatan', [
            'tahun' => $tahun
        ]);
    }

    public function insert(Request $request)
    {
        $inserting = Kecamatan::create([
            'kec' => $request->newKec,
            'kabId' => $request->newKabId
        ]);
        if (!$inserting) {
            return redirect(route('kelola-database-kecamatan'))->with([
                'message' => 'Kecamatan ' . $request->newKec . ' gagal ditambahkan'
            ]);
        }

        return redirect(route('kelola-database-kecamatan'))->with([
            'message' => 'Kecamatan ' . $request->newKec . ' berhasil ditambahkan',
            'response' => $inserting
        ]);
    }

    public function delete(Request $request)
    {
        $deleting = DB::table("kecamatans")->where('id', '=', $request->id)->delete();

        if (!$deleting) {
            return redirect(route('kelola-database-kecamatan'))->with([
                'message' => 'Kecamatan ' . $request->kecName . ' gagal dihapus'
            ]);
        }

        return redirect(route('kelola-database-kecamatan'))->with([
            'message' => 'Kecamatan ' . $request->kecName .  ' berhasil dihapus'
        ]);
    }
}
