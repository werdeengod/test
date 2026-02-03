export interface ArticleType {
  id: number
  title: string
  content: string
  created_at: string
}

export interface ArticleDetailType extends ArticleType {
  comments: CommentType[]
}

export interface CommentType {
  id: number
  author_name: string
  article_id: number
  content: string
  created_at: string
}
