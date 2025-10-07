<script setup lang="ts">
  import type { RouterLinkProps } from 'vue-router';

  type ButtonType = 'outline' | 'primary' | 'success' | 'warning' | 'outline-small' | 'primary-small' | 'danger';

  interface IUiButtonProps {
    btnType: ButtonType;
    type?: HTMLButtonElement['type'];
    to?: RouterLinkProps['to'];
    size?: 'small' | 'medium' | 'large' | 'small-icon' | 'medium-icon' | 'large-icon';
    disabled?: boolean;
    wContent?: boolean;
  }

  withDefaults(defineProps<IUiButtonProps>(), {
    type: undefined,
    to: undefined,
    wContent: false,
    size: 'medium',
  });
</script>

<template>
  <router-link
    v-if="to"
    v-bind="$attrs"
    class="UIButton"
    :class="[btnType, { 'w-content': wContent }]"
    :to="to || ''"
    :disabled="disabled"
  >
    <slot />
  </router-link>
  <button
    v-else
    v-bind="$attrs"
    :type="type"
    class="UIButton"
    :class="[btnType, size, { 'w-content': wContent }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss">
  @property --color-gradient-start {
    syntax: '<color>';
    inherits: false;
    initial-value: rgba(140, 83, 253, 1);
  }
  @property --color-gradient-end {
    syntax: '<color>';
    inherits: false;
    initial-value: rgba(83.55731964111328, 49.53755187988281, 151, 1);
  }

  @property --color-gradient-alpha {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }

  .UIButton {
    flex-shrink: 0;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
    font: inherit;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 5px;
    width: 100%;
    font-size: fluid(16, 14);
    line-height: 135%;
    padding: fluid(12, 11) 24px;
    transition:
      --color-gradient-start 0.2s,
      --color-gradient-end 0.2s,
      --color-gradient-alpha 0.2s;

    &.small {
      padding: 4px 16px;
    }

    &.small-icon {
      padding: 4px;
    }

    &.medium {
      padding: fluid(12, 11) 24px;
    }

    &.medium-icon {
      padding: fluid(12, 11);
    }

    &.large {
      padding: fluid(18, 14) 28px;
    }

    &.large-icon {
      padding: fluid(18, 14);
    }

    &.w-content {
      width: max-content;
    }

    &.outline-small {
      color: var(--color-white);
      flex-shrink: 0;
      background-color: var(--color-dark-1f);
      border: var(--border) var(--color-gray-82-20);
      border-radius: var(--border-radius-10);
      transition-property: border-color, color;

      @include hover {
        border-color: var(--color-gray-82);
        color: var(--color-white-40);
      }
      font-size: fluid(14, 12);
    }

    &.primary-small {
      border: 0.5px solid rgba(255, 255, 255, 0.8);
      background: linear-gradient(90deg, rgba(140, 83, 253, 1), rgba(83.55731964111328, 49.53755187988281, 151, 1) 70%);
      @include hover {
        background-color: rgb(146, 94, 248);
      }
      padding: fluid(10, 8) 18px;
      font-size: fluid(14, 12);
    }

    &.danger {
      border: 0.5px solid rgba(255, 255, 255, 0.8);
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, calc(0.3 * var(--color-gradient-alpha))) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(90deg, rgba(244, 67, 54, 1), rgba(183, 28, 28, 1) 70%);

      @include hover {
        --color-gradient-start: rgba(183, 28, 28, 1);
        --color-gradient-end: rgba(244, 67, 54, 1);
        --color-gradient-alpha: 1;
      }
    }

    &.primary {
      border: 0.5px solid rgba(255, 255, 255, 0.8);
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, calc(0.3 * var(--color-gradient-alpha))) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-end) 70%);

      @include hover {
        --color-gradient-start: var(--color-gradient-end);
        --color-gradient-end: var(--color-gradient-start);
        --color-gradient-alpha: 1;
      }
    }

    &.success {
      border: 0.5px solid rgba(255, 255, 255, 0.8);
      background:
        radial-gradient(
          100% 100% at 50% 0%,
          rgba(255, 255, 255, calc(0.3 * var(--color-gradient-alpha))) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(90deg, rgba(67, 210, 119, 1), rgba(29, 155, 84, 1) 70%);

      @include hover {
        --color-gradient-start: rgba(29, 155, 84, 1);
        --color-gradient-end: rgba(67, 210, 119, 1);
        --color-gradient-alpha: 1;
      }
    }

    &.outline {
      color: var(--theme-text);
      flex-shrink: 0;
      background-color: var(--theme-block-bg);
      border: var(--border) var(--color-gray-82-20);
      border-radius: var(--border-radius-10);
      transition-property: border-color, color;

      @include hover {
        border-color: var(--color-gray-82);
      }
    }

    &:disabled {
      pointer-events: none;
      background:
        radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(0deg, rgba(71, 70, 75, 0.6), rgba(71, 70, 75, 0.6));
    }
  }
</style>
