<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Models\Article;
use App\Http\Resources\{ ArticleResource, PaginationResource };
use App\Http\Requests\{ PaginationRequest, CreateArticleRequest };
use App\Services\ArticleService;

class ArticleController extends Controller
{
    public function __construct(
        private ArticleService $articleService
    ) {}

    public function index(PaginationRequest $request): JsonResponse
    {
        $dto = $request->toDTO();
        $articles = $this->articleService->getArticles($dto);
        return response()->json(new PaginationResource($articles));
    }

    public function show(Article $article): JsonResponse
    {
        $article->load('comments');
        return response()->json(new ArticleResource($article));
    }

    public function store(CreateArticleRequest $request): JsonResponse
    {
        $dto = $request->toDTO();
        $article = $this->articleService->create($dto);

        return response()->json(
            new ArticleResource($article), 
            201
        );
    }
}
