import type { IUser } from '@entities/user/model';

export interface ILastCommentsListItem {
  id: number;
  user_id: number;
  anime_id: number;
  comment: string;
  created_at: string;
  created_at_ago: string;
  user: Pick<IUser, 'id' | 'name' | 'avatar'>;
  anime: {
    id: number;
    title: string;
  };
}
