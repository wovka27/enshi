<script setup lang="ts">
  import type { IReleaseTodayListItem } from '@entities/release-today/model';

  export interface IReleaseTodayCardItemProps {
    data: IReleaseTodayListItem;
  }
  defineProps<IReleaseTodayCardItemProps>();
</script>

<template>
  <router-link
    :to="data.id ? { name: 'anime_page', params: { id: data.id } } : ''"
    class="ReleaseTodayPosterItem"
    :class="{ event_none: !data.id }"
  >
    <UiImage
      v-if="data.poster_url"
      :src="data.poster_url"
      :alt="data.title"
      error-src="/images/img.png"
    />
  </router-link>
</template>

<style lang="sass">
  .ReleaseTodayPosterItem
    overflow: hidden
    text-decoration: none
    color: var(--theme-text)
    position: relative
    z-index: 1
    width: 160px
    height: 250px
    cursor: pointer
    border: var(--border) var(--theme-block-bg)
    border-radius: var(--border-radius-10) var(--border-radius-10) 0 0
    background: var(--theme-item-bg)
    will-change: transform
    transition: transform var(--transition-duration) ease-in-out
    transform: translateY(0) scale(1)

    img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center

    @media (hover: none)
      &:active
        transform: translateY(-5%) scale(1.1)

    @media (hover: hover)
      &:hover
        transform: translateY(-5%) scale(1.1)

    &:nth-child(2), &:nth-child(5)
      margin-top: 60px

    &:nth-child(3), &:nth-child(4)
      margin-top: 120px

    &.event_none
      pointer-events: none

  @media (max-width: 1000px)
    .ReleaseTodayPosterItem
      height: 240px
      justify-self: center

      &:nth-child(1), &:nth-child(4)
        margin-top: 60px

      &:nth-child(2), &:nth-child(3)
        margin-top: 120px

      &:nth-child(5), &:nth-child(6)
        display: none

  @media (max-width: 689px)
    .ReleaseTodayPosterItem
      height: 145px
      align-self: end

      &:nth-child(1), &:nth-child(2), &:nth-child(3)
        margin-top: inherit

      &:nth-child(4)
        display: none

  @media (max-width: 499px)
    .ReleaseTodayPosterItem
      align-self: flex-end
      width: 110px
      height: 145px

      &:nth-child(1)
        margin-top: inherit

      &:nth-child(2), &:nth-child(3)
        margin-top: inherit

      &:nth-child(4)
        display: none
</style>
