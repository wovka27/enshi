import { defineStore } from 'pinia';
import type { IComment, ICommentsResponseData } from '@entities/anime-comment/model';
import animeCommentService from '@entities/anime-comment/model/anime-comment.service.ts';
import animeDetailService from '@entities/anime-detail/model/anime-detail.service.ts';
import type { IAnimeDetail, IEstimation } from '@entities/anime-detail/model/anime-detail.types.ts';
import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';
import type { IEpisode } from '@entities/episode/model/types.ts';

interface State {
  data: IAnimeDetail | null;
  episodes: IEpisode[];
  allEpisodes: unknown[];
  voices: { value: string; label: string }[];
  selectedPlayerType: 'kodik' | 'enshi';
  selectedVoiceType: number | null;
  selectedEpisode: IEpisode | null;
  comments: {
    data: IComment[];
    count: ICommentsResponseData['data']['countComments'];
    pagination: ICommentsResponseData['pagination'];
  };
  hasFavorite: boolean;
  estimation: IEstimation | null;
  episodeIndex: number;
}

export const useAnimeDetailStore = defineStore('anime-detail', {
  state: (): State => ({
    data: null,
    episodes: [],
    allEpisodes: [],
    voices: [],
    selectedPlayerType: 'kodik',
    selectedVoiceType: null,
    selectedEpisode: null,
    comments: {
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
    hasFavorite: false,
    estimation: null,
    episodeIndex: 0,
  }),

  getters: {
    currentEpisode: (state: State) => state.episodes[state.episodeIndex % state.episodes.length],
  },

  actions: {
    setSelectedEpisode(value: IEpisode) {
      this.selectedEpisode = value;
      this.getAllEpisodes();
    },
    setSelectedVoiceType(value: number) {
      this.selectedVoiceType = value;
    },
    setSelectedPlayerType(value: 'kodik' | 'enshi') {
      this.selectedPlayerType = value;
    },
    setCommentPagination(key: keyof ICommentsResponseData['pagination'], value: number) {
      this.comments.pagination = { ...this.comments.pagination, [key]: value };
    },
    setEpisodeIndex(val: number) {
      this.episodeIndex = val;
      this.setSelectedEpisode(this.currentEpisode);
    },
    nextEpisode() {
      if (this.episodeIndex >= this.episodes.length - 1) return;
      this.setEpisodeIndex(this.episodeIndex + 1);
    },
    prevEpisode() {
      if (this.episodeIndex <= 0) return;
      this.setEpisodeIndex(this.episodeIndex - 1);
    },
    async getData(id: number) {
      this.data = await animeDetailService.getData(id);

      if (this.data.enshi_player) {
        this.selectedPlayerType = 'enshi';
      }
    },
    async getVoices(id: number) {
      this.voices = await animeDetailService.getVoices(id);
    },
    async getComments(id: number, page?: number) {
      this.comments = await animeDetailService.getComments(id, page);
    },
    async getMoreComments(id: number, page?: number) {
      const response = await animeDetailService.getComments(id, page);

      this.comments.pagination = response.pagination;
      this.comments.count = response.count;
      this.comments.data = this.comments.data.concat(response.data);
    },
    async getEpisodes(id: number, voice_id: number) {
      this.episodes = await animeDetailService.getEpisodes(id, voice_id);
      this.setSelectedEpisode(this.currentEpisode);
    },
    async getAllEpisodes() {
      const videoStore = useVideoStore();

      this.allEpisodes = await animeDetailService.getAllEpisodes(
        this.data!.id,
        this.selectedVoiceType!,
        this.selectedEpisode!.series_number
      );
      videoStore.setQuality(this.allEpisodes.map((i) => ({ value: i.quality.name, label: `${i.quality.name}p` })));
      videoStore.setCurrentQuality(videoStore.qualities[0].value);
    },

    async createComment(id: number, comment: string) {
      await animeCommentService.createComment(id, comment);
      await this.getComments(this.data!.id, 1);
    },
    async createAnswer(id: number, answer: string) {
      await animeCommentService.createAnswer(id, answer);
      await this.getComments(this.data!.id, 1);
    },

    async checkFavorite() {
      const response = await animeDetailService.checkFavorite({ anime_id: Number(this.data?.id) });
      this.hasFavorite = !!response?.check;
    },
    async addFavorite() {
      await animeDetailService.addFavorite({ anime_id: Number(this.data?.id) });
      await this.checkFavorite();
    },
    async removeFavorite() {
      await animeDetailService.removeFavorite({ anime_id: Number(this.data?.id) });
      await this.checkFavorite();
    },

    async showEstimation() {
      const response = await animeDetailService.getEstimation({ anime_id: Number(this.data!.id) });
      this.estimation = response ?? null;
    },
    async changeEstimation(estimation: number) {
      await animeDetailService.changeEstimation({ anime_id: Number(this.data!.id), estimation });
      await this.showEstimation();
    },
  },
});
