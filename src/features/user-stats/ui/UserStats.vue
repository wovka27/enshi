<script setup lang="ts">
  import { useUserStats } from '@features/user-stats/model/user-stats.composable.ts';
  import UserStatsItem from '@features/user-stats/ui/UserStatsItem.vue';

  const { data } = useUserStats();
</script>
<template>
  <div
    v-if="data.length"
    inert
    class="UserStats"
  >
    <UserStatsItem
      v-for="item of data"
      :key="item.title"
      :title="item.title"
      :is-line="item.isLine"
      :text-data="item.textData"
    />
  </div>
</template>

<style lang="scss">
  .UserStats {
    background-color: var(--theme-block-bg);
    height: 359px;
    max-width: 100%;
    grid-area: stats;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    border: var(--border) var(--border-color-gray-82-20);
    border-radius: var(--border-radius-10);
    padding: fluid(30, 20);
    color: var(--theme-text);
    &.is_hidden {
      display: none;
    }

    p {
      width: 100%;
      display: flex;
      font-weight: 500;
      justify-content: space-between;

      span {
        color: #b17eff;
      }

      &:last-child {
        margin-top: 10px;
      }
    }
  }
</style>
