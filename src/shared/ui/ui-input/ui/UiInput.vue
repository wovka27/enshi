<script setup lang="ts">
  import { computed } from 'vue';
  import type { IconTypeName } from '@shared/ui/ui-icon/model';

  interface Props {
    type?: 'text' | 'email' | 'number' | 'phone' | 'date' | 'search' | 'password' | 'textarea';
    label?: string;
    placeholder?: string;
    icon?: IconTypeName;
    error?: string | string[] | null;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    error: null,
    disabled: false,
    label: undefined,
    icon: undefined,
  });

  const emit = defineEmits<{
    (event: 'onInput', value: Event): void;
    (event: 'onBlur'): void;
  }>();

  const model = defineModel<string | number | null>({
    default: null,
  });

  const isInvalid = computed(() => Boolean(props.error));
</script>

<template>
  <div
    class="ui-input"
    :class="{ 'ui-input--error': isInvalid, 'ui-input--disabled': disabled }"
  >
    <label
      v-if="label"
      class="ui-input__label"
    >
      {{ label }}
    </label>

    <div class="ui-input__wrapper">
      <UiIcon
        v-if="icon"
        :name="icon"
        width="24"
        class="ui-input__icon"
      />

      <template v-if="type === 'textarea'">
        <textarea
          v-model="model"
          class="ui-input__field"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="emit('onInput', $event)"
          @blur="emit('onBlur')"
        />
      </template>

      <template v-else>
        <input
          v-model="model"
          class="ui-input__field"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="modelValue ?? ''"
          v-bind="$attrs"
          @input="emit('onInput', $event)"
          @blur="emit('onBlur')"
        />
      </template>
    </div>

    <template v-if="error">
      <template v-if="Array.isArray(error) && error.length">
        <p
          v-for="err in error"
          :key="err"
          class="ui-input__error"
        >
          {{ err }}
        </p>
      </template>
      <p
        v-else
        class="ui-input__error"
      >
        {{ error }}
      </p>
    </template>
  </div>
</template>

<style lang="scss">
  .ui-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    transition-duration: var(--transition-duration);
    transition-property: border-color;

    caret-color: var(--color-purple-8c);
    @include hover {
      .ui-input__wrapper {
        border-color: var(--color-purple-8c);
      }
    }

    &:has(input:focus) {
      .ui-input__wrapper {
        border-color: var(--color-purple-8c);
      }
    }

    &__label {
      font-size: 14px;
      margin-bottom: 6px;
      color: #aaa;
    }

    &__wrapper {
      position: relative;
      font-size: 20px;
      display: flex;
      align-items: center;
      background: #1b1b1d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--border-radius-20);
      padding: 5px 20px;
      transition: border var(--transition-duration) ease;
    }

    &__icon {
      margin-right: 8px;
      flex-shrink: 0;
      color: var(--color-gray-82);
    }

    &__field {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 15px;
      padding: 12px 0;

      &::placeholder {
        color: var(--color-gray-82);
      }
    }

    textarea.ui-input__field {
      resize: none;
      min-height: 80px;
      line-height: 1.4;
    }

    &__error {
      margin-top: 4px;
      font-size: 13px;
      color: #ff4d4f;
    }

    &--error {
      .ui-input__wrapper {
        border-color: #ff4d4f;
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
