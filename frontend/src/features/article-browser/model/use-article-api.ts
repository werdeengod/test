import { useMemo } from 'react';
import { useApiClient } from '@/shared/api';
import { getArticleApi } from '@/entities/article';

export const useArticleApi = () => {
  const client = useApiClient();
  const api = useMemo(() => getArticleApi(client), [client]);
  return api;
};
