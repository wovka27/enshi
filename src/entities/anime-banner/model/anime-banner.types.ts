import type { IEntity } from '@entities/entity/model';

export interface IAnimeBannerSlide extends Omit<IEntity, 'name'> {
  anime_id: number;
  slide_url: string;
  anime: IAnimeBannerSlideAnimeData;
}

interface IAnimeBannerSlideAnimeData extends Pick<IEntity, 'id'> {
  title: string;
  year: number;
  poster_url: string;
  anime_genres: string[] | string;
  episodes_total: number;
  episodes_count: number;
  episodes_aired: number;
  description: string;
}

export interface IAnimeBannerResponseData {
  data: {
    slides: IAnimeBannerSlide[];
  };
}
