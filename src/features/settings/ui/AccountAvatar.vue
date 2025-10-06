<script setup lang="ts">
  defineProps<{ src: string | null | undefined }>();
</script>

<template>
  <div class="AccountAvatar">
    <UiImage
      :key="src"
      :src="src"
      error-src="/images/AvatarExample.png"
      alt="Avatar"
    />
  </div>
</template>

<style lang="scss">
  .AccountAvatar {
    position: relative;
    display: flex;
    width: fluid(100, 60);
    height: fluid(100, 60);
    flex-shrink: 0;
    border-radius: var(--border-radius-10);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
