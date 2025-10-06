<script setup lang="ts">
  withDefaults(defineProps<{ fontSize?: number; size?: 'small' | 'large' }>(), { fontSize: 30, size: 'large' });
</script>

<template>
  <router-link
    class="UiLogoName"
    :class="`UiLogoName--${size}`"
    :style="{ '--fz': fontSize + 'px' }"
    to="/"
  >
    enshi
    <span>.</span>
  </router-link>
</template>

<style lang="scss">
  .UiLogoName {
    --fz: 30px;
    font-family: Aqum, sans-serif;
    font-size: var(--fz);
    letter-spacing: var(--letter-spacing-02);
    span {
      color: var(--color-purple-8c);
    }

    &--small {
      @include mobile-s {
        font-size: 16px;
      }
    }

    &--large {
      @include mobile-s {
        font-size: 23px;
      }
    }
  }
</style>
