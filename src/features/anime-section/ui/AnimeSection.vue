<script setup lang="ts">
  import AnimeCardList from '@features/anime-card-list';
  import type { ICatalog } from '@entities/catalog/model';

  interface IAnimeSectionProps {
    list: ICatalog['data'];
    title: string;
    id?: string;
  }

  defineProps<IAnimeSectionProps>();
</script>

<template>
  <UiSection
    :id="id"
    :title="title"
  >
    <template #header>
      <slot name="header" />
    </template>
    <div
      v-if="list.length"
      class="AnimeSection__list-container"
    >
      <div class="AnimeSection__list">
        <AnimeCardList :data="list" />
      </div>
      <slot name="other" />
    </div>
    <template v-else>
      <slot name="empty" />
    </template>
  </UiSection>
</template>

<style lang="scss">
  .AnimeSection__list {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: fluid(55, 5);
  }

  .AnimeSection__list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: fluid(120, 60);
  }
</style>
