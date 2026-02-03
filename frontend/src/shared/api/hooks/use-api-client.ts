import type { Axios } from 'axios';
import { useMemo } from 'react';
import { createApiClient } from '../client';

export const useApiClient = (): Axios => {
  const client = useMemo(() => createApiClient(), []);
  return client;
};
