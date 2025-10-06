<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import AppFooter from '@widgets/app-footer';
  import AppHeader from '@widgets/app-header';

  const route = useRoute();
</script>

<template>
  <AppHeader />
  <main
    class="MainLayout__content"
    :class="{ nlmt: route.meta.nlmt }"
  >
    <slot />
  </main>
  <AppFooter />
</template>

<style lang="scss">
  .MainLayout__content {
    position: relative;
    margin-top: var(--header-height);

    &.nlmt {
      /* none layout margin top */
      margin-top: 0;
    }
  }
</style>
