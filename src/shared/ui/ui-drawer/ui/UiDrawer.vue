<script setup lang="ts">
  import { computed, watch, watchEffect } from 'vue';
  import { useDrawerStore } from '@shared/ui/ui-drawer/model';

  const drawerStore = useDrawerStore();

  const drawerClasses = computed(() => [
    `ui-drawer--${drawerStore.side || 'right'}`,
    { 'ui-drawer--open': drawerStore.isOpen },
  ]);

  watch(
    () => drawerStore.isOpen,
    (v) => {
      document.documentElement.style.overflow = !v ? 'auto' : 'hidden';
    }
  );
</script>

<template>
  <teleport
    to="body"
    defer
  >
    <div
      class="ui-drawer-wrapper"
      :class="{ 'is-open': drawerStore.isOpen }"
    >
      <div
        v-if="drawerStore.overlay"
        class="ui-drawer__overlay"
        :class="{ 'ui-drawer__overlay--active': drawerStore.isOpen }"
        @click="drawerStore.closeOnOverlay && drawerStore.close()"
      ></div>

      <aside
        class="ui-drawer"
        :class="drawerClasses"
        :style="{ width: drawerStore.width }"
        role="note"
      >
        <header class="ui-drawer__header">
          <UiIconButton
            class="ui-drawer__close"
            icon-name="close"
            :size="40"
            @click="drawerStore.close"
          />
        </header>

        <main class="ui-drawer__body">
          <router-view name="drawer" />
        </main>
      </aside>
    </div>
  </teleport>
</template>

<style lang="scss">
  .ui-drawer-wrapper {
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;

    &.is-open {
      opacity: 1;
    }
  }

  .ui-drawer__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity var(--transition-duration) ease-in-out;
    pointer-events: none;

    &--active {
      pointer-events: auto;
      opacity: 1;
    }
  }

  .ui-drawer {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-dark-1f);
    max-width: 100%;
    height: 100%;
    transform: translateX(100%);
    transition: transform var(--transition-duration) ease;
    pointer-events: auto;
    display: flex;
    flex-direction: column;

    border: var(--border) var(--border-color-gray-82-20);

    &--left {
      left: 0;
      transform: translateX(-100%);
    }

    &--right {
      right: 0;
      transform: translateX(100%);
    }

    &--open.ui-drawer--left {
      transform: translateX(0);
    }
    &--open.ui-drawer--right {
      transform: translateX(0);
    }

    &__header,
    &__footer {
      padding: 1rem;
      flex-shrink: 0;
    }

    &__body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    &__close {
      float: right;
    }
  }

  @include mobile {
    .ui-drawer {
      width: 100% !important;
    }
  }
</style>
