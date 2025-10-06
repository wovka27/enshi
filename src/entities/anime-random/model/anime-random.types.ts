import type { IBaseAnimeData } from '@entities/anime-card/model';

export interface IRandomAnime extends IBaseAnimeData {
  episodes_count: number;
  screenshots: string[];
  enshi_rating: string;
}
