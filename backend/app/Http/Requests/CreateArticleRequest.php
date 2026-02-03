<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\CreateArticleData;

class CreateArticleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'content' => 'required|string|min:50|max:1000'
        ];
    }

    public function toDTO(): CreateArticleData
    {
        $data = $this->validated();

        return new CreateArticleData(
            title: $data['title'],
            content: $data['content']
        );
    }
}
