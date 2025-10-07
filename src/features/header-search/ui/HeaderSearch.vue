<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { fetchSearch } from '@features/header-search/api';
  import type { ISearchResponseItem } from '@features/header-search/model';
  import SearchRemoteListItem from '@features/header-search/ui/SearchRemoteListItem.vue';
  import { useClickOutside } from '@shared/lib/composables/click-outside.ts';
  import { useMatchMedia } from '@shared/lib/composables/match-media';
  import { debounce } from '@shared/lib/utils';

  const inputRef = useClickOutside(() => {
    form.name = '';
  });
  const formRef = ref<HTMLElement>();
  const list = ref<ISearchResponseItem[]>([]);

  const isOpen = ref(false);
  const isShowSearch = ref(false);
  const isDropHeader = ref(true);
  const isMobile = ref(false);

  const form = reactive({ name: '' });

  const update = debounce(async (value) => {
    if (!value) return;
    const response = await fetchSearch(value as string);

    list.value = response.data!;
  });

  const clickSearchItem = () => {
    isOpen.value = false;

    form.name = '';
  };

  const conditionIsShowSearch = (v: boolean) => {
    if (v) {
      isShowSearch.value = false;
    } else {
      isShowSearch.value = false;
    }
  };

  useMatchMedia('(width <= 767.98px)', (evt) => {
    isMobile.value = evt?.target?.matches ?? false;

    isDropHeader.value = !isMobile.value;
    isOpen.value = false;

    conditionIsShowSearch(!isMobile.value);
  });

  watch(isDropHeader, conditionIsShowSearch);
  watch(isMobile, conditionIsShowSearch);
  watch(
    list,
    (l) => {
      isOpen.value = !!l.length;
    },
    { deep: true }
  );
</script>

<template>
  <UiIconButton
    :size="48"
    icon-name="search"
    class="HeaderSearch__btn"
    @click="isShowSearch = !isShowSearch"
  />
  <form
    v-if="!isMobile || isShowSearch"
    ref="formRef"
    class="HeaderSearch"
    :class="{ 'HeaderSearch--fixed': isShowSearch || !isDropHeader }"
    @click="inputRef?.focus()"
    @submit.prevent
  >
    <input
      ref="inputRef"
      v-model="form.name"
      class="HeaderSearch__input"
      type="text"
      placeholder="Поиск аниме"
      name="name"
      @update:model-value="update($event)"
      @focus="update(form.name)"
    />
    <button
      class="HeaderSearch__search-button"
      type="submit"
    >
      <UiIcon name="search" />
    </button>
  </form>
  <UiDropdown
    v-model="isOpen"
    is-full-width
    :target="formRef"
    :is-drop-header="isDropHeader"
  >
    <SearchRemoteListItem
      v-for="item of list"
      :key="`${item.id}`"
      :item="item"
      @item-click="clickSearchItem"
    />
  </UiDropdown>
</template>

<style lang="scss">
  .HeaderSearch {
    width: fluid(360, 270);
    padding: 7px 20px;
    display: flex;
    align-items: center;
    column-gap: 5px;
    border: var(--border) var(--color-gray-82-20);
    transition-duration: var(--transition-duration);
    transition-property: border-color;
    border-radius: 85px;
    background: rgba(31, 30, 35, 1);
    font-size: 16px;
    font-weight: var(--font-weight-medium);

    &:has(input:focus),
    &:focus-visible {
      border-color: var(--color-purple-8c);
    }

    @include hover {
      border-color: var(--color-purple-8c);
    }

    &--fixed {
      display: flex !important;
      position: fixed;
      top: calc(var(--header-height) + 10px);
      left: 10px;
      width: calc(100% - (10px * 2));
      right: 10px;
    }
  }
  .HeaderSearch__search-button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    color: var(--color-purple-8c);
  }

  .HeaderSearch__input {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;

    &::placeholder {
      color: rgba(110, 110, 110, 1);
    }
  }

  .HeaderSearch__btn {
    display: none;
  }

  @include mobile {
    .HeaderSearch__btn {
      display: inherit;
    }
    .HeaderSearch {
      display: none;
    }
  }
</style>
