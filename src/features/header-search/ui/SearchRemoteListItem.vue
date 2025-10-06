<script setup lang="ts">
  import type { ISearchResponseItem } from '@features/header-search/model';

  interface ISearchRemoteListItemProps {
    item: ISearchResponseItem;
  }
  defineProps<ISearchRemoteListItemProps>();
  defineEmits<{
    (event: 'itemClick'): void;
  }>();
</script>

<template>
  <router-link
    v-if="item.id !== null"
    :to="{ name: 'anime_page', params: { id: item.id } }"
    class="UISearchRemote__item"
    @click="$emit('itemClick')"
  >
    <span class="UISearchRemote__itemInnerWrap">
      <UiImage
        :src="item.poster_url"
        class="UISearchRemote__itemImg"
        error-src="/images/img_1.png"
        width="466"
        height="677"
      />
      <span style="display: flex; flex-direction: column; justify-content: space-between">
        <h4 class>{{ item.title }}</h4>
        <span style="display: flex; gap: 20px; justify-content: space-between">
          <strong style="display: flex; gap: 3px; align-items: center">
            <UiImage
              src="/icons/icon_start_rating.svg"
              width="11"
              height="11"
            />
            &nbsp;{{ item.shikimori_rating }}
          </strong>
          <span>{{ item.year }}</span>
        </span>
      </span>
    </span>
  </router-link>
</template>

<style lang="scss">
  .SearchRemoteListItem {
    color: var(--color-white);
  }

  .UISearchRemote__itemInnerWrap {
    width: 100%;
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 10px;

    strong {
      position: relative;
    }

    h4 {
      font-size: 16px;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > img {
      border-radius: var(--border-radius-10);
      width: 64px;
      height: 93px;
      object-fit: cover;
    }
  }

  .UISearchRemote__item {
    width: 100%;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gray-82);
    }
    transition: background-color var(--transition-duration) ease-in-out;
    padding: 10px;
    height: 114px;
    cursor: pointer;
    @include hover {
      background-color: #fff2;
    }
  }
</style>
