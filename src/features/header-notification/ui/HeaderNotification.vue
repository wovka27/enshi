<script setup lang="ts">
  import { ref } from 'vue';

  const $node = ref<{ value: HTMLElement } | null>(null);
  const isOpen = ref(false);
</script>

<template>
  <UiIconButton
    ref="$node"
    :size="48"
    icon-name="notification"
  />
  <UiDropdown
    v-model="isOpen"
    :target="$node?.value"
    :width="250"
  ></UiDropdown>
</template>
