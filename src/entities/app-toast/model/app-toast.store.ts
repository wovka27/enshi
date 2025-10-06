import { defineStore } from 'pinia';
import type { IToastItem } from '@entities/app-toast/model/types.ts';

interface ToastMeta {
  timer: ReturnType<typeof setTimeout> | null;
  remaining: number;
  start: number;
  progress: number; // 0 → 100 (% жизни)
}

export interface ToastWithMeta extends IToastItem {
  id: string;
  _meta: ToastMeta;
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    list: [] as ToastWithMeta[],
  }),

  actions: {
    add(options: IToastItem) {
      const timeout = options.timeout ?? 3000;

      const toast: ToastWithMeta = {
        ...options,
        id: crypto.randomUUID(),
        _meta: {
          timer: null,
          remaining: timeout,
          start: Date.now(),
          progress: 100,
        },
      };

      this.list.push(toast);
      this.startTimer(toast);
      this.trackProgress(toast);
    },

    remove() {
      const toast = this.list[0];
      if (toast) this._clear(toast);
      this.list.shift();
    },

    deleteItemById(id: string) {
      const index = this.list.findIndex((t) => t.id === id);
      if (index !== -1) {
        const toast = this.list[index];
        this._clear(toast);
        // анимация leave
        setTimeout(() => this.list.splice(index, 1), 200);
      }
    },

    startTimer(toast: ToastWithMeta) {
      if (toast._meta.timer) clearTimeout(toast._meta.timer);

      toast._meta.start = Date.now();
      toast._meta.timer = setTimeout(() => {
        this.deleteItemById(toast.id);
      }, toast._meta.remaining);
    },

    pauseTimer(toast: ToastWithMeta) {
      if (!toast._meta.timer) return;
      clearTimeout(toast._meta.timer);
      toast._meta.timer = null;
      toast._meta.remaining -= Date.now() - toast._meta.start;
    },

    resumeTimer(toast: ToastWithMeta) {
      if (toast._meta.remaining <= 0) {
        this.deleteItemById(toast.id);
        return;
      }
      this.startTimer(toast);
    },

    trackProgress(toast: ToastWithMeta) {
      const tick = () => {
        if (!this.list.find((t) => t.id === toast.id)) return;
        if (!toast._meta.timer) return; // пауза

        const elapsed = Date.now() - toast._meta.start;
        const percent = ((toast._meta.remaining - elapsed) / (toast.timeout ?? 3000)) * 100;
        toast._meta.progress = Math.max(percent, 0);

        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },

    _clear(toast: ToastWithMeta) {
      if (toast._meta.timer) {
        clearTimeout(toast._meta.timer);
        toast._meta.timer = null;
      }
    },
  },
});
