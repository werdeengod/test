import type { Axios } from 'axios';
import { useMemo } from 'react';
import { createApiClient } from '../client';

export function useApiClient(): Axios {
  const client = useMemo(() => createApiClient(), []);
  return client;
}
