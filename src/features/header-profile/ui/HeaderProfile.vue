<script setup lang="ts">
  import { useAuthStore } from '@entities/auth/model/auth.store.ts';
  import { useUserStore } from '@entities/user/model';

  const userStore = useUserStore();
  const authStore = useAuthStore();
</script>

<template>
  <router-link
    v-if="authStore.isAuthenticated"
    :to="`/user/${userStore.localUser?.id}/profile`"
    class="HeaderProfile hidden-mobile-s"
  >
    <div class="HeaderProfile__img-container">
      <UiImage
        width="48"
        height="48"
        :src="userStore.localUser?.avatar"
        error-src="/images/AvatarExample.png"
      />
    </div>
    <span
      v-if="userStore.localUser?.name"
      class="HeaderProfile__name"
    >
      {{ userStore.localUser?.name }}
    </span>
  </router-link>
  <UiButton
    v-else
    :to="{ name: 'login' }"
    btn-type="outline-small"
    w-content
  >
    Войти
  </UiButton>
</template>

<style lang="scss">
  .HeaderProfile {
    border: 1px solid var(--color-gray-82-20);
    border-radius: 10px;
    background: var(--color-dark-1f);
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    font-size: 16px;
    font-weight: var(--font-weight-600);
    align-items: center;
    &__name {
      padding: 10px 20px;
      flex: 1;
    }

    @include hover {
      border-color: var(--color-gray-82);
    }

    @media screen and (max-width: 900px) {
      & {
        &__name {
          display: none;
        }
      }
    }
  }
</style>
