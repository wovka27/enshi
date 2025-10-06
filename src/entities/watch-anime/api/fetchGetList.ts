import type { IBaseAnimeData } from '@entities/anime-card/model';
import { client } from '@shared/api';

export const fetchGetList = async (type: 'popular' | 'new') => {
  const response = await client.get<IBaseAnimeData[]>({ url: `anime/${type}`, defaultValue: [] });

  return response.data!;
};
