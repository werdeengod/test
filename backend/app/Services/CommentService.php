<?php

namespace App\Services;

use App\Models\Comment;
use App\DTO\CreateCommentData;

class CommentService
{
    public function create(CreateCommentData $dto): Comment
    {
        return Comment::create([
            'article_id' => $dto->article_id,
            'author_name' => $dto->author_name,
            'content' => $dto->content
        ]);
    }
}