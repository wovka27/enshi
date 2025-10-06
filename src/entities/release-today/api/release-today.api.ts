import type { IReleaseTodayListItem } from '@entities/release-today/model';
import { client } from '@shared/api';

export const fetchGetReleaseTodayList = () => {
  return client.get<IReleaseTodayListItem[]>({ url: '/main/today-released', defaultValue: [] });
};
