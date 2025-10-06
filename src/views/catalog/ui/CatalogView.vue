<script setup lang="ts">
  import { onBeforeRouteUpdate } from 'vue-router';
  import { createCatalogGuard } from '@app/router/config/guards';
  import AnimeSection from '@features/anime-section';
  import { useCatalogStore } from '@entities/catalog/model';
  import { useDrawerStore } from '@shared/ui/ui-drawer/model';

  const drawerStore = useDrawerStore();
  const catalogStore = useCatalogStore();

  onBeforeRouteUpdate(createCatalogGuard);
</script>

<template>
  <div class="CatalogView">
    <AnimeSection
      id="catalog"
      title="Смотреть аниме"
      :list="catalogStore.data"
    >
      <template #header>
        <UiButton
          w-content
          btn-type="outline"
          @click="drawerStore.open"
        >
          Фильтр
        </UiButton>
      </template>
      <template #other>
        <UiPagination
          v-if="catalogStore.data.length"
          :initial="catalogStore.meta.current_page"
          :total="catalogStore.meta.last_page"
        />
      </template>
      <template #empty>
        <div class="CatalogView__list-empty">
          <UiImage
            widht="500"
            height="500"
            src="/images/catalog_empty.svg"
          />
          <h2 class="CatalogView__list-empty-title">Упс! Похоже, тут пусто</h2>
          <p class="CatalogView__list-empty-subtitle">
            К&nbsp;сожалению, мы&nbsp;ничего не&nbsp;нашли.
            <br />
            Попробуйте что-то более реальное.
          </p>
        </div>
      </template>
    </AnimeSection>
  </div>
</template>

<style lang="scss">
  .CatalogView {
    padding-top: 60px;
  }

  .CatalogView__list-empty {
    max-width: 500px;
    margin: 0 auto;
    @include flex-center();
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .CatalogView__list-empty-title {
    color: var(--color-white);
    font-size: 22px;
    font-weight: var(--font-weight-600);
  }

  .CatalogView__list-empty-subtitle {
    color: var(--color-gray-82);
    font-size: 18px;
    font-weight: var(--font-weight-600);
  }
</style>
