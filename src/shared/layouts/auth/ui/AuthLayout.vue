<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import ReleaseTodayPosterBg from '@entities/release-today/ui/ReleaseTodayPosterBg.vue';

  const router = useRouter();

  const imgMap = {
    login: '/images/auth/login.png',
    register: '/images/auth/recovery.png',
    recovery: '/images/auth/recovery.png',
    enter_code: '/images/auth/enter_code.png',
    change_pass: '/images/auth/change_pass.png',
  };

  const bgImgSrc = computed(() => imgMap[router.currentRoute.value.meta.bgImg as keyof typeof imgMap]);

  const formContent = computed(() => {
    const meta = router.currentRoute.value.meta;

    return {
      title: meta.authContent?.title,
      subtitle: meta.authContent?.subtitle,
    };
  });
</script>

<template>
  <section class="AuthLayout">
    <div class="AuthLayout__left">
      <UiImage
        class="AuthLayout__img"
        :src="bgImgSrc"
      />
    </div>
    <div class="AuthLayout__right">
      <div class="AuthLayout__content">
        <UiLogo
          color="purple"
          :size="6"
        />
        <div class="AuthLayout__content-title">
          <h1 class="AuthLayout__title">{{ formContent.title }}</h1>
          <h2
            v-if="formContent.title"
            class="AuthLayout__subtitle"
          >
            {{ formContent.subtitle }}
          </h2>
        </div>
        <div class="AuthLayout__body">
          <router-view />
        </div>
      </div>
      <ReleaseTodayPosterBg class="AuthLayout__bg" />
    </div>

    <UiIconButton
      :size="40"
      class="AuthLayout__home"
      icon-name="home"
      @click="router.push('/')"
    />
  </section>
</template>

<style lang="scss">
  .AuthLayout {
    background-color: var(--color-dark-1f);
    position: relative;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .AuthLayout__body {
    @include hide-scroll();

    min-width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .AuthLayout__right {
    @include flex-center();

    background-color: inherit;
    position: relative;
    overflow: hidden;

    padding: 30px 30px 20px;
  }

  .AuthLayout__left {
    background-color: inherit;
    position: relative;
    display: flex;

    @include mobile {
      display: none;
    }
  }

  .AuthLayout__content {
    height: 100%;
    width: 500px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition-duration: 1s;
    transition-property: opacity;
    will-change: opacity;
    opacity: 1;
    @starting-style {
      opacity: 0;
    }

    row-gap: 40px;
  }

  .AuthLayout__content-title {
    text-align: center;
  }

  .AuthLayout__title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .AuthLayout__subtitle {
    color: var(--color-gray-82);
    font-size: 18px;
    font-weight: 500;
  }

  .AuthLayout__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .AuthLayout__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -30%;
  }

  .AuthLayout__home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    @include mobile {
      display: none;
    }
  }
</style>
