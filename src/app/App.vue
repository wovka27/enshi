<script setup lang="ts">
  import BaseLayout from '@app/layout';
  import AppToast from '@entities/app-toast';
</script>

<template>
  <BaseLayout />
  <AppToast />
</template>

<style lang="scss">
  .fix {
    position: relative;
    overflow: hidden;

    &:before {
      pointer-events: none;
      background-color: var(--theme-block-bg);
      z-index: 10;
      content: 'На доработке';
      position: absolute;
      inset: 0;
      font-size: calc(100% + 2rem);
      color: var(--theme-text);
      @include flex-center();
    }
  }
</style>
