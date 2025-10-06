<script setup lang="ts">
  import type { ILastCommentsListItem } from '@entities/last-comment/model/last-comment.types.ts';
  import LastCommentsItem from '@entities/last-comment/ui/LastCommentsItem.vue';

  interface ILastCommentsListProps {
    data: ILastCommentsListItem[];
  }
  defineProps<ILastCommentsListProps>();
</script>

<template>
  <div class="LastComments__list">
    <LastCommentsItem
      v-for="item of data"
      :key="item.id"
      :data="item"
    />
  </div>
</template>

<style lang="sass">
  .LastComments__list
    display: flex
    box-sizing: border-box
    flex-wrap: wrap
    justify-content: center
    gap: 20px
</style>
