<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\DTO\PaginationData;

class PaginationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' => 'sometimes|integer',
            'page' => 'sometimes|integer'
        ];
    }

    public function toDTO(): PaginationData
    {
        $data = $this->validated();

        return new PaginationData(
            page: $data['page'] ?? 1,
            per_page: $data['per_page'] ?? 15
        );
    }
}
