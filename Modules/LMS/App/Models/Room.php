<?php

namespace Modules\LMS\App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name', 'content', 'image', 'school_class_id'];


    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class);
    }
}