import type { CreateCommentParams } from '@/shared/api';
import type { ArticleDetailType } from '@/entities/article';
import { useQueryClient } from '@tanstack/react-query';
import { useArticleApi } from '@/features/article-browser';
import { useMutation } from '@tanstack/react-query';

interface AddCommentMutationContext {
  previousArticle: ArticleDetailType | undefined;
  tempId: string;
}

export const useAddCommentMutation = (articleId: number) => {
  const queryClient = useQueryClient();
  const api = useArticleApi();

  return useMutation({
    mutationFn: (data: CreateCommentParams) => api.addComment(articleId, data),
    onMutate: async (target: CreateCommentParams) => {
      await queryClient.cancelQueries({ queryKey: ['articles'] });

      const previousArticle = queryClient.getQueryData<ArticleDetailType>(['articles', articleId]);

      const createdAt = Date.now();
      const tempId = `temp-${createdAt}`;

      queryClient.setQueryData(['articles', articleId], (old: ArticleDetailType) => {
        const optimisticComment = {
          id: tempId,
          author_name: target.author_name,
          article_id: articleId,
          content: target.content,
          created_at: createdAt,
        };

        return {
          ...old,
          comments: [...(old.comments || []), optimisticComment],
        };
      });

      return { previousArticle, tempId };
    },

    onError: (_, __, context: AddCommentMutationContext | undefined) => {
      if (context?.previousArticle) {
        queryClient.setQueryData(['articles', articleId], context.previousArticle);
      }
    },
  });
};
