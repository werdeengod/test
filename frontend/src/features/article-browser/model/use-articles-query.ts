import { useSuspenseQuery } from '@tanstack/react-query';
import { useArticleApi } from './use-article-api';

export function useArticlesQuery() {
  const api = useArticleApi();

  return useSuspenseQuery({
    queryKey: ['articles'],
    queryFn: async () => api.getArticles(),
  });
}
