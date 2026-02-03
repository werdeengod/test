import type { ArticleType } from '@/entities/article';
import type { CreateArticleParams, PaginationType } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useArticleApi } from '@/features/article-browser';

interface CreateArticleMutationContext {
  previosArticles: PaginationType<ArticleType> | undefined
  tempId: string
}

export function useCreateArticleMutation() {
  const queryClient = useQueryClient();
  const api = useArticleApi();

  return useMutation({
    mutationFn: async (data: CreateArticleParams) => api.createArticle(data),
    onMutate: async (target: CreateArticleParams): Promise<CreateArticleMutationContext> => {
      await queryClient.cancelQueries({ queryKey: ['articles'] });

      const previosArticles = queryClient.getQueryData<PaginationType<ArticleType>>(['articles']);

      const createdAt = Date.now();
      const tempId = `temp-${createdAt}`;

      const optimisticArticle = {
        id: tempId,
        title: target.title,
        content: target.content,
        created_at: createdAt,
        comments: [],
      };

      queryClient.setQueryData(['articles'], (old: PaginationType<ArticleType> | undefined) => {
        return old
          ? {
              ...old,
              data: [...old.data, optimisticArticle],
            }
          : {
              data: [optimisticArticle],
              meta: { total_pages: 1, current_page: 1 },
            };
      });

      return { previosArticles, tempId };
    },
    onError: (_, __, context: CreateArticleMutationContext | undefined) => {
      if (context?.previosArticles) {
        queryClient.setQueryData(['articles'], context.previosArticles);
      }
    },
    onSuccess: (data: ArticleType, _, context: CreateArticleMutationContext) => {
      queryClient.setQueryData<PaginationType<ArticleType>>(['articles'], (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          data: old.data.map((article) => {
            if (String(article.id) === context?.tempId) {
              return {
                ...data,
              };
            }
            return article;
          }),
        };
      });
    },
  });
}
