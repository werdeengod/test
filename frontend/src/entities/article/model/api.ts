import type { Axios, AxiosResponse } from 'axios';
import type { ArticleType, ArticleDetailType, CommentType } from './types';
import type { PaginationType, CreateArticleParams, CreateCommentParams } from '@/shared/api';

export const getArticleApi = (client: Axios) => {
  return {
    getArticles: async (): Promise<PaginationType<ArticleType>> =>
      client.get('/articles').then((res: AxiosResponse<PaginationType<ArticleType>>) => res.data),

    getArticle: async (id: number): Promise<ArticleDetailType> =>
      client.get(`/articles/${id}`).then((res: AxiosResponse<ArticleDetailType>) => res.data),

    createArticle: async (data: CreateArticleParams): Promise<ArticleType> =>
      client.post('/articles', data).then((res: AxiosResponse<ArticleType>) => res.data),

    addComment: async (id: number, data: CreateCommentParams): Promise<CommentType> =>
      client
        .post(`/articles/${id}/comments`, data)
        .then((res: AxiosResponse<CommentType>) => res.data),
  };
};
