<script setup lang="ts">
  import { computed } from 'vue';

  interface IUiSectionProps {
    title: string;
    id?: string;
    classContent?: string;
  }

  const props = defineProps<IUiSectionProps>();

  const idForAccessibility = computed(() => (props.id ? `title-${props.id}` : undefined));
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="idForAccessibility"
    class="UiSection"
  >
    <div class="UiSection__header container">
      <h2
        :id="idForAccessibility"
        class="UiSection__headerH2"
      >
        {{ title }}
      </h2>
      <slot name="header" />
    </div>
    <div class="UiSection__content container">
      <div
        class="UiSection__content-inner"
        :class="classContent"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .UiSection {
    padding-bottom: fluid(120, 60);
  }

  .UiSection__content-inner {
    max-height: max-content;
  }

  .UiSection__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
  }

  .UiSection__headerH2 {
    color: var(--theme-text);
    font-size: fluid(22, 18);
    font-weight: var(--font-weight-700);
    line-height: fluid(28, 22);
  }

  .UiSection__content {
    @include hide-scroll();

    width: 100%;
    margin-top: fluid(38, 15);
  }
</style>
