import type { ILastCommentsListItem } from '@entities/last-comment/model/last-comment.types.ts';
import { client } from '@shared/api';

export const getLastCommentsList = async () => {
  const response = await client.get<{ data: ILastCommentsListItem[] }, ILastCommentsListItem[]>({
    url: 'main/last-comments',
    transform: (data) => data.data,
  });

  return response.data!;
};
