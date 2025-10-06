<script setup lang="ts">
  import { computed } from 'vue';
  import type { IAnimeMetaItem } from '@entities/anime-meta/model';

  interface IAnimeMetaProps {
    data: Record<string, string | number> | null;
    size?: 'small' | 'medium' | 'large';
  }

  const props = withDefaults(defineProps<IAnimeMetaProps>(), {
    size: 'small',
  });

  const items = computed<(IAnimeMetaItem | null)[]>(() => {
    if (!props.data) return [];

    return Object.entries(props.data)
      .map(([k, v]) => (k && v ? { label: k, value: v } : null))
      .filter(Boolean);
  });
</script>

<template>
  <div
    v-if="items.length"
    class="AnimeMeta"
    :class="`AnimeMeta--${size}`"
  >
    <template
      v-for="(item, index) of items"
      :key="index"
    >
      <p
        v-if="item"
        class="AnimeMeta__text"
      >
        <span class="AnimeMeta__text-label">{{ item.label }}:</span>
        &nbsp;
        <span class="AnimeMeta__text-value">{{ item.value }}</span>
      </p>
    </template>
  </div>
</template>

<style lang="scss">
  .AnimeMeta {
    display: flex;
    flex-wrap: nowrap;
    font-size: var(--fz, 16px);
    gap: 16px var(--gap, 25px);

    &--medium {
      --gap: 30px;
    }

    &--large {
      --gap: 50px;
      --fz: 18px;
    }
  }

  .AnimeMeta__text {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
  }

  .AnimeMeta__text-label {
    color: var(--color-gray-9b);
  }
  .AnimeMeta__text-value {
    color: var(--theme-text);
    display: -webkit-box;
    white-space: nowrap;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: horizontal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
