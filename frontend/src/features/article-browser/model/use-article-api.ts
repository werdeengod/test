import { useMemo } from 'react';
import { getArticleApi } from '@/entities/article';
import { useApiClient } from '@/shared/api';

export function useArticleApi() {
  const client = useApiClient();
  const api = useMemo(() => getArticleApi(client), [client]);
  return api;
}
