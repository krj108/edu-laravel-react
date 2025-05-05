<?php

namespace Modules\LMS\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\LMS\Database\factories\SchoolClassFactory;

class SchoolClass extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'content',
        'image',
    ];
    
    // protected static function newFactory(): SchoolClassFactory
    // {
    //     //return SchoolClassFactory::new();
    // }
}
