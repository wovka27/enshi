<script setup lang="ts">
  import { useSupportStore } from '@features/sendInSupport/model';
  import BaseModal from '@entities/modal';

  const supportStore = useSupportStore();
</script>

<template>
  <BaseModal
    v-model="supportStore.isOpen"
    custom-class="support-modal"
    title="Сообщение в поддержку"
  >
    <template #body>
      <UiInput
        v-model="supportStore.message"
        icon="support"
      />
    </template>
    <template #footer>
      <UiButton
        btn-type="primary"
        @click="supportStore.submit"
      >
        Отправить
      </UiButton>
    </template>
  </BaseModal>
</template>

<style lang="scss">
  .support-modal {
    min-width: fluid(500, 320);
  }
</style>
