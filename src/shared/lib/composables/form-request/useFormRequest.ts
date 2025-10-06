import { type Reactive, reactive } from 'vue';
import { AxiosError, type AxiosResponse } from 'axios';

interface IFormRequestOptions<Fields extends Record<string, any>, Response> {
  fields: Fields;
  submit: {
    prefetch?: () => { ok: boolean; text?: string };
    request: (fields: Reactive<Fields>) => Promise<AxiosResponse<Response>>;
    onError?: (error: unknown) => Promise<void> | void;
    onResolve?: (response: AxiosResponse<Response>) => Promise<void> | void;
    onAxiosError?: (response: AxiosError) => Promise<void> | void;
    onFinally?: () => void;
  };
}

export const useFormRequest = <Fields extends Record<string, any>, Response>(
  options: IFormRequestOptions<Fields, Response>
) => {
  const fields = reactive(options.fields);

  const submit = async () => {
    const prefetchResult = options.submit.prefetch?.();
    if (prefetchResult && !prefetchResult.ok) return;

    try {
      const response = await options.submit.request(fields);

      if (response?.data) await options.submit.onResolve?.(response);

      if (response instanceof AxiosError) await options.submit.onAxiosError?.(response);
    } catch (error) {
      if (options.submit.onError) await options.submit.onError(error);
      else console.error('An error occurred:', error);
    } finally {
      options.submit.onFinally?.();
    }
  };

  return [fields, submit] as const;
};
