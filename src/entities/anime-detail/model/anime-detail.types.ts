import type { IBaseAnimeData } from '@entities/anime-card/model';

export interface IAnimeDetail extends IBaseAnimeData {
  episodes_count: number;
  episodes_total: number;
  episodes_aired: number;
  description: string;
  player_link: string | null;
  enshi_rating: string | null;
  next_episode_at: string;
  enshi_player: boolean;
}

export interface IAnimeDetailResponseData {
  data: IAnimeDetail;
}

export interface IEstimation {
  voices: number;
  rating: string;
  estimation: number;
}
