<script setup lang="ts">
  import { inject, computed, onMounted, onBeforeUnmount, ref } from 'vue';

  interface IUiRadioButtonProps<T = string | number> {
    value: T;
    disabled?: boolean;
    size?: 'outline' | 'outline-small';
  }

  const props = withDefaults(defineProps<IUiRadioButtonProps>(), {
    size: 'outline',
  });

  const radioGroup = inject<{
    selected: { value: unknown };
    disabled?: boolean;
    select: (val: unknown) => void;
    register: (el: HTMLElement) => void;
    unregister: (el: HTMLElement) => void;
  }>('uiRadioGroup');

  const isSelected = computed(() => radioGroup?.selected.value === props.value);
  const isDisabled = computed(() => radioGroup?.disabled || props.disabled);

  const btnRef = ref<HTMLButtonElement>();

  function onClick() {
    if (!isDisabled.value) {
      radioGroup?.select(props.value);
    }
  }

  onMounted(() => {
    if (btnRef.value) radioGroup?.register(btnRef.value);
  });
  onBeforeUnmount(() => {
    if (btnRef.value) radioGroup?.unregister(btnRef.value);
  });
</script>

<template>
  <button
    ref="btnRef"
    type="button"
    role="radio"
    :aria-checked="isSelected"
    :aria-disabled="isDisabled"
    class="UIButton"
    :class="[size, { 'is-selected': isSelected, disabled: isDisabled }]"
    :disabled="isDisabled"
    :data-value="value"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .UIButton {
    // 🔹 наследуем твой outline/outline-small
    color: var(--theme-text);
    flex-shrink: 0;
    width: max-content;
    background-color: var(--theme-block-bg);
    border: var(--border) var(--color-gray-82-20);
    border-radius: var(--border-radius-10);
    transition:
      border-color 0.25s ease,
      color 0.25s ease,
      background-color 0.25s ease,
      box-shadow 0.25s ease;
    &.outline-small {
      font-size: fluid(14, 12);
      padding: fluid(10, 8) 18px;
    }

    &.is-selected {
      border-color: var(--color-gray-82);
      color: var(--color-white);
      background-color: var(--color-dark-1f);
      box-shadow: 0 0 8px var(--color-gray-82-20);
    }

    &:not(.is-selected):hover:not(.disabled) {
      border-color: var(--color-gray-82);
      color: var(--color-white-40);
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    }
  }
</style>
