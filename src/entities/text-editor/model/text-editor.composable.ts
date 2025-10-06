import { ref, nextTick } from 'vue';
import { autoResize } from '../lib/autoResize';

interface UseTextEditorParams {
  initial: string;
  onChange: (v: string) => void;
  onUpload: (files: File[]) => void;
  onInsertSmile: (smile: string) => void;
}

export function useTextEditor(params: UseTextEditorParams) {
  const text = ref(params.initial);

  const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    text.value = target.value;
    params.onChange(text.value);
    autoResize(target);
  };

  const onDropFiles = (e: DragEvent) => {
    if (e.dataTransfer?.files.length) {
      params.onUpload(Array.from(e.dataTransfer.files));
    }
  };

  const insertSmile = async (s: string) => {
    text.value += s;
    params.onInsertSmile(s);
    await nextTick(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) autoResize(textarea);
    });
  };

  return {
    text,
    onInput,
    onDropFiles,
    insertSmile,
  };
}
