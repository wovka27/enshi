<script setup lang="ts">
  import { ref, toRef, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

  interface IUITextCollapseProps {
    text?: string | null | undefined;
    hiddenBtn?: boolean;
  }

  const props = defineProps<IUITextCollapseProps>();
  const text = toRef(props, 'text');
  const hiddenBtn = toRef(props, 'hiddenBtn');

  const is_show = ref(false);
  const text_ref = ref<HTMLParagraphElement | null>(null);
  const showToggle = ref(false);
  let ro: ResizeObserver | null = null;

  function getLineHeight(el: HTMLElement): number {
    const cs = getComputedStyle(el);
    const lineHeight = cs.lineHeight;
    const fontSize = parseFloat(cs.fontSize) || 16;

    if (!lineHeight || lineHeight === 'normal') {
      return fontSize * 1.2; // fallback
    }

    // "25px" or "1.5"
    if (lineHeight.endsWith('px')) {
      return parseFloat(lineHeight);
    }

    const num = parseFloat(lineHeight);
    if (!Number.isNaN(num)) {
      // value like 1.5 -> multiply by fontSize
      return num * fontSize;
    }

    return fontSize * 1.2;
  }

  async function updateToggleVisibility() {
    await nextTick();

    const el = text_ref.value;
    const txt = (text.value ?? '').toString().trim();

    if (!el || !txt || txt === 'null') {
      showToggle.value = false;
      return;
    }

    const lineHeight = getLineHeight(el) || 1;
    const fullHeight = el.scrollHeight; // full content height even if clamped
    const lines = Math.round(fullHeight / lineHeight);

    showToggle.value = lines > 3;
  }

  onMounted(() => {
    updateToggleVisibility();

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateToggleVisibility();
      });
      if (text_ref.value) ro.observe(text_ref.value);
    } else {
      window.addEventListener('resize', updateToggleVisibility);
    }
  });

  onBeforeUnmount(() => {
    if (ro && text_ref.value) ro.unobserve(text_ref.value);
    window.removeEventListener('resize', updateToggleVisibility);
  });

  watch(text, () => {
    // если текст меняется — пересчитать
    updateToggleVisibility();
  });
</script>

<template>
  <div class="UITextCollapse">
    <p
      ref="text_ref"
      class="UITextCollapse__p"
      :class="{ is_show: is_show }"
    >
      {{ (text !== 'null' && text) || 'Описание отсутствует' }}
    </p>

    <div class="UITextCollapse__btn">
      <div>
        <slot />
      </div>

      <div
        v-if="showToggle && !hiddenBtn"
        @click="is_show = !is_show"
      >
        {{ is_show ? 'Свернуть' : 'Развернуть' }}&nbsp;&nbsp;
        <svg
          width="9.003906"
          :class="{ is_show: is_show }"
          height="4.587891"
          viewBox="0 0 9.00391 4.58789"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- svg paths -->
          <path
            d="M8.82 0.85L8.85 0.85C9.05 0.65 9.05 0.34 8.85 0.14C8.65 -0.05 8.34 -0.05 8.14 0.14L8.14 0.17L8.82 0.85Z"
            fill="#6E6E6E"
          />
          <path
            d="M8.14 0.14L4.85 3.44Q4.7 3.58 4.5 3.58Q4.29 3.58 4.14 3.44L0.85 0.14L0.14 0.85L3.44 4.14Q3.65 4.36 3.93 4.47Q4.2 4.58 4.5 4.58Q4.79 4.58 5.06 4.47Q5.34 4.36 5.56 4.14L8.85 0.85L8.14 0.14Z"
            fill="#6E6E6E"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .UITextCollapse {
    display: flex;
    min-height: 40px;
    position: relative;
    flex-direction: column;
    gap: fluid(20, 9.5);
    max-width: fluid(684, 346);
  }

  .UITextCollapse__p {
    color: var(--theme-text);
    font-size: fluid(16, 12);
    line-height: fluid(25, 18.75);
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    &.is_show {
      /* при разворачивании — показываем весь текст */
      -webkit-line-clamp: unset;
      overflow: visible;
      display: block;
    }
  }

  .UITextCollapse__btn {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    text-align: right;
    color: rgb(110, 110, 110);
    font-weight: 600;
    font-size: fluid(14, 10);
    cursor: pointer;

    svg {
      transition: transform 0.18s ease;
      &.is_show {
        transform: rotate(180deg);
      }
    }
  }

  @media screen and (max-width: 900px) {
    .UITextCollapse__p {
      line-clamp: 4;
      -webkit-line-clamp: 4;
    }
    .UITextCollapse__btn {
      text-align: left;
    }
  }
</style>
