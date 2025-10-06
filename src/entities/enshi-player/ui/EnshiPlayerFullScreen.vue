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
    <UiIcon
      width="38"
      name="fullscreen"
    />
  </button>
</template>

<style lang="scss"></style>
