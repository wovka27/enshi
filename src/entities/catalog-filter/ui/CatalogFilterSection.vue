<script setup lang="ts">
  import { computed, ref } from 'vue';

  interface Option {
    label: string;
    value: string;
  }

  interface ICatalogFilterSectionProps {
    title: string;
    isBtn?: boolean;
    columnsCount: string;
  }

  const props = defineProps<ICatalogFilterSectionProps>();

  const model = defineModel<string[]>({ default: [] });
  const list = defineModel<Option[]>('list', { default: [] });

  const selected = computed(() => model.value.length);
  const buttonText = computed(() => (is_show.value ? 'Скрыть' : 'Показать все'));

  const is_show = ref(false);
  const maxVisibleRows = 3;

  const visibleOptions = computed(() => {
    if (!props.isBtn || is_show.value) return list.value;

    const perRow = +props.columnsCount || 1;
    return list.value.filter((_, idx) => Math.floor(idx / perRow) < maxVisibleRows);
  });

  const clear = () => {
    model.value = [];
  };

  const toggleShow = () => {
    is_show.value = !is_show.value;
  };
</script>

<template>
  <section class="CatalogFilterSection">
    <div class="CatalogFilterSection__header">
      <h4 class="CatalogFilterSection__title">{{ title }}</h4>
      <p
        v-if="list.length > 3 && selected"
        style="cursor: pointer"
        @click="clear"
      >
        очистить({{ selected }})
      </p>
    </div>

    <div
      class="CatalogFilterSection__list"
      :style="`grid-template-columns: repeat(${columnsCount}, 1fr)`"
    >
      <UiCheckboxGroup
        v-model="model"
        :options="visibleOptions"
      />
    </div>

    <UiButton
      v-if="isBtn"
      btn-type="outline-small"
      class="CatalogFilterSection__footer"
      @click="toggleShow"
    >
      {{ buttonText }}
    </UiButton>
  </section>
</template>

<style lang="scss">
  .CatalogFilterSection {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .CatalogFilterSection__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .CatalogFilterSection__list {
    display: grid;
    gap: 10px;
  }
</style>
