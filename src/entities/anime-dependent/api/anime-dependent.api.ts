import type { IDependentAnimeListItem } from '@entities/anime-dependent/model';
import { client } from '@shared/api';

export const fetchGetDependentList = (id: string) => {
  return client.get<IDependentAnimeListItem[]>({ url: `anime/${id}/similar` });
};
