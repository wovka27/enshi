<script setup lang="ts">
  defineProps<{ src: string }>();
</script>

<template>
  <div class="AnimeDetailView-body__player">
    <iframe
      :src="src"
      allowfullscreen
      allow="autoplay *; fullscreen *"
    ></iframe>
  </div>
</template>

<style lang="scss">
  .AnimeDetailView-body__player {
    width: 100%;
    height: fluid(466, 430);
    iframe {
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-10);
    }
  }
</style>
