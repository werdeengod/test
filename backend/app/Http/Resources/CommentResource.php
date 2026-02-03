<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'author_name' => $this->author_name,
            'article_id' => $this->article_id,
            'content' => $this->content,
            'created_at' => $this->created_at
        ];
    }
}
