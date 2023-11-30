<?php

namespace App\Http\Controllers;

use App\Models\Kabupaten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelolaDatabaseKabupaten extends Controller
{
    public function index()
    {
        $tahun = DB::table('tahuns')->get();
        return Inertia::render('KelolaDatabase/Kabupaten', [
            'tahun' => $tahun
        ]);
    }

    public function insert(Request $request)
    {
        $tahun = DB::table('tahuns')->where('thn', '=', $request->thn)->get();

        $inserting = Kabupaten::create([
            'kab' => $request->newKab,
            'thnId' => $tahun[0]->id
        ]);
        if (!$inserting) {
            return redirect(route('kelola-database-kabupaten'))->with([
                'message' => 'Kabupaten gagal ditambahkan'
            ]);
        }

        return redirect(route('kelola-database-kabupaten'))->with([
            'message' => 'Kabupaten berhasil ditambahkan'
        ]);
    }

    public function delete(Request $request)
    {
        $deleting = DB::table("kabupatens")->where('id', '=', $request->id)->delete();

        if (!$deleting) {
            return redirect(route('kelola-database-kabupaten'))->with([
                'message' => 'Kabupaten gagal dihapus'
            ]);
        }

        return redirect(route('kelola-database-kabupaten'))->with([
            'message' => 'Kabupaten berhasil dihapus'
        ]);
    }
}
