import { loginSchema } from '@features/login-form/model';
import { useZodForm } from '@shared/lib/composables/zod-form';

export const useLoginForm = () =>
  useZodForm(loginSchema, {
    resetOnSuccess: true,
    initialValues: {
      email: '',
      password: '',
    },
  });
