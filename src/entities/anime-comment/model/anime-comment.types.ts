import type { IUser } from '@entities/user/model';

export interface ICommentsResponse {
  comments: IComment[];
  countComments: number;
}

export type ICommentsResponseData = {
  data: ICommentsResponse;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more_pages: boolean;
  };
};

export type TransformResponseData = {
  data: ICommentsResponseData['data']['comments'];
  count: ICommentsResponseData['data']['countComments'];
  pagination: ICommentsResponseData['data']['pagination'];
};

export interface IComment {
  id: number;
  user_id: number;
  anime_id: number;
  comment?: string;
  created_at: Date;
  created_at_ago: string;
  answers?: IComment[];
  answer?: string;
  user: Pick<IUser, 'id' | 'name' | 'rank' | 'avatar'>;
}
