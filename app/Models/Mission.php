<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Person;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'year',
        'outcome'
    ];

    public function people()
    {
        return $this->belongsToMany(Person::class);
    }
}
