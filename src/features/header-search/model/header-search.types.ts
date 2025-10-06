import type { IBaseAnimeData } from '@entities/anime-card/model';

export interface ISearchResponseItem
  extends Pick<IBaseAnimeData, 'title' | 'year' | 'shikimori_rating' | 'poster_url'> {
  id: number | null;
}
