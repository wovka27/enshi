import type { SimilarAnimeListItem } from '@entities/anime-similar/model';
import { client } from '@shared/api';

export const fetchGetSimilarList = (id: string) => {
  return client.get<SimilarAnimeListItem[]>({ url: `anime/${id}/akin`, defaultValue: [] });
};
