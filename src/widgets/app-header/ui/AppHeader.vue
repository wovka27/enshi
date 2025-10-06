<script setup lang="ts">
  import { useHideAppHeader } from '@widgets/app-header/lib';
  import HeaderMenu from '@features/header-menu';
  import HeaderProfile from '@features/header-profile';
  import HeaderSearch from '@features/header-search';
  import HeaderThemeButton from '@features/header-theme-button/ui/HeaderThemeButton.vue';

  const { isHidden } = useHideAppHeader();
</script>

<template>
  <header
    class="AppHeader"
    :class="{ isHidden }"
  >
    <div class="AppHeader-inner container AppHeader-flex">
      <div class="AppHeader-flex">
        <HeaderMenu />
        <UiLogoName />
      </div>
      <div class="AppHeader-flex AppHeader-flex--contents">
        <div class="AppHeader-flex">
          <HeaderSearch />
        </div>

        <div class="AppHeader-flex">
          <HeaderThemeButton />
          <UiIconButton
            :size="48"
            icon-name="notification"
          />
          <HeaderProfile />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
  .AppHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    display: flex;
    align-items: center;
    height: var(--header-height);
    border: var(--border) var(--border-color-gray-82-20);
    background-color: var(--color-dark-16);
    transition-duration: var(--transition-duration);
    transition-property: transform;
    border-radius: 0 0 fluid(50, 0) fluid(50, 0);

    &.isHidden:not(html:has(.UiDropdown)) {
      transform: translateY(-100%);
    }
  }
  .AppHeader-inner {
    width: 100%;
    justify-content: space-between;
  }

  .AppHeader-flex {
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    column-gap: fluid(20, 10);
    &--contents {
      display: contents;

      @include mobile {
        display: flex;
      }
    }
  }
</style>
