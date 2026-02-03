<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;

class Article extends Model
{
    use HasFactory;

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'title',
        'content',
        'created_at'
    ];

    protected $casts = [
        'created_at'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
