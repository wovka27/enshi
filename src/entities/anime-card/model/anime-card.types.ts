import type { IEntity } from '@entities/entity/model';

export interface IAnimeCardProps {
  rating?: string;
  src: string | null | undefined;
  poster_url: string | null;
  title: string;
  year: string | number;
  genre?: string[];
  anime_genres: string[] | string | null;
  size?: 'medium' | 'large';
  id?: string;
}

export interface IBaseAnimeData extends Pick<IEntity, 'id'> {
  title: string;
  year: number;
  poster_url: string | null;
  anime_genres: string[] | string | null;
  shikimori_rating: string;
}
