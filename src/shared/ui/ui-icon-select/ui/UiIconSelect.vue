<script setup lang="ts">
  import { ref, computed, onBeforeUnmount, nextTick, watch } from 'vue';
  import type { IconTypeName } from '@shared/ui/ui-icon/model';

  interface Option {
    label: string;
    value: string;
  }

  interface Props {
    modelValue: string;
    icon: IconTypeName;
    options: Option[];
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (value: string): void => {
      emit('update:modelValue', value);
    },
  });

  const isOpen = ref(false);
  const triggerRef = ref<HTMLElement | null>(null);
  const dropdownRef = ref<HTMLElement | null>(null);
  const openUpwards = ref(false);

  const selected = computed(() => props.options.find((o) => o.value === model.value));

  const toggle = async () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      await nextTick();
      checkDropdownPosition();
      window.addEventListener('click', onClickOutside);
    } else {
      window.removeEventListener('click', onClickOutside);
    }
  };

  const selectOption = (option: Option) => {
    model.value = option.value;
    isOpen.value = false;
    window.removeEventListener('click', onClickOutside);
  };

  const onClickOutside = (e: MouseEvent) => {
    if (!triggerRef.value?.contains(e.target as Node) && !dropdownRef.value?.contains(e.target as Node)) {
      isOpen.value = false;
      window.removeEventListener('click', onClickOutside);
    }
  };

  const checkDropdownPosition = () => {
    if (!triggerRef.value || !dropdownRef.value) return;

    const rect = triggerRef.value.getBoundingClientRect();
    const dropdownHeight = dropdownRef.value.offsetHeight;
    const viewportHeight = window.innerHeight;

    openUpwards.value = rect.bottom + dropdownHeight > viewportHeight;
  };

  watch(
    () => props.options,
    (options) => {
      if (options.length && !model.value) {
        model.value = options[0].value;
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
  });
</script>

<template>
  <div class="ui-icon-select">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      class="ui-icon-select__trigger"
      @click="toggle"
    >
      <UiIcon
        :width="50"
        :name="icon"
        class="ui-icon-select__icon"
      />
      <span>{{ selected?.label }}</span>
      <UiIcon
        :width="20"
        :name="isOpen ? 'chevron-up' : 'chevron-down'"
        class="ui-icon-select__chevron"
      />
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <ul
        v-if="isOpen && options.length"
        ref="dropdownRef"
        class="ui-icon-select__dropdown"
        :class="{ 'ui-icon-select__dropdown--up': openUpwards }"
      >
        <li
          v-for="opt in props.options"
          :key="opt.value"
          class="ui-icon-select__option"
          :class="{ 'ui-icon-select__option--active': opt.value === props.modelValue }"
          @click="selectOption(opt)"
        >
          <UiIcon
            :name="opt.icon"
            class="ui-icon-select__icon"
          />
          <span>{{ opt.label }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss">
  .ui-icon-select {
    position: relative;
    display: inline-block;
    min-width: 140px;

    &__trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: var(--theme-block-bg);
      border-radius: 8px;
      color: var(--theme-text);
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 14px;
      width: 100%;
      justify-content: space-between;
    }

    &__icon {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
    }

    &__chevron {
      pointer-events: none;
      margin-left: auto;
      transition: transform 0.2s;
    }

    &__dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      right: 0;
      background: var(--theme-block-bg);
      border-radius: 8px;
      border: 1px solid var(--color-gray-82);
      z-index: 1000;
      overflow: hidden;

      &--up {
        bottom: calc(100% + 4px);
        top: auto;
      }
    }

    &__option {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      color: var(--theme-text);

      &:hover {
        background: #9e9e9e;
        color: var(--color-white);
      }

      &--active {
        background: #9d9d9d;
        color: var(--color-white);
        font-weight: 500;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
