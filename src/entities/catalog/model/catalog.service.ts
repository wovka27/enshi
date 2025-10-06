import type {
  ICatalog,
  ICatalogMeta,
  ICatalogRequestMeta,
  ICatalogResponseData,
} from '@entities/catalog/model/catalog.types.ts';
import { client } from '@shared/api';

class CatalogService {
  async getData(meta?: ICatalogRequestMeta) {
    const response = await client.get<ICatalogResponseData, { data: ICatalog['data']; meta: ICatalogMeta }>({
      url: 'anime/search-filtered',
      defaultValue: {
        data: [],
        meta: {
          current_page: 1,
          first_page_url: '',
          from: 0,
          last_page: 0,
          last_page_url: '',
          links: [],
          next_page_url: '',
          path: null,
          per_page: 0,
          prev_page_url: null,
          to: 0,
          total: 0,
        },
      },
      axiosConfig: { params: meta },
      transform: (data) => ({
        data: data.data,
        meta: {
          current_page: data.current_page,
          first_page_url: data.first_page_url,
          from: data.from,
          last_page: data.last_page,
          last_page_url: data.last_page_url,
          links: data.links,
          next_page_url: data.next_page_url,
          path: data.path,
          per_page: data.per_page,
          prev_page_url: data.prev_page_url,
          to: data.to,
          total: data.total,
        },
      }),
    });

    return response.data!;
  }
}

const catalogService = new CatalogService();

export default catalogService;
