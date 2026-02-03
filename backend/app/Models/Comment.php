<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'article_id',
        'author_name',
        'content',
        'created_at'
    ];

    protected $casts = [
        'created_at'
    ];
}
