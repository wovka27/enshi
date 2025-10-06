import { verifySchema } from '@features/verify-form/model/verify.schema.ts';
import { useZodForm } from '@shared/lib/composables/zod-form';

export const useVerifyForm = () =>
  useZodForm(verifySchema, {
    resetOnSuccess: true,
    initialValues: { code: '' },
  });
