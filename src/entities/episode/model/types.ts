import type { IBaseAnimeData } from '@entities/anime-card/model';
import type { IEntity } from '@entities/entity/model';

export interface IEpisode extends IBaseAnimeData {
  anime_id: number;
  series_name: string;
  series_number: number;
  voice_series_id: number;
}

export interface IAllEpisode {
  id: number;
  anime_id: number;
  voice_series_id: number;
  quality_series_id: number;
  series_url: string;
  series_name: string;
  series_number: number;
  created_at: string;
  updated_at: string;
  poster_url: string;
  video_format_id: number;
  quality: IEntity;
  video_format: Omit<IEntity, 'name'> & { format: string };
}

export interface IEpisodeResponseData {
  count: number;
  series: IEpisode[];
  seriesRanges: { start: number; end: number }[];
}
