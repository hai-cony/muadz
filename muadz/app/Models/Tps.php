<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tps extends Model
{
    use HasFactory;

    protected $fillable = [
        'dsId',
        'userId',
        'suara',
        'kotak_tps'
    ];

    public function tps()
    {
        return $this->belongsTo(Tps::class);
    }
}