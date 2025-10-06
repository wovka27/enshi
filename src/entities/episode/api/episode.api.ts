import type { IAllEpisode, IEpisodeResponseData } from '@entities/episode/model/types.ts';
import { client } from '@shared/api';

export const fetchGetEpisodes = (id: number, voice_id: number) => {
  return client.get<IEpisodeResponseData>(`anime/${id}/${voice_id}/eposodes`);
};
export const fetchGetAllEpisodes = (id: number, voice_id: number, number: number) => {
  return client.get<IAllEpisode[]>(`anime/${id}/${voice_id}/all-episodes`, { params: { number } });
};
