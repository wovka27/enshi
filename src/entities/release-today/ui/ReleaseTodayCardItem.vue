<script setup lang="ts">
  import { computed } from 'vue';
  import type { IReleaseTodayListItem } from '@entities/release-today/model';

  export interface IReleaseTodayCardItemProps {
    data: IReleaseTodayListItem;
  }

  const props = defineProps<IReleaseTodayCardItemProps>();

  const time = computed(() => {
    if (!props.data.next_episode_at) return '';

    return new Date(props.data.next_episode_at).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });
</script>

<template>
  <router-link
    :to="data.id ? { name: 'anime_page', params: { id: data.id } } : ''"
    class="ReleaseTodayCardItem"
    :class="{ event_none: !data.id }"
  >
    <picture class="ReleaseTodayCardItem__itemPoster">
      <UiImage
        :src="data.poster_url"
        width="466"
        height="677"
        error-src="/images/img.png"
        :alt="'poster ' + data.poster_url"
      />
    </picture>
    <div class="ReleaseTodayCardItem__itemInfo">
      <p
        v-if="data.title"
        class="ReleaseTodayCardItem__itemName"
      >
        {{ data.title }}
      </p>
      <p
        v-if="time"
        class="ReleaseTodayCardItem__itemTime"
      >
        Время&nbsp;{{ time }}
      </p>
    </div>
    <div
      v-if="data.episodes_aired"
      class="ReleaseTodayCardItem__itemEpisode"
    >
      {{ data.episodes_aired + 1 }}
      <br />
      <span>серия</span>
    </div>
  </router-link>
</template>

<style lang="scss">
  .ReleaseTodayCardItem {
    height: 100px;
    display: grid;
    grid-template-columns: max-content 2fr 1fr;
    gap: 20px;
    text-decoration: none;
    color: var(--theme-text);
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    padding-right: 20px;
    background: var(--theme-item-bg);
    will-change: transform;
    transition: transform 0.2s ease-in-out;

    &.event_none {
      pointer-events: none;
    }

    @media (hover: none) {
      &:active {
        transform: scale(1.03);
      }
    }

    @media (hover: hover) {
      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .ReleaseTodayCardItem__itemPoster {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    flex-shrink: 0;
    width: 80px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .ReleaseTodayCardItem__itemEpisode {
    text-align: center;
    flex-shrink: 0;
  }

  .ReleaseTodayCardItem__itemTime {
    color: rgb(130, 130, 130);
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;
  }

  .ReleaseTodayCardItem__itemName {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ReleaseTodayCardItem__itemEpisode {
    font-size: 24px;
    font-weight: 500;
    line-height: 19px;
    justify-self: end;

    span {
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
    }
  }

  @media (max-width: 689px) {
    .ReleaseTodayCardItem {
      width: 100%;
    }

    .ReleaseTodayCardItem__itemName {
      font-size: 16px;
    }

    .ReleaseTodayCardItem__itemTime {
      font-size: 14px;
    }

    .ReleaseTodayCardItem__itemEpisode {
      font-size: 21px;

      span {
        font-size: 12px;
      }
    }
  }
</style>
