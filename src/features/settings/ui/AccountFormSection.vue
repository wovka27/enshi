<script setup lang="ts">
  interface IAccountFormSectionProps {
    title: string;
    subtitle: string;
    mb?: boolean;
  }

  defineProps<IAccountFormSectionProps>();
</script>

<template>
  <div
    class="AccountFormSection"
    :class="{ mb }"
  >
    <div class="AccountFormSection__content">
      <p class="AccountFormSection__title">{{ title }}</p>
      <p class="AccountFormSection__subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
  .AccountFormSection {
    display: grid;
    grid-template-columns: fluid(350, 200) 1fr;
    gap: 24px;

    &.mb {
      margin-bottom: fluid(42, 50);
    }
  }

  .AccountFormSection__title {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 4px;
    color: var(--theme-text);
  }

  .AccountFormSection__subtitle {
    font-size: fluid(16, 14);
    color: var(--color-gray-82);
    line-height: 20px;
  }

  @include mobile {
    .AccountFormSection {
      grid-template-columns: 1fr;
    }
  }
</style>
