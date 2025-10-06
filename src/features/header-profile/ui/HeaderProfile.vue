<script setup lang="ts">
  import { useUserStore } from '@entities/user/model';

  const userStore = useUserStore();
</script>

<template>
  <router-link
    :to="`/user/${userStore.user?.id}/profile`"
    class="AppHeader__button AppHeader__button--forAuthorized block-container hidden-mobile-s"
  >
    <div class="img-container">
      <UiImage
        :src="userStore.user?.avatar"
        error-src="/images/AvatarExample.png"
      />
    </div>
    <span v-if="userStore.user?.name">{{ userStore.user?.name }}</span>
  </router-link>
</template>

<style lang="scss">
  @use 'sass:color';
  .AppHeader__button {
    flex-shrink: 0;
    display: flex;
    position: relative;
    &--forAuthorized {
      overflow: hidden;
      padding: 0;
      border: none;
      display: flex;
      flex-shrink: 0;

      .img-container {
        position: relative;
        flex-shrink: 0;
        width: 48px;
        height: auto;
        overflow: hidden;
        img {
          width: 100%;
          height: 110%;
          object-fit: cover;
          flex-shrink: 0;
        }
      }

      @include hover {
        background: color.adjust(rgb(31, 30, 35), $lightness: 10%);
        img {
          scale: 1.1;
        }
      }

      img {
        transition: scale 0.2s ease-in-out;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      span {
        @include flex-center();

        padding: 0 20px;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        border-top: 1px solid var(--color-gray-82-20);
        border-right: 1px solid var(--color-gray-82-20);
        border-bottom: 1px solid var(--color-gray-82-20);
        border-radius: 10px;
      }
    }

    &:not(&--forAuthorized, &--noAuthorized) {
      width: 48px;
    }

    height: 48px;
    cursor: pointer;
    outline: none;
    @include flex-center();
    @include hover {
      background: color.adjust(rgb(31, 30, 35), $lightness: 10%);
      &--forAuthorized img {
        scale: 1.1;
      }
    }
    transition: background 0.2s ease-in-out;
  }

  .block-container {
    outline: none;
    border: 1px solid var(--color-gray-82-20);
    border-radius: 10px;
    background: rgb(31, 30, 35);
  }

  @media screen and (max-width: 1200px) {
    .AppHeader__button--forAuthorized {
      span {
        display: none;
      }
    }
  }
</style>
