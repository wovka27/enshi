import type { RouterOptions } from 'vue-router';

export const scrollBehavior: RouterOptions['scrollBehavior'] = async (to, _, savedPosition) => {
  if (savedPosition) return savedPosition;

  if (to.name === 'anime_page' && !to.hash) {
    return { y: 0, top: 0 };
  }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      left: 0,
      top: 110,
    };
  }

  return { x: 0, y: 0 };
};
