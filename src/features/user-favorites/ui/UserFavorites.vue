<script setup lang="ts">
  import AnimeCardList from '@features/anime-card-list';
  import { useUserFavorites } from '@features/user-favorites/model/user-favorites.composable.ts';

  const { isAuthUser, favoriteAnimeList } = useUserFavorites();
</script>

<template>
  <div
    v-if="isAuthUser"
    class="AccountView__favoriteList"
  >
    <AnimeCardList :data="favoriteAnimeList" />
  </div>
</template>
