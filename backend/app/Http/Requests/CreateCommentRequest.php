<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\CreateCommentData;

class CreateCommentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'author_name' => 'required|string',
            'content' => 'required|string|min:1|max:100'
        ];
    }

    public function toDTO(int $articleId): CreateCommentData
    {
        $data = $this->validated();

        return new CreateCommentData(
            author_name: $data['author_name'],
            content: $data['content'],
            article_id: $articleId
        );
    }
}
