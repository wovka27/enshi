<script setup lang="ts">
  import { provide, ref, watch, toRefs } from 'vue';

  export interface IUiRadioGroupProps<T = string | number> {
    modelValue: T;
    disabled?: boolean;
  }

  const props = defineProps<IUiRadioGroupProps>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: IUiRadioGroupProps['modelValue']): void;
  }>();

  const { modelValue } = toRefs(props);
  const selected = ref(modelValue.value);

  watch(modelValue, (val) => {
    selected.value = val;
  });

  function select(value: IUiRadioGroupProps['modelValue']) {
    if (!props.disabled) {
      selected.value = value;
      emit('update:modelValue', value);
    }
  }

  const items = ref<HTMLElement[]>([]);

  function register(el: HTMLElement) {
    if (!items.value.includes(el)) {
      items.value.push(el);
    }
  }
  function unregister(el: HTMLElement) {
    items.value = items.value.filter((i) => i !== el);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (props.disabled) return;

    const currentIndex = items.value.findIndex((el) => el === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % items.value.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + items.value.length) % items.value.length;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      items.value[nextIndex]?.focus();
      const nextValue = items.value[nextIndex]?.dataset.value;
      if (nextValue !== undefined) {
        select(nextValue);
      }
    }

    if (e.key === ' ' || e.key === 'Enter') {
      const value = (document.activeElement as HTMLElement)?.dataset.value;
      if (value !== undefined) {
        select(value);
      }
    }
  }

  provide('uiRadioGroup', {
    selected,
    disabled: props.disabled,
    select,
    register,
    unregister,
  });
</script>

<template>
  <slot />
</template>
