<script setup lang="ts">
  import { filterData } from '@entities/catalog-filter/config';
  import { sections } from '@entities/catalog-filter/config';
  import { useCatalogFilter } from '@entities/catalog-filter/model';
  import CatalogFilterSection from '@entities/catalog-filter/ui/CatalogFilterSection.vue';

  const { filters, save, reset } = useCatalogFilter();
</script>

<template>
  <div class="CatalogFilter">
    <div class="CatalogFilter__list">
      <CatalogFilterSection
        v-for="section of sections"
        :key="section.id"
        v-model="filters[section.type]"
        v-model:list="filterData[section.type]"
        :columns-count="section.cols"
        :title="section.title"
        :is-btn="section.isBtn"
      />
    </div>
    <div class="CatalogFilter__actions">
      <UiButton
        w-content
        btn-type="outline-small"
        @click="reset"
      >
        Сбросить
      </UiButton>
      <UiButton
        w-content
        btn-type="primary-small"
        @click="save"
      >
        Сохранить
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss">
  .CatalogFilter {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;
  }

  .CatalogFilter__list {
    @include hide-scroll();
    height: 100%;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .CatalogFilter__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
</style>
