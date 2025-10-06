import { defineStore } from 'pinia';
import type { IDrawer } from '@shared/ui/ui-drawer/model/ui-drawer.types.ts';

interface IDrawerState extends IDrawer {
  isOpen?: boolean;
}

const DEFAULT_WIDTH_VALUE = '300px';
const DEFAULT_SIDE_VALUE = 'right';

export const useDrawerStore = defineStore('drawer', {
  state: (): IDrawerState => ({
    side: DEFAULT_SIDE_VALUE,
    width: DEFAULT_WIDTH_VALUE,
    overlay: true,
    closeOnOverlay: true,
    isOpen: false,
  }),
  actions: {
    configure(state: Omit<IDrawerState, 'isOpen'>) {
      this.$state = { ...state, side: state.side || DEFAULT_SIDE_VALUE, width: state.width || DEFAULT_WIDTH_VALUE };
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
});
