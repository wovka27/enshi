import { defineStore } from 'pinia';
import animeDetailService from '@entities/anime-detail/model/anime-detail.service.ts';

export const useRatingModalStore = defineStore('rating-modal', {
  state: () => ({
    isOpen: false,
    ratingValue: 5,
  }),
  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    setRatingValue(value: number) {
      this.ratingValue = value;
    },
    async changeRating(payload: { anime_id: number; estimation: number }) {
      await animeDetailService.changeEstimation(payload);
      this.closeModal();
    },
  },
});
