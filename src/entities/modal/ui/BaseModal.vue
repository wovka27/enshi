<script setup lang="ts">
  import { onUpdated, ref } from 'vue';

  interface IBaseModalProps {
    title: string;
    formId?: string;
    customClass?: string;
  }

  defineProps<IBaseModalProps>();

  const emit = defineEmits<{
    (event: 'onCancel'): void;
  }>();

  const model = defineModel<boolean>({
    default: false,
    set: (val: boolean) => {
      if (!val) emit('onCancel');
      return val;
    },
  });

  const dialogRef = ref<HTMLDialogElement | null>(null);

  const close = () => {
    if (!dialogRef.value) return;

    dialogRef.value.close();
    model.value = false;
  };

  const onClick = (e: MouseEvent) => {
    const dialog = dialogRef.value;

    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isBackdropClick =
      e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;

    if (isBackdropClick) close();
  };

  const open = () => {
    dialogRef.value?.showModal();
  };

  onUpdated(open);

  defineExpose({ open, close });
</script>

<template>
  <teleport to="body">
    <dialog
      v-if="model"
      ref="dialogRef"
      class="base-modal"
      :class="customClass"
      @mouseup="onClick"
      @cancel="$emit('onCancel')"
    >
      <header class="base-modal-header">
        <slot
          name="header"
          :title="title"
        >
          <p class="base-modal__title">{{ title }}</p>
        </slot>
      </header>
      <main class="base-modal-body">
        <slot
          name="body"
          :form-id="formId"
          :close-modal="close"
        />
      </main>
      <footer class="base-modal-footer">
        <slot
          name="footer"
          :form-id="formId"
          :close-modal="close"
        />
      </footer>
    </dialog>
  </teleport>
</template>

<style lang="scss">
  .base-modal {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    min-width: 360px;
    padding: 20px;
    background: var(--color-dark-16);
    border: none;
    border-radius: var(--border-radius-20);
    transition-duration: var(--transition-duration);
    transition-property: all;
    scale: 1;

    @starting-style {
      scale: 0;
    }

    &::backdrop {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(var(--border-radius-10));
      transition-duration: var(--transition-duration);
      transition-property: all;
      opacity: 1;
      @starting-style {
        opacity: 0;
      }
    }
  }

  .base-modal__title {
    color: var(--color-gray-82);
    font-size: 20px;
    font-weight: var(--font-weight-500);
  }

  .base-modal-body {
  }
  .base-modal-header {
    text-align: center;
  }
  .base-modal-footer {
    width: 100%;
    display: flex;
    &:empty {
      display: none;
    }
  }
</style>
