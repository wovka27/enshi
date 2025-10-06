import type { IRandomAnime } from '@entities/anime-random/model';
import { client } from '@shared/api';

class AnimeRatingService {
  async getData() {
    const response = await client.get<IRandomAnime[]>({
      url: 'anime/random-anime',
      defaultValue: [],
    });

    return response.data!;
  }
}

const animeRatingService = new AnimeRatingService();

export default animeRatingService;
