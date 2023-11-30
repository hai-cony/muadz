<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kabupaten extends Model
{
    use HasFactory;

    protected $fillable = [
        'kab',
        'thnId'
    ];

    public function kecamatan()
    {
        return $this->hasMany(Kecamatan::class);
    }

    public function tahun()
    {
        return $this->belongsTo(Tahun::class);
    }
}