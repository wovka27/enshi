<script setup lang="ts">
  import { ref, onBeforeUnmount, watch, nextTick, type CSSProperties } from 'vue';

  interface Props {
    modelValue: boolean;
    target?: HTMLElement;
    width?: number | null | 'full';
    isFullWidth?: boolean;
    isDropHeader?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: null,
    target: undefined,
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'open'): void;
    (e: 'close'): void;
  }>();

  const dropdownRef = ref<HTMLElement | null>(null);
  const styles = ref<CSSProperties>({});

  const updatePosition = () => {
    if (!props.target || !dropdownRef.value) return;

    const rect = props.target.getBoundingClientRect();
    const dropdownEl = dropdownRef.value;

    const { width: targetWidth, left, right, bottom } = rect;

    const dropdownWidth =
      props.width === 'full' ? targetWidth : typeof props.width === 'number' ? props.width : dropdownEl.offsetWidth;

    // Вычисляем стандартную позицию (по левому краю)
    let computedLeft = left + window.scrollX;
    const computedTop = props.isDropHeader
      ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 60
      : bottom + window.scrollY + 10;

    // Проверяем, не вылезает ли dropdown за пределы окна
    const spaceRight = window.innerWidth - (computedLeft + dropdownWidth + 10);
    const spaceLeft = computedLeft - 10;

    if (spaceRight < 0 && spaceLeft > 0) {
      // если не помещается справа — позиционируем по правому краю target
      computedLeft = right + window.scrollX - dropdownWidth;
    }

    // Мобильная версия
    if (window.innerWidth <= 768 && props.isFullWidth) {
      styles.value = {
        position: 'fixed',
        top: `${computedTop}px`,
        left: '10px',
        right: '10px',
        zIndex: 1000,
      };
      return;
    }

    styles.value = {
      position: 'fixed',
      top: `${computedTop}px`,
      left: `${computedLeft}px`,
      width: `${dropdownWidth}px`,
      zIndex: 1000,
    };
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.value &&
      !dropdownRef.value.contains(e.target as Node) &&
      props.target &&
      !props.target.contains(e.target as Node)
    ) {
      emit('update:modelValue', false);
      emit('close');
    }
  };

  watch(
    () => props.modelValue,
    async (val) => {
      if (val) {
        await nextTick();
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        document.addEventListener('mousedown', handleClickOutside);
        emit('open');
      } else {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
        document.removeEventListener('mousedown', handleClickOutside);
        emit('close');
      }
    }
  );

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition, true);
    document.removeEventListener('mousedown', handleClickOutside);
  });
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        ref="dropdownRef"
        :style="styles"
        class="UiDropdown"
      >
        <slot />
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity var(--transition-duration) ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .UiDropdown {
    @include hide-scroll();

    max-height: 250px;
    overflow-y: auto;
    background: var(--color-dark-16);
    border-bottom: 1.5px solid var(--color-gray-82-20);
    border-left: 1.5px solid var(--color-gray-82-20);
    border-right: 1.5px solid var(--color-gray-82-20);
    border-radius: 0 0 var(--border-radius-20) var(--border-radius-20);
    box-shadow: 0 10px 14px 10px rgba(72, 71, 76, 0.1);
  }
</style>
