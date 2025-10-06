import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField, type FormContext } from 'vee-validate';
import type { ZodSchema, z } from 'zod';

export interface UseZodFormOptions<T> {
  initialValues?: Partial<T>;
  resetOnSuccess?: boolean;
}

type SubmitHandler<T> = (values: T, ctx: FormContext) => Promise<void> | void;

export function useZodForm<TSchema extends ZodSchema<any>>(
  schema: TSchema,
  options: UseZodFormOptions<z.infer<TSchema>> = {}
) {
  type Values = z.infer<TSchema>;

  const form = useForm<Values>({
    validationSchema: toTypedSchema(schema),
    initialValues: (options.initialValues || {}) as Values,
  });

  const defineField = <Path extends keyof Values | string>(name: Path) => {
    const { value, errorMessage, handleChange, handleBlur } = useField<any>(name as string);
    return {
      value,
      errorMessage,
      onInput: handleChange,
      onBlur: handleBlur,
    };
  };

  const handleSubmit = (cb: SubmitHandler<Values>) => {
    return form.handleSubmit(async (values, ctx) => {
      try {
        await cb(values, ctx);
        if (options.resetOnSuccess) {
          form.resetForm();
        }
      } catch (err: any) {
        if (err?.fieldErrors) {
          form.setErrors(err.fieldErrors);
        } else if (err?.message) {
          ctx.setFieldError('form', err.message);
        } else {
          console.error('Unexpected form error:', err);
        }
      }
    });
  };

  return {
    ...form,
    defineField,
    handleSubmit,
  };
}
