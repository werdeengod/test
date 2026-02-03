<?php

namespace App\DTO;

class CreateCommentData
{
    public function __construct(
        public readonly string $author_name,
        public readonly string $content,
        public readonly int $article_id,
    ) {}
}