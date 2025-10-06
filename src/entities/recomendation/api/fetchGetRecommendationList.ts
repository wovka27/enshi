import type { IBaseAnimeData } from '@entities/anime-card/model';
import { client } from '@shared/api';

export const fetchGetRecommendationsList = () => {
  return client.get<IBaseAnimeData[]>({ url: 'anime/popular', defaultValue: [] });
};
