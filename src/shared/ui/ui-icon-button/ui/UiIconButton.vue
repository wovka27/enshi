<script setup lang="ts">
  import { ref } from 'vue';
  import type { IconTypeName } from '@shared/ui/ui-icon/model';

  interface IconButtonProps {
    iconName: IconTypeName;
    size?: number;
    isTheme?: boolean;
  }

  withDefaults(defineProps<IconButtonProps>(), { size: 50 });

  const btnRef = ref<HTMLButtonElement | null>(null);

  defineExpose({ value: btnRef });
</script>

<template>
  <button
    ref="btnRef"
    :style="{ '--w': size + 'px' }"
    :class="{ 'is-theme': isTheme }"
    class="UiIconButton"
  >
    <UiIcon :name="iconName" />
  </button>
</template>

<style lang="scss">
  .UiIconButton {
    color: var(--color-gray-82);
    flex-shrink: 0;
    width: var(--w, 50px);
    aspect-ratio: 1;
    background-color: var(--color-dark-1f);
    border: var(--border) var(--color-gray-82-20);
    border-radius: var(--border-radius-10);
    transition-property: border-color, color;
    svg {
      width: 100%;
      height: auto;
    }
    &.is-theme {
      background-color: var(--theme-bg);
      color: var(--theme-text);
    }

    @include hover {
      border-color: var(--color-gray-82);
      color: var(--color-white-40);
    }
  }
</style>
