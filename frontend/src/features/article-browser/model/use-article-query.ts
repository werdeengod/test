import { useSuspenseQuery } from '@tanstack/react-query';
import { useArticleApi } from './use-article-api';

export const useArticleQuery = (artricleId: number) => {
  const api = useArticleApi();

  return useSuspenseQuery({
    queryKey: ['articles', artricleId],
    queryFn: async () => api.getArticle(artricleId),
  });
};
