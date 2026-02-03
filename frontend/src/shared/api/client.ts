import type { Axios } from 'axios';
import axios from 'axios';

const BASE_URL = `${window.location.origin}/api`;

export const createApiClient = (): Axios => {
  return axios.create({
    baseURL: BASE_URL,
  });
};
