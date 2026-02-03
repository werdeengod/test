<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Models\Article;
use App\Services\CommentService;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\CommentResource;

class CommentController extends Controller
{
    public function __construct(
        private CommentService $commentService
    ) {}

    public function store(CreateCommentRequest $request, Article $article): JsonResponse
    {
        $dto = $request->toDTO($article->id);
        $comment = $this->commentService->create($dto);
        
        return response()->json(
            new CommentResource($comment), 
            201
        );
    }
}
