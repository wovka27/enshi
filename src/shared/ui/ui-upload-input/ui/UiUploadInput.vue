<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits<{
    (event: 'file', value: File): void;
  }>();
  const input_ref = ref<HTMLInputElement>();
  const handleInput = (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];

    if (file) emit('file', file);
  };
  const click = () => input_ref.value?.click();
</script>

<template>
  <div
    class="UIUploadInput"
    @click="click"
  >
    <input
      ref="input_ref"
      type="file"
      @change="handleInput"
    />
    <svg
      width="44.000000"
      height="44.000000"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip205_996">
          <rect
            id="material-symbols:download-rounded"
            rx="-0.500000"
            width="27.000000"
            height="27.000000"
            transform="translate(8.500000 8.500000)"
            fill="white"
            fill-opacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="Frame_22860"
        rx="9.500000"
        width="43.000000"
        height="43.000000"
        transform="translate(0.500000 0.500000)"
        fill="#1F1E23"
        fill-opacity="1.000000"
      />
      <rect
        id="material-symbols:download-rounded"
        rx="-0.500000"
        width="27.000000"
        height="27.000000"
        transform="translate(8.500000 8.500000)"
        fill="#FFFFFF"
        fill-opacity="0"
      />
      <g clip-path="url(#clip205_996)">
        <path
          id="Vector"
          d="M22 26.17C21.84 26.17 21.69 26.14 21.56 26.09C21.42 26.05 21.29 25.96 21.18 25.85L16.98 21.65C16.75 21.41 16.63 21.14 16.64 20.83C16.65 20.52 16.76 20.25 16.98 20.01C17.21 19.78 17.49 19.66 17.81 19.65C18.13 19.64 18.41 19.75 18.64 19.98L20.83 22.17L20.83 13.83C20.83 13.5 20.94 13.22 21.16 13C21.39 12.77 21.66 12.66 22 12.66C22.33 12.66 22.6 12.77 22.83 13C23.05 13.22 23.16 13.5 23.16 13.83L23.16 22.17L25.35 19.98C25.58 19.75 25.86 19.64 26.18 19.65C26.5 19.66 26.78 19.78 27.01 20.01C27.23 20.25 27.34 20.52 27.35 20.83C27.36 21.14 27.25 21.41 27.01 21.65L22.81 25.85C22.69 25.96 22.57 26.04 22.43 26.09C22.3 26.14 22.15 26.17 22 26.17ZM15 31.33C14.35 31.33 13.8 31.1 13.35 30.64C12.89 30.19 12.66 29.64 12.66 29L12.66 26.66C12.66 26.33 12.77 26.05 13 25.83C13.22 25.61 13.5 25.5 13.83 25.5C14.16 25.49 14.43 25.61 14.66 25.83C14.88 26.06 15 26.33 15 26.66L15 29L29 29L29 26.66C29 26.33 29.11 26.05 29.33 25.83C29.55 25.61 29.83 25.5 30.16 25.5C30.49 25.49 30.77 25.61 30.99 25.83C31.22 26.06 31.33 26.33 31.33 26.66L31.33 29C31.33 29.64 31.1 30.19 30.64 30.64C30.19 31.1 29.64 31.33 29 31.33L15 31.33Z"
          fill="#FFFFFF"
          fill-opacity="1.000000"
          fill-rule="nonzero"
        />
      </g>
      <rect
        id="Frame_22860"
        rx="9.500000"
        width="43.000000"
        height="43.000000"
        transform="translate(0.500000 0.500000)"
        stroke="#828282"
        stroke-opacity="0.200000"
        stroke-width="1.000000"
      />
    </svg>
  </div>
</template>

<style lang="scss">
  .UIUploadInput {
    width: fluid(52, 44);
    height: fluid(52, 44);
    max-height: max-content;
    cursor: pointer;

    input {
      display: none;
    }

    @include hover {
      input + svg #Frame_22860 {
        stroke: #fff;
      }
    }

    svg rect {
      transition: all 0.2s ease-in-out;
    }
  }
</style>
