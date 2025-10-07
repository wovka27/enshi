<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useClickOutside } from '@shared/lib/composables/click-outside.ts';

  interface QualityOption {
    label: string;
    value: number;
  }
  interface QualityProps {
    options: QualityOption[];
  }

  const props = defineProps<QualityProps>();
  const model = defineModel<number>();

  const dropdownRef = useClickOutside(() => {
    isOpen.value = false;
  });

  const isOpen = ref(false);

  const currentLabel = computed(() => {
    const found = props.options.find((opt) => opt.value === model.value);
    return found?.label ?? '';
  });

  const selectQuality = (option: QualityOption) => {
    if (option.value !== model.value) model.value = option.value;
    isOpen.value = false;
  };
</script>

<template>
  <div
    v-if="options.length"
    class="quality-selector"
  >
    <button
      class="quality-btn"
      @click.prevent="isOpen = !isOpen"
    >
      {{ currentLabel }}
    </button>

    <transition name="slide-up">
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="quality-dropdown"
      >
        <div class="quality-header">
          <span class="icon">
            <svg
              viewBox="0 0 44 44"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="44.000000"
              height="44.000000"
              fill="none"
            >
              <rect
                id="material-symbols-light:high-quality"
                width="44.000000"
                height="44.000000"
                x="0.000000"
                y="0.000000"
                fill="rgb(255,255,255)"
                fill-opacity="0"
              />
              <path
                id="Vector"
                d="M27.0417 29.6853L28.6642 29.6853L28.6642 26.9353L29.898 26.9353C30.4407 26.9353 30.9051 26.7422 31.2913 26.356C31.6776 25.9697 31.8707 25.5053 31.8707 24.9626L31.8707 19.0391C31.8707 18.4965 31.6776 18.0314 31.2913 17.644C30.9051 17.2577 30.4407 17.0646 29.898 17.0646L25.8078 17.0646C25.2652 17.0646 24.8007 17.2577 24.4145 17.644C24.0271 18.0302 23.8333 18.4946 23.8333 19.0373L23.8333 24.9626C23.8333 25.5053 24.0264 25.9697 24.4127 26.356C24.8001 26.7422 25.2652 26.9353 25.8078 26.9353L27.0417 26.9353L27.0417 29.6853ZM12.1275 26.9353L13.75 26.9353L13.75 23.2686L18.546 23.2686L18.546 26.9353L20.1667 26.9353L20.1667 17.0646L18.5442 17.0646L18.5442 21.648L13.75 21.648L13.75 17.0646L12.1275 17.0646L12.1275 26.9353ZM26.0187 25.3146C25.8781 25.3146 25.7492 25.256 25.6318 25.1386C25.5145 25.0213 25.4558 24.8917 25.4558 24.75L25.4558 19.25C25.4558 19.1094 25.5145 18.9798 25.6318 18.8613C25.7492 18.7427 25.8781 18.6841 26.0187 18.6853L29.6853 18.6853C29.8271 18.6853 29.9567 18.744 30.074 18.8613C30.1913 18.9798 30.25 19.1094 30.25 19.25L30.25 24.75C30.25 24.8917 30.1913 25.0213 30.074 25.1386C29.9567 25.256 29.8271 25.3146 29.6853 25.3146L26.0187 25.3146ZM8.46084 34.8333C7.6175 34.8333 6.91289 34.551 6.347 33.9863C5.78111 33.4216 5.49878 32.7164 5.5 31.8706L5.5 12.1293C5.5 11.2847 5.78295 10.5801 6.34884 10.0155C6.91473 9.45079 7.61873 9.16785 8.46084 9.16663L35.5392 9.16663C36.3825 9.16663 37.0865 9.44957 37.6512 10.0155C38.2158 10.5813 38.4988 11.286 38.5 12.1293L38.5 31.8725C38.5 32.7158 38.2171 33.4204 37.6512 33.9863C37.0853 34.5522 36.3813 34.8345 35.5392 34.8333L8.46084 34.8333Z"
                fill="rgb(22,21,26)"
                fill-rule="nonzero"
              />
            </svg>
          </span>
          Качество
        </div>
        <ul>
          <li
            v-for="option in props.options"
            :key="option.value"
            :class="['quality-option', { active: option.value === model }]"
            @click="selectQuality(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  .quality-selector {
    position: absolute;
    inset: 0;
    height: 100%;
    pointer-events: none;
    display: inline-block;
    z-index: 3;

    &:has(.quality-dropdown) {
      pointer-events: auto;
    }
  }

  .quality-btn {
    pointer-events: auto;
    position: absolute;
    top: 30px;
    right: 30px;
    background: #fff;
    color: #000;
    font-size: 18px;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    border: none;
    font-weight: 500;

    @include mobile-s {
      font-size: 15px;
      padding: 8px 10px;
      top: 20px;
      right: 10px;
    }
  }

  .quality-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
    position: absolute;
    bottom: 0;
    right: fluid(30, 10);
    background: white;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    padding: 8px 0;
    min-width: 238px;
    z-index: 50;

    ul {
      width: 100%;
    }
  }

  .quality-header {
    font-weight: 600;
    padding: 10px;
    color: #444;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    gap: 6px;
    border-bottom: 1px solid var(--color-gray-82-60);
  }

  .quality-option {
    text-align: center;
    width: 100%;
    padding: 8px 12px;
    font-size: 20px;
    cursor: pointer;
    transition: background 0.2s;
    color: var(--color-dark-16);
  }

  .quality-option:hover {
    background: #f5f5f5;
  }

  .quality-option.active {
    color: #aaa;
    pointer-events: none;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all var(--transition-duration) ease-in-out;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }
</style>
