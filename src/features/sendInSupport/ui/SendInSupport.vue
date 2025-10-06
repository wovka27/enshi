<script setup lang="ts">
  import { useSupportStore } from '@features/sendInSupport/model';
  import SupportModal from '@features/sendInSupport/ui/SupportModal.vue';

  const supportStore = useSupportStore();
</script>

<template>
  <UiIconButton
    class="SendInSupport"
    :size="50"
    icon-name="support"
    @click="supportStore.openModal"
  />
  <SupportModal />
</template>

<style lang="scss">
  .SendInSupport {
    flex-shrink: 0;
    height: var(--w);

    @include mobile-s {
      display: none;
    }
  }
</style>
