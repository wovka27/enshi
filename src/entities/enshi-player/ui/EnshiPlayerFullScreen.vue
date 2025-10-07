<script setup lang="ts">
  defineEmits<{
    (event: 'toggle'): void;
  }>();
</script>

<template>
  <button
    class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--fullscreen"
    @click="$emit('toggle')"
  >
    <UiIcon name="fullscreen" />
  </button>
</template>

<style lang="scss">
  .EnshiPlayer-controls__btn--fullscreen {
    @include mobile-s {
      width: 30px;
    }
  }
</style>
