<template>
  <div class="SkeletonAnimeCard">
    <div
      v-for="item of ['poster', 'title', 'info']"
      :key="item"
      :class="`SkeletonAnimeCard__${item}`"
    >
      <div class="skeleton-animation"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .SkeletonAnimeCard {
    width: fluid(196, 110);
    height: fluid(358, 212);
  }

  .SkeletonAnimeCard__poster {
    position: relative;
    width: 100%;
    height: fluid(285, 160);
    border-radius: 22px;
  }

  .SkeletonAnimeCard__title {
    position: relative;
    height: fluid(20, 15);
    margin: fluid(10, 5) 0;
    border-radius: 22px;
  }

  .SkeletonAnimeCard__info {
    position: relative;
    height: fluid(20, 15);
    border-radius: 22px;
    width: 100%;
  }
</style>
