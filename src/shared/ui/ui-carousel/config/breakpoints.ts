import type { SwiperOptions } from 'swiper/types';

const getOptions = (slidesPerView: number, spaceBetween?: number) => ({
  slidesPerView,
  spaceBetween,
});

export const breakpointsMap: SwiperOptions['breakpoints'] = {
  '320': getOptions(3.5, 50),
  '500.98': getOptions(4.5, 70),
  '768': getOptions(5.5, 50),
};
