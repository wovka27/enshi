import { defineStore } from 'pinia';
import animeDetailService from '@entities/anime-detail/model/anime-detail.service.ts';
import type { IFavorite } from '@entities/favorite/model';
import { storageUser } from '@entities/user/lib/storageUser.ts';
import type { IUser, IUserStats } from '@entities/user/model/types.ts';
import userService from '@entities/user/model/user.service.ts';
import CookieHelper from '@shared/lib/cookie';

type State = {
  user: IUser | null;
  token: string;
  favorites: IFavorite[];
  stats: IUserStats | null;
  localUser: IUser | null;
};

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    token: '',
    favorites: [],
    stats: null,
    localUser: storageUser.get(),
  }),

  getters: {
    checkUserAuthenticated: (state) => {
      return (id: string) => state.user?.id === id;
    },
    favoriteAnimeList: (state) => state.favorites.map((i) => i.anime),
    isAuthUser: (state) => state.localUser && state.user && state.localUser.id === state.user.id,
  },

  actions: {
    setUser(data: IUser | null) {
      this.user = data;
    },
    setLocalUser(data: IUser) {
      this.localUser = data;
      storageUser.set(data);
    },

    setToken(data: string) {
      this.token = data;
      CookieHelper.set('access_token', data, {
        path: '/',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    },

    async reset() {
      storageUser.remove();
      CookieHelper.delete('access_token');
      this.setUser(null);
      this.token = '';
    },

    async check() {
      if (this.token || this.user) return;

      const t = CookieHelper.get('access_token');
      const u = storageUser.get();

      if (t) this.setToken(t);
      if (u) this.setLocalUser(u);

      if (t && !u) await this.getData(this.localUser?.id);
    },

    async getData(id: number) {
      if (this.user?.id == id) return;
      const response = await userService.getData(id);
      this.setUser(response!);
    },

    async getFavorites() {
      if (this.favorites.length) return;
      const response = await animeDetailService.getFavorites();

      this.favorites = response!.data;
    },

    async getStats(id: number) {
      const response = await userService.getStats(id);

      this.stats = response!;
    },

    logout() {
      storageUser.remove();
      CookieHelper.delete('access_token');
      this.$reset();
    },
  },
});
