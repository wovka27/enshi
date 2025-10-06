<script setup lang="ts">
  import { ref } from 'vue';
  import HeaderMenuList from '@features/header-menu/ui/HeaderMenuList.vue';

  const btnRef = ref<{ value: HTMLElement }>();
  const isOpen = ref<boolean>(false);
</script>

<template>
  <UiIconButton
    ref="btnRef"
    :icon-name="isOpen ? 'close' : 'burger'"
    @click="isOpen = !isOpen"
  />
  <UiDropdown
    v-model="isOpen"
    :target="btnRef?.value"
    :width="320"
    is-drop-header
  >
    <HeaderMenuList @click-item="isOpen = false" />
  </UiDropdown>
</template>
