<?php

use App\Http\Controllers\KelolaDatabaseDesa;
use App\Http\Controllers\KelolaDatabaseKabupaten;
use App\Http\Controllers\KelolaDatabaseKecamatan;
use App\Http\Controllers\KelolaDatabaseTahun;
use App\Http\Controllers\KelolaDatabaseTps;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Tps;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $kabupaten = DB::table("kabupatens")->get(["kab"]);
    $kecamatan = DB::table("kecamatans")->get(["kec"]);
    $desa = DB::table("desas")->get("desa");

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'data' => [
            'kabupaten' => $kabupaten,
            'kecamatan' => $kecamatan,
            'desa' => $desa
        ]
    ]);
})->name('main');

Route::get('/pemilihan', function () {

    $kabupaten = DB::table("kabupatens")->get(["kab", "id"]);
    $tahun = DB::table("tahuns")->get(["thn", "id"]);

    return Inertia::render('Pemilihan', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'data' => [
            'kabupaten' => $kabupaten,
            'tahun' => $tahun
        ]
    ]);
})->name('pemilihan');

Route::get("/pemilihan/{id}", [Tps::class, 'getData'])->middleware(['auth', 'verified'])->name('pemilihan-get-data');

// KELOLA DATABASE ROUTE TAHUN  
Route::get('/kelola-database', [KelolaDatabaseTahun::class, 'index'])->middleware(["auth", 'verified'])->name("kelola-database");
Route::get('/kelola-database/tahun', [KelolaDatabaseTahun::class, 'tahun'])->middleware(["auth", 'verified'])->name("kelola-database-tahun");
Route::post('/kelola-database/tahun', [KelolaDatabaseTahun::class, 'insert'])->middleware(["auth", 'verified'])->name("kelola-database-tambah-tahun");
Route::post('/kelola-database/tahun/delete', [KelolaDatabaseTahun::class, 'delete'])->middleware(["auth", 'verified'])->name("kelola-database-hapus-tahun");

// KELOLA DATABASE ROUTE KABUPATEN  
Route::get("/kelola-database/kabupaten", [KelolaDatabaseKabupaten::class, 'index'])->middleware(['auth', 'verified'])->name('kelola-database-kabupaten');
Route::post("/kelola-database/kabupaten", [KelolaDatabaseKabupaten::class, 'insert'])->middleware(['auth', 'verified'])->name('kelola-database-tambah-kabupaten');
Route::post("/kelola-database/kabupaten/delete", [KelolaDatabaseKabupaten::class, 'delete'])->middleware(['auth', 'verified'])->name('kelola-database-hapus-kabupaten');

// KELOLA DATABASE ROUTE KECAMATAN
Route::get("/kelola-database/kecamatan", [KelolaDatabaseKecamatan::class, 'index'])->middleware(['auth', 'verified'])->name('kelola-database-kecamatan');
Route::post("/kelola-database/kecamatan", [KelolaDatabaseKecamatan::class, 'insert'])->middleware(['auth', 'verified'])->name('kelola-database-tambah-kecamatan');
Route::post("/kelola-database/kecamatan/delete", [KelolaDatabaseKecamatan::class, 'delete'])->middleware(['auth', 'verified'])->name('kelola-database-hapus-kecamatan');

// KELOLA DATABASE DESA ROUTE
Route::get("/kelola-database/desa", [KelolaDatabaseDesa::class, 'index'])->middleware(['auth', 'verified'])->name('kelola-database-desa');

//  KELOLA DATABASE TPS ROUTE
Route::get("/tps", [KelolaDatabaseTps::class, 'index'])->middleware(['auth', 'verified'])->name('user-tps');
Route::post("/tps/query", [KelolaDatabaseTps::class, 'query'])->middleware(['auth', 'verified'])->name('query-user-tps');
Route::get("/kelola-database/desa/{id}", [Tps::class, 'desa'])->middleware(['auth', 'verified'])->name('desa');
Route::get("/tps/{uid}", [Tps::class, 'index'])->middleware(['auth', 'verified'])->name('tps');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
