import type { ISearchResponseItem } from '@features/header-search/model/header-search.types.ts';
import { client } from '@shared/api';

export const fetchSearch = (title: string) => {
  return client.get<ISearchResponseItem[]>({
    url: `anime/search`,
    axiosConfig: { params: { title } },
    defaultValue: [],
  });
};
