import { defineStore } from 'pinia';
import animeDetailService from '@entities/anime-detail/model/anime-detail.service.ts';
import type { IFavorite } from '@entities/favorite/model';
import { storageUser } from '@entities/user/lib/storageUser.ts';
import type { IUser } from '@entities/user/model/types.ts';
import userService from '@entities/user/model/user.service.ts';
import CookieHelper from '@shared/lib/cookie';

type State = {
  user: IUser | null;
  token: string;
  favorites: IFavorite[];
};

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    token: '',
    favorites: [],
  }),

  getters: {
    checkUserAuthenticated: (state) => {
      return (id: string) => state.user?.id === id;
    },
    favoriteAnimeList: (state) => state.favorites.map((i) => i.anime),
  },

  actions: {
    setUser(data: IUser) {
      this.user = data;
      storageUser.set(data);
    },

    setToken(data: string) {
      this.token = data;
      CookieHelper.set('access_token', data);
    },

    async reset() {
      storageUser.remove();
      CookieHelper.delete('access_token');
      this.user = null;
      this.token = '';
    },

    async check() {
      if (this.token || this.user) return;

      const t = CookieHelper.get('access_token');
      const u = storageUser.get();

      if (t) this.setToken(t);
      if (u) this.setUser(u);

      if (t && !u) await this.getData();
    },

    async getData() {
      if (this.user) return;

      this.user = await userService.getData();
    },

    async getFavorites() {
      const response = await animeDetailService.getFavorites();

      this.favorites = response!.data;
    },

    logout() {
      storageUser.remove();
      CookieHelper.delete('access_token');
      this.$reset();
    },
  },
});
