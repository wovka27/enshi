import type { IBaseAnimeData } from '@entities/anime-card/model';
import type { IEntity } from '@entities/entity/model';

export interface IFavoriteResponse {
  data: IFavorite[];
  pagination: IFavoriteResponsePagination;
}

export interface IFavorite extends Omit<IEntity, 'name'> {
  user_id: number;
  anime_id: number;
  anime: IBaseAnimeData;
}

interface IFavoriteResponsePagination {
  next_page_url: string | null;
  prev_page_url: string | null;
}
