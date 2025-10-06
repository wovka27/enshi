import { registerSchema } from '@features/register-form/model/register.schema.ts';
import { useZodForm } from '@shared/lib/composables/zod-form';

export const useRegisterForm = () =>
  useZodForm(registerSchema, {
    resetOnSuccess: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });
