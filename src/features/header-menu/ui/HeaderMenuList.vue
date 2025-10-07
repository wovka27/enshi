<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { menuRegistry } from '@features/header-menu/config';
  import { useThemeStore } from '@entities/theme/model';
  import { useUserStore } from '@entities/user/model';

  defineEmits<{
    (event: 'clickItem'): void;
  }>();

  const router = useRouter();
  const userStore = useUserStore();
  const themeStore = useThemeStore();

  const list = computed(() => (userStore.token ? menuRegistry.authenticated : menuRegistry.unauthenticated));

  const logout = () => {
    userStore.logout();
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.value.fullPath },
    });
  };
</script>

<template>
  <ul class="HeaderMenuList">
    <li
      v-for="(item, index) of list"
      :key="index"
      class="HeaderMenuItem"
      :class="{ 'visible-mobile-s': !!item.visibledMobile }"
    >
      <router-link
        :to="item.path"
        @click="$emit('clickItem')"
      >
        {{ item.label }}
      </router-link>
    </li>
    <!--    <li-->
    <!--      v-if="userStore.user && userStore.token"-->
    <!--      class="HeaderMenuItem HeaderMenuItem&#45;&#45;theme"-->
    <!--      @click="logout"-->
    <!--    >-->
    <!--      Выйти-->
    <!--    </li>-->
    <li
      class="HeaderMenuItem HeaderMenuItem--theme visible-mobile-s"
      @click="themeStore.changeTheme"
    >
      <UiIcon
        :width="20"
        :name="themeStore.themeIconName"
      />
      Тема: {{ themeStore.themeText }}
    </li>
  </ul>
</template>

<style lang="scss">
  .HeaderMenuList {
    display: flex;
    flex-direction: column;
    background-color: var(--color-dark-1f-60);
    user-select: none;
  }
  .HeaderMenuItem {
    cursor: pointer;
    width: 100%;
    font-size: fluid(18, 16);
    font-weight: var(--font-weight-semi-bold);
    letter-spacing: var(--letter-spacing-002);
    transition: background-color var(--transition-duration) ease-in-out;

    &:not(:last-child) {
      border-bottom: var(--border) var(--color-dark-34);
    }

    a {
      width: 100%;
      height: 100%;
      display: inline-block;
      padding: 16px 0;
      text-align: center;
    }

    &--theme {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      padding: 16px 0;
    }

    @include hover {
      background-color: var(--color-dark-34);
    }
  }
</style>
