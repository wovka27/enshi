import animeCommentService from '@entities/anime-comment/model/anime-comment.service.ts';
import type {
  IAnimeDetail,
  IAnimeDetailResponseData,
  IEstimation,
} from '@entities/anime-detail/model/anime-detail.types.ts';
import type { IEntity } from '@entities/entity/model';
import type { IAllEpisode, IEpisodeResponseData } from '@entities/episode/model/types.ts';
import type { IFavoriteResponse } from '@entities/favorite/model';
import { client } from '@shared/api';

class AnimeDetailService {
  async getData(id: string) {
    const response = await client.get<IAnimeDetailResponseData, IAnimeDetail | null, undefined>({
      url: `anime/${id}`,
      defaultValue: null,
      transform: (data) => ({
        ...data.data,
        anime_genres: typeof data.data.anime_genres === 'string' ? [] : data.data.anime_genres,
      }),
    });

    return response.data!;
  }
  async getEpisodes(id: number, voice_id: number) {
    const response = await client.get<IEpisodeResponseData, IEpisodeResponseData['series'], undefined>({
      url: `anime/${id}/${voice_id}/episodes`,
      defaultValue: [],
      transform: (data) => data.series,
    });

    return response.data!;
  }
  async getAllEpisodes(id: number, voice_id: number, number: number) {
    const response = await client.get<IAllEpisode[], IAllEpisode[], undefined>({
      url: `anime/${id}/${voice_id}/all-episodes`,
      axiosConfig: { params: { number } },
      defaultValue: [],
    });

    return response.data!;
  }
  async getVoices(id: number) {
    const response = await client.get<IEntity[], { value: string; label: string }[], undefined>({
      url: `anime/${id}/voices`,
      defaultValue: [],
      transform: (data) =>
        data.map((i) => ({
          value: i.id,
          label: i.name,
        })),
    });

    return response.data!;
  }
  async getComments(id: string, page?: number) {
    return await animeCommentService.getComments(id, page);
  }
  async getFavorites() {
    const response = await client.get<IFavoriteResponse, IFavoriteResponse>({
      url: 'user/favorites',
      defaultValue: {
        data: [],
        pagination: {
          next_page_url: null,
          prev_page_url: null,
        },
      },
    });

    return response.data;
  }
  async addFavorite(payload: { anime_id: number }) {
    const response = await client.post({
      url: 'user/favorites',
      payload,
    });

    return response.data;
  }
  async removeFavorite(payload: { anime_id: number }) {
    const response = await client.post({
      url: 'user/favorites',
      payload,
    });
    return response.data;
  }
  async checkFavorite(payload: { anime_id: number }) {
    const response = await client.post<{ check: boolean }, { check: boolean }, { anime_id: number }>({
      url: 'user/favorites/check',
      payload,
    });
    return response.data;
  }
  async getEstimation(payload: { anime_id: number }) {
    const response = await client.post<IEstimation, IEstimation, { anime_id: number }>({
      url: 'anime/estimation',
      payload,
    });
    return response.data;
  }
  async changeEstimation(payload: { anime_id: number; estimation: number }) {
    const response = await client.post<IEstimation, IEstimation, { anime_id: number; estimation: number }>({
      url: 'anime/estimation',
      payload,
    });
    return response.data;
  }
}

const animeDetailService = new AnimeDetailService();

export default animeDetailService;
