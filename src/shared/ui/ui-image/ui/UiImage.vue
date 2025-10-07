<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const props = withDefaults(defineProps<{ src?: string; errorSrc?: string }>(), {
    errorSrc: '/images/img.png',
    src: '',
  });

  const is_loading_img = ref<boolean>(true);
  const is_error_img = ref<boolean>(false);
  const image = reactive(new Image());

  const load = async () => {
    if (!image.complete) {
      is_error_img.value = true;
    }
    is_loading_img.value = false;
  };

  const error = () => {
    is_loading_img.value = false;
    is_error_img.value = true;
  };

  image.src = props.src;
  image.onload = load;
  image.onerror = error;
</script>

<template>
  <div
    v-if="is_loading_img"
    class="skeleton-animation"
  ></div>
  <img
    v-if="is_error_img || !src"
    :src="errorSrc"
    draggable="false"
    v-bind="$attrs"
  />
  <img
    v-else
    :src="src"
    draggable="false"
    v-bind="$attrs"
  />
</template>

<style>
  .skeleton-animation {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(90deg, #222222, #333333, #222222);
    background-size: 200% 100%;
    animation: moveRight 1.5s infinite;
  }
</style>
