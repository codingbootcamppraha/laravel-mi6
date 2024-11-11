<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Alias;
use App\Models\Image;
use App\Models\Status;
use App\Models\Mission;

class Person extends Model
{
    use HasFactory;

    public function aliases()
    {
        return $this->hasMany(Alias::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}