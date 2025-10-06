import { API_BASE_URL } from '@app/config';
import { useUserStore } from '@entities/user/model';
import { HttpClient } from '@shared/lib/http-client';

export const client = new HttpClient({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  getToken: () => useUserStore().token,
});
