export interface IEnshiPlayerEpisodeProps {
  episode_img?: string;
  episode_number: number;
  episode_poster?: string;
  is_active: boolean;
  not_viewed: boolean;
}

export interface IEnshiPlayerEpisodeListProps {
  episodes: {
    series_number: number;
    poster_url: string;
  }[];
}
