<script setup lang="ts">
  import { useId } from 'vue';

  interface Props {
    label?: string | number;
    value?: string | number;
    checked?: boolean;
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'change', value: boolean): void;
  }>();

  const id = `checkbox-${useId()}`;

  const model = defineModel({
    get: (v) => v ?? props.checked ?? false,
    set: (val: boolean) => {
      emit('change', val);
    },
  });
</script>

<template>
  <div class="UICheckbox">
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      :value="value"
      :disabled="disabled"
      :checked="checked"
      class="UICheckbox__input"
    />
    <label
      :for="id"
      class="UICheckbox__label"
    >
      <span class="UICheckbox__box"></span>
      <span
        v-if="label"
        class="UICheckbox__text"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style lang="scss">
  .UICheckbox {
    font-size: 14px;
    display: inline-flex;
    align-items: center;

    &__input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    &__label {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    &__box {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      border: 1px solid #3c3c3c;
      border-radius: 4px;
      background: #1f1e23;
      position: relative;
      transition:
        background 0.2s,
        border 0.2s;
    }

    &__input:checked + .UICheckbox__label .UICheckbox__box {
      background: #1cba6e
        url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMTczLjg5OCA0MzkuNDA0LTE2Ni40LTE2Ni40Yy05Ljk5Ny05Ljk5Ny05Ljk5Ny0yNi4yMDYgMC0zNi4yMDRsMzYuMjAzLTM2LjIwNGM5Ljk5Ny05Ljk5OCAyNi4yMDctOS45OTggMzYuMjA0IDBMMTkyIDMxMi42OSA0MzIuMDk1IDcyLjU5NmM5Ljk5Ny05Ljk5NyAyNi4yMDctOS45OTcgMzYuMjA0IDBsMzYuMjAzIDM2LjIwNGM5Ljk5NyA5Ljk5NyA5Ljk5NyAyNi4yMDYgMCAzNi4yMDRsLTI5NC40IDI5NC40MDFjLTkuOTk4IDkuOTk3LTI2LjIwNyA5Ljk5Ny0zNi4yMDQtLjAwMXoiLz48L3N2Zz4=)
        no-repeat 50%;
      background-size: 12px 12px;
      border-color: #1cba6e;
    }

    &__input:disabled + .UICheckbox__label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>
