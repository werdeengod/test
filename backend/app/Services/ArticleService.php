<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Article;
use App\DTO\{ PaginationData, CreateArticleData };

class ArticleService
{
    public function getArticles(PaginationData $dto): LengthAwarePaginator
    {
        return Article::paginate(
            perPage: $dto->per_page,
            page: $dto->page
        );
    }

    public function create(CreateArticleData $dto): Article
    {
        return Article::create([
            'title' => $dto->title,
            'content' => $dto->content
         ]);
    }
}