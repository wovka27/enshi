<script setup lang="ts">
  import { computed, ref } from 'vue';
  import AnimeSection from '@features/anime-section';
  import { useListStore } from '@entities/watch-anime/model/list.store.ts';

  const listStore = useListStore();

  const type = ref<'popular' | 'new'>('popular');

  const selected = computed({
    get: () => type.value,
    set: (newValue) => listStore.getData((type.value = newValue)),
  });

  listStore.getData();
</script>

<template>
  <AnimeSection
    id="recommendations"
    title="Смотреть аниме"
    :list="listStore.list"
  >
    <template #header>
      <div style="display: flex; gap: 10px">
        <UiRadioButtonGroup v-model="selected">
          <UiRadioButton
            value="popular"
            size="outline"
          >
            Популярное
          </UiRadioButton>
          <UiRadioButton
            value="new"
            size="outline"
          >
            Новинки
          </UiRadioButton>
        </UiRadioButtonGroup>
      </div>
    </template>
  </AnimeSection>
</template>
