<script setup lang="ts">
  import { ref, computed, nextTick, onMounted, watch } from 'vue';

  interface Tab {
    label: string;
    value: string | number;
  }

  interface Props {
    modelValue: string | number;
    tabs: Tab[];
    theme?: 'dark' | 'light';
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: 'dark',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const listRef = ref<HTMLElement | null>(null);
  const tabRefs = ref<HTMLElement[]>([]);

  const setTabRef = (index: number) => (el: HTMLElement | null) => {
    if (el) tabRefs.value[index] = el;
  };

  const indicator = ref({ width: 0, left: 0 });

  const select = (value: string | number) => {
    emit('update:modelValue', value);
  };

  const move = (dir: number) => {
    const idx = props.tabs.findIndex((t) => t.value === props.modelValue);
    if (idx === -1) return;
    const nextIdx = (idx + dir + props.tabs.length) % props.tabs.length;
    select(props.tabs[nextIdx].value);
  };

  const updateIndicator = async () => {
    await nextTick();
    const idx = props.tabs.findIndex((t) => t.value === props.modelValue);
    const el = tabRefs.value[idx];
    if (!el) return;
    indicator.value = {
      width: el.offsetWidth,
      left: el.offsetLeft,
    };
  };

  onMounted(updateIndicator);
  watch(() => props.modelValue, updateIndicator);
  watch(() => props.tabs, updateIndicator, { deep: true });

  const indicatorStyle = computed(() => ({
    width: `${indicator.value.width}px`,
    transform: `translateX(${indicator.value.left}px)`,
  }));
</script>

<template>
  <div
    class="ui-tabs"
    :class="theme"
  >
    <div
      ref="listRef"
      class="ui-tabs__list"
      role="tablist"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :ref="setTabRef(index)"
        class="ui-tabs__item"
        :class="{ 'is-active': modelValue === tab.value }"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :tabindex="modelValue === tab.value ? 0 : -1"
        @click="select(tab.value)"
      >
        {{ tab.label }}
      </button>

      <span
        class="ui-tabs__indicator"
        :style="indicatorStyle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui-tabs {
    width: 100%;
    position: relative;

    &__list {
      padding-bottom: 10px;
      display: flex;
      position: relative;
      border-bottom: 1px solid var(--tabs-border);
      column-gap: 40px;
      overflow-x: auto;
      @include hide-scroll();
    }

    &__item {
      position: relative;
      background: transparent;
      color: var(--tabs-text);
      font-weight: 500;
      font-size: 15px;
      padding: 5px 0 12px;
      border: none;
      cursor: pointer;
      transition: color 0.25s ease;
      white-space: nowrap;

      &.is-active {
        color: var(--tabs-active);
      }

      &:hover:not(.is-active) {
        color: var(--tabs-hover);
      }
    }

    &__indicator {
      position: absolute;
      bottom: 0;
      height: 2px;
      background: var(--tabs-indicator);
      border-radius: 2px;
      transition:
        transform 0.3s ease,
        width 0.3s ease;
    }

    &.dark {
      --tabs-border: #2a2a2a;
      --tabs-text: #8c8c8c;
      --tabs-hover: #aaa;
      --tabs-active: #fff;
      --tabs-indicator: #888;
    }

    &.light {
      --tabs-border: #dcdcdc;
      --tabs-text: #666;
      --tabs-hover: #333;
      --tabs-active: #000;
      --tabs-indicator: #000;
    }
  }
</style>
