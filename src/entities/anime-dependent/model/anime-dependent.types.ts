export interface IDependentAnimeListItem {
  id: number;
  id_kodik: string;
  title: string;
  year: number;
  last_season: number;
  last_episode: number;
  episodes_count: number;
  blocked_countries: string[];
  anime_status: string;
  description: string;
  poster_url: string;
  screenshots: string[];
  anime_genres: string[];
  shikimori_rating: string;
  enshi_rating: string;
  next_episode_at: string;
  episodes_total: number;
  episodes_aired: number;
  enabled_anime: number;
  player_link: string;
  created_at: Date;
  updated_at: Date;
  enshi_player: boolean;
}
