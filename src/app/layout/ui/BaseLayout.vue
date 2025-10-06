<script setup lang="ts">
  import { useLayout } from '@app/layout/lib';

  const { layout, route } = useLayout();
</script>

<template>
  <component
    :is="layout"
    v-if="route.meta.layout"
  >
    <router-view />
  </component>
  <router-view v-else />
  <UiDrawer />
</template>
