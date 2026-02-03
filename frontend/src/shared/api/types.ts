export interface CreateArticleParams {
  title: string
  content: string
}

export interface CreateCommentParams {
  author_name: string
  content: string
}

export interface PaginationType<T> {
  data: T[]
  meta: MetaPagination
}

interface MetaPagination {
  total_pages: number
  current_page: number
}
