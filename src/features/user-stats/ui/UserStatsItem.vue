<script setup lang="ts">
  defineProps<{ title: string; isLine?: boolean; textData: { label: string; value: number }[] }>();
</script>

<template>
  <div class="UserStatsItem">
    <p class="UserStatsItem__title">{{ title }}</p>
    <p
      v-for="(item, index) of textData"
      :key="index"
      class="UserStatsItem__itemText"
    >
      {{ item.label }}
      <span>{{ item.value || 0 }}</span>
    </p>
  </div>
  <i
    v-if="isLine"
    class="line"
  ></i>
</template>

<style lang="scss">
  .UserStatsItem {
    width: 100%;
  }

  .UserStatsItem__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 30px;
  }

  .line {
    width: 100%;
    height: 0;
    display: block;
    border: var(--border) var(--color-gray-82-20);
    margin: 30px 0 20px;
  }

  .UserStatsItem__itemText {
    display: inline-flex;
    gap: 20px;
    justify-content: space-between;
  }
</style>
