import type { IBaseAnimeData } from '@entities/anime-card/model';

export interface ICatalog {
  data: ICatalogItem[];
}

export interface ICatalogMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string;
  path: string | null;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
export interface ICatalogRequestMeta {
  page?: number;
  years?: string[];
  genres?: string[];
  statuses?: string[];
}
export interface ICatalogItem extends IBaseAnimeData {
  id_kodik: string;
  last_season: number;
  last_episode: number;
  episodes_count: number;
  blocked_countries: [];
  anime_status: string;
  description: string;
  poster_url: string;
  screenshots: string[];
  enshi_rating: string;
  next_episode_at: null;
  episodes_total: number;
  episodes_aired: number;
  player_link: string;
  created_at: string;
  updated_at: string;
  enshi_player: false;
  enabled_anime: true;
  other_titles: string | string[] | null;
  anime_studios: string | string[] | null;
}

export type ICatalogResponseData = ICatalog & ICatalogMeta;
