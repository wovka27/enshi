import type { IAnimeBannerResponseData } from '@entities/anime-banner/model';
import { client } from '@shared/api';

export const fetchGetMainBanner = () => {
  return client.get<IAnimeBannerResponseData, IAnimeBannerResponseData['data']['slides']>({
    url: 'main/banner',
    defaultValue: [],
    transform: (data) =>
      data.data.slides.map((i) => ({
        ...i,
        anime: { ...i.anime, anime_genres: typeof i.anime.anime_genres === 'string' ? [] : i.anime.anime_genres },
      })),
  });
};
