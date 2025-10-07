import type { IDependentAnimeListItem } from '@entities/anime-dependent/model';
import { client } from '@shared/api';

export const fetchGetDependentList = (id: number) => {
  return client.get<IDependentAnimeListItem[]>({ url: `anime/${id}/similar` });
};
