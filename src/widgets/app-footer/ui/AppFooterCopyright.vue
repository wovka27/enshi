<template>
  <p class="AppFooter__copyright">&copy; 2022&nbsp;&mdash; {{ new Date().getFullYear() }}</p>
</template>

<style lang="scss">
  .AppFooter__copyright {
    color: var(--color-gray-82);
    font-weight: var(--font-weight-600);
    line-height: 20px;
  }
</style>
