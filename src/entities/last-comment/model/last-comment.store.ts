import { getLastCommentsList } from '@entities/last-comment/api/fetchLastComments.ts';
import type { ILastCommentsListItem } from '@entities/last-comment/model/last-comment.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useLastCommentStore = defineListStore<ILastCommentsListItem>({
  id: 'last-comment',
  fetcher: getLastCommentsList,
});
