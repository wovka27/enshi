<script setup lang="ts">
  import { type SVGAttributes } from 'vue';
  import { iconMap } from '@shared/ui/ui-icon/config';
  import type { IconTypeName } from '@shared/ui/ui-icon/model';

  interface Props extends /* @vue-ignore */ SVGAttributes {
    name: IconTypeName;
  }

  defineProps<Props>();
</script>

<template>
  <svg
    class="UiIcon"
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    v-html="iconMap[name]"
  ></svg>
</template>

<style lang="scss">
  .UiIcon {
    transition-duration: var(--transition-duration);
    @starting-style {
      opacity: 0;
    }
    opacity: 1;
  }
</style>
