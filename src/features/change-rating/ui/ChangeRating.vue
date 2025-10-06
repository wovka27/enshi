<script setup lang="ts">
  import RatingModal from '@entities/rating-modal';
  import { useRatingModalStore } from '@entities/rating-modal/model';

  const ratingModalStore = useRatingModalStore();
</script>

<template>
  <UiIconButton
    is-theme
    icon-name="rating"
    @click="ratingModalStore.openModal"
  />
  <RatingModal />
</template>
