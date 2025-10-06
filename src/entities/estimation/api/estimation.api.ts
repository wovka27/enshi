import type { AxiosResponse } from 'axios';
import type { IEstimationResponseData } from '@entities/estimation/model';
import { client } from '@shared/api';

export const setEstimation = (anime_id: string, estimation: number) => {
  return client.post('/anime/estimation', { anime_id, estimation });
};

export const getEstimation = (anime_id: string): Promise<AxiosResponse<IEstimationResponseData>> => {
  return client.post<IEstimationResponseData>('/anime/show-estimation', { anime_id });
};
