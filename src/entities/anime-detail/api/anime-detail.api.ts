import type { IAnimeDetail } from '@entities/anime-detail/model';
import { client } from '@shared/api';

export const fetchGetAnimeDetail = async (id: string) => {
  return await client.get<IAnimeDetail, IAnimeDetail | null>({ url: `animeview/${id}`, defaultValue: null });
};
