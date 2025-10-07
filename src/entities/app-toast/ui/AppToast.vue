<script setup lang="ts">
  import { type ToastWithMeta, useToastStore } from '@entities/app-toast/model';

  const toastStore = useToastStore();

  const handleClose = (id: number) => {
    toastStore.deleteItemById(id);
  };
  const handlePause = (toast: ToastWithMeta) => {
    toastStore.pauseTimer(toast);
  };
  const handleResume = (toast: ToastWithMeta) => {
    toastStore.resumeTimer(toast);
  };
</script>

<template>
  <div
    v-if="toastStore.list.length"
    class="AppToast__container"
  >
    <div class="AppToast__innerWrap">
      <transition-group
        name="slide-fade"
        appear
        tag="div"
      >
        <div
          v-for="toast in toastStore.list"
          :key="toast.id"
          class="AppToast"
          :data-type="toast.type"
          @mouseenter="handlePause(toast)"
          @mouseleave="handleResume(toast)"
        >
          <div class="AppToast__img">
            <img
              width="28"
              height="28"
              src="/icons/icon_enshi_logo.svg"
              alt="logo"
            />
          </div>

          <div class="AppToast__content">
            <h4 class="AppToast__title">{{ toast.title }}</h4>
            <p class="AppToast__text">{{ toast.text }}</p>
          </div>

          <svg
            class="AppToast__close"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            @click="handleClose(toast.id)"
          >
            <path
              d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
              fill="#FFF"
            />
          </svg>

          <!-- Progress bar -->
          <div class="AppToast__progress">
            <div
              class="AppToast__progressFill"
              :style="{
                animationDuration: (toast.timeout ?? 3000) + 'ms',
                animationPlayState: toast._meta.timer ? 'running' : 'paused',
              }"
            ></div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
  .AppToast {
    width: 300px;
    border-radius: 10px;
    padding: 15px 20px 25px; // место под прогресс
    margin-bottom: 10px;
    position: relative;
    display: flex;
    gap: 10px;
    background: #1f1e23ff;
    transition: all 0.4s ease;

    &[data-type='success'] {
      background: linear-gradient(to bottom right, #23d47d, #1cba6e);
    }
    &[data-type='error'] {
      background: linear-gradient(to bottom right, #f14a58, #e32636);
    }
    &[data-type='warning'] {
      background: linear-gradient(to bottom right, #ffb733, #ffa500);
    }
    &[data-type='info'] {
      background: linear-gradient(to bottom right, #3b3a40, #1f1e23ff);
    }
  }

  .AppToast__img {
    flex-shrink: 0;
  }

  .AppToast__close {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
  }

  .AppToast__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: rgba(255, 255, 255, 0.15);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
  }

  .AppToast__title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .AppToast__text {
    font-weight: 400;
    font-size: 12px;
  }

  .AppToast__container {
    overflow-y: auto;
    @include hide-scroll();
    position: fixed;
    z-index: 9999;
    transition: all 200ms ease-in-out;

    top: 0;
    right: 0;
    padding: 20px;
    z-index: 9999;
  }

  .AppToast__progressFill {
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    animation-name: shrink;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
</style>
