import type {
  ICommentsResponseData,
  TransformResponseData,
} from '@entities/anime-comment/model/anime-comment.types.ts';
import { client } from '@shared/api';

class AnimeCommentService {
  async getComments(id: number, page: number = 1) {
    const response = await client.get<ICommentsResponseData, TransformResponseData>({
      url: `anime/${id}/comments`,
      axiosConfig: { params: { page } },
      defaultValue: {
        data: [],
        count: 0,
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 8,
          has_more_pages: false,
        },
      },
      transform: (data) => ({
        data: data.data.comments,
        count: data.data.countComments,
        pagination: data.pagination,
      }),
    });

    return response.data!;
  }

  async createComment(anime_id: number, comment: string) {
    const response = await client.post<
      ICommentsResponseData,
      TransformResponseData,
      { answer: string; comment_id: number }
    >({
      url: 'anime/comments',
      payload: { comment, anime_id },
    });
  }

  async createAnswer(comment_id: number, answer: string) {
    const response = await client.post<
      ICommentsResponseData,
      TransformResponseData,
      { answer: string; comment_id: number }
    >({
      url: 'anime/comments/answer',
      payload: { answer, comment_id },
    });
  }
}

const animeCommentService = new AnimeCommentService();

export default animeCommentService;
