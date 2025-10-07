import { defineStore } from 'pinia';
import CookieHelper from '@shared/lib/cookie';

type State = {
  isAuthenticated: boolean;
};

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    isAuthenticated: false,
  }),
  actions: {
    setIsAuthenticated(value: State['isAuthenticated']) {
      this.isAuthenticated = value;
    },

    checkAuthenticated() {
      this.isAuthenticated = !!CookieHelper.get('token');
    },
  },
});
