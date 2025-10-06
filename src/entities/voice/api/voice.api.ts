import type { IEntity } from '@entities/entity/model';
import { client } from '@shared/api';

export const fetchGetVoices = (id: number) => {
  return client.get<IEntity[]>({ url: `anime/${id}/voices`, defaultValue: [] });
};
