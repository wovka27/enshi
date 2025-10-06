import type { SwiperOptions } from 'swiper/types';

const getOptions = (slidesPerView: number, spaceBetween?: number) => ({
  slidesPerView,
  spaceBetween,
});

export const breakpointsMap: SwiperOptions['breakpoints'] = {
  '320': getOptions(3, 5),
  '480.98': getOptions(4, 10),
  '768': getOptions(5, 50),
  '1500': getOptions(4, 40),
  '1950': getOptions(5, 50),
  '2300': getOptions(6, 50),
};
