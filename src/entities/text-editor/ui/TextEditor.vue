<script setup lang="ts">
  import { ref } from 'vue';
  import { useTextEditor } from '@entities/text-editor/model/text-editor.composable.ts';

  interface Props {
    modelValue: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'large',
    placeholder: undefined,
  });
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'upload', files: File[]): void;
    (e: 'insertSmile', smile: string): void;
    (e: 'send'): void;
  }>();

  const { text, onInput, onDropFiles, insertSmile } = useTextEditor({
    initial: props.modelValue,
    onChange: (v) => emit('update:modelValue', v),
    onUpload: (files) => emit('upload', files),
    onInsertSmile: (s) => emit('insertSmile', s),
  });

  const showSmileMenu = ref(false);
  const smiles = ['😀', '😂', '😍', '👍', '🔥', '🎉'];
</script>

<template>
  <div
    class="editor-wrapper"
    :class="size"
    @dragover.prevent
    @drop.prevent="onDropFiles($event)"
  >
    <!--    <button class="btn-icon plus-btn">＋</button>-->

    <textarea
      v-model="text"
      :placeholder="props.placeholder || 'Введите сообщение...'"
      class="editor-input"
      rows="1"
      @input="onInput"
    />

    <!--    <div class="dropdown">-->
    <!--      <button-->
    <!--        class="btn-icon smile-btn"-->
    <!--        @click="showSmileMenu = !showSmileMenu"-->
    <!--      >-->
    <!--        😊-->
    <!--      </button>-->
    <!--      <div-->
    <!--        v-if="showSmileMenu"-->
    <!--        class="dropdown-menu"-->
    <!--      >-->
    <!--        <button-->
    <!--          v-for="s in smiles"-->
    <!--          :key="s"-->
    <!--          class="dropdown-item"-->
    <!--          @click="-->
    <!--            insertSmile(s);-->
    <!--            showSmileMenu = false;-->
    <!--          "-->
    <!--        >-->
    <!--          {{ s }}-->
    <!--        </button>-->
    <!--      </div>-->
    <!--    </div>-->

    <button
      class="btn-icon send-btn"
      @click="emit('send')"
    >
      ➤
    </button>
  </div>
</template>

<style lang="scss">
  .editor-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    background: var(--theme-block-bg);
    border: var(--border) var(--border-color-gray-82-20);
    border-radius: var(--border-radius-20);
    padding: 10px 10px 10px 20px;
    gap: 8px;

    &.small {
      padding: 5px 5px 5px 10px;
    }
    &.medium {
      padding: 10px;
    }
    &.large {
      padding: 10px 10px 10px 20px;
    }
  }

  .editor-input {
    flex: 1;
    resize: none;
    overflow: hidden;
    background: transparent;
    border: none;
    outline: none;
    color: var(--theme-text);
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .btn-icon {
    width: 30px;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--color-gray-82);
    font-size: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 8px 20px;
  }

  .btn-icon:hover {
    background: #2a2a2a;
  }

  .plus-btn {
    color: #aaa;
  }

  .smile-btn {
    font-size: 18px;
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    width: 300px;
    height: 150px;
    position: absolute;
    bottom: 120%;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    background: var(--color-gray-82-60);
    border-radius: 8px;
    padding: 6px;
    z-index: 20;

    button {
      height: max-content;
    }
  }

  .dropdown-item {
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  .dropdown-item:hover {
    transform: scale(1.1);
  }
</style>
