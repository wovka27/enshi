import { defineStore } from 'pinia';
import supportService from '@features/sendInSupport/model/support.service.ts';

type State = {
  isOpen: boolean;
  message: string;
};

export const useSupportStore = defineStore('support', {
  state: (): State => ({
    isOpen: false,
    message: '',
  }),
  actions: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
      this.setMessage('');
    },
    setMessage(message: string) {
      this.message = message;
    },

    async submit() {
      await supportService.sendMessage(this.message);
      this.closeModal();
    },
  },
});
