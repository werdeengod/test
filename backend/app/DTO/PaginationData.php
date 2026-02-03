<?php

namespace App\DTO;

class PaginationData
{
    public function __construct(
        public readonly int $page,
        public readonly int $per_page 
    ) {}
}