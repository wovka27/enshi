import type { INewSeriesListItem } from '@entities/new-series/model';
import { client } from '@shared/api';

export const fetchGetNewSeries = () => {
  return client.get<INewSeriesListItem[]>({ url: 'anime/new-series', defaultValue: [] });
};
