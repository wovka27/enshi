import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type {
  ApiRequestParams,
  HttpMethod,
  IHttpAxiosRequestConfig,
  IHttpClientOptions,
  RequestResult,
  SettledTuple,
} from '@shared/lib/http-client/model';

export class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly METHOD: Record<Uppercase<HttpMethod>, HttpMethod> = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
  };

  constructor(private options: IHttpClientOptions) {
    this.options = options;
    this.instance = axios.create(options);

    this.setupInterceptors();
  }

  private getRetryDelay(count: number): number {
    // экспоненциальная задержка: 500ms, 1s, 2s, 4s, ...
    return Math.min(1000 * 2 ** (count - 1), 10000);
  }
  private setupInterceptors(): void {
    this.setupInterceptorRequest();
    this.setupInterceptorResponse();
  }
  private setupInterceptorRequest(): void {
    this.instance.interceptors.request.use((config: IHttpAxiosRequestConfig) => {
      const token = this.options.getToken?.();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as never;
      }
      config._retryCount = config._retryCount ?? 0;
      return config;
    }, Promise.reject);
  }
  private setupInterceptorResponse(): void {
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as IHttpAxiosRequestConfig;

        if (!config || config._retryCount === undefined) {
          if (this.options.onError) this.options.onError(error.code);
          return Promise.reject(error);
        }

        const shouldRetry =
          error.code === 'ECONNABORTED' ||
          error.message.includes('Network Error') ||
          (!!error.response && error.response.status >= 500);

        if (this.options.isRetryable && shouldRetry && config._retryCount < 10) {
          config._retryCount += 1;

          if (this.options.onError) this.options.onError(error.code, config._retryCount);

          return new Promise((resolve) => {
            setTimeout(
              () => {
                resolve(this.instance(config));
              },
              this.getRetryDelay(config._retryCount || 1)
            );
          });
        }

        if (this.options.onError) this.options.onError(error.code, config._retryCount);

        return Promise.reject(error);
      }
    );
  }
  private async request<T, R = T, S = R>(params: ApiRequestParams<T, R, S>): Promise<RequestResult<R>> {
    const { method, url, payload, defaultValue, axiosConfig, transform, reverseTransform } = params;

    try {
      let response: AxiosResponse<T>;
      if ([this.METHOD.GET, this.METHOD.DELETE].includes(method)) {
        response = await this.instance[method]<T>(url, axiosConfig);
      } else {
        const serverPayload = reverseTransform ? reverseTransform(payload as S) : payload;
        response = await this.instance[method]<T>(url, serverPayload, axiosConfig);
      }

      if (!response.data) {
        this.options.onError?.('empty response', 1);
        throw new Error('empty response');
      }

      const data = transform ? transform(response.data) : (response.data as unknown as R);

      return { ok: true, data };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return { ok: false, data: defaultValue ?? error.response.data, error: error.response.data };
        }
        return { ok: false, data: defaultValue, error };
      }
      return { ok: false, data: defaultValue, error };
    }
  }

  public get<T, R = T, S = R>(params: Omit<ApiRequestParams<T, R, S>, 'method'>) {
    return this.request<T, R, S>({ ...params, method: this.METHOD.GET });
  }
  public post<T, R = T, S = R>(params: Omit<ApiRequestParams<T, R, S>, 'method'>) {
    return this.request<T, R, S>({ ...params, method: this.METHOD.POST });
  }
  public put<T, R = T, S = R>(params: Omit<ApiRequestParams<T, R, S>, 'method'>) {
    return this.request<T, R, S>({ ...params, method: this.METHOD.PUT });
  }
  public patch<T, R = T, S = R>(params: Omit<ApiRequestParams<T, R, S>, 'method'>) {
    return this.request<T, R, S>({ ...params, method: this.METHOD.PATCH });
  }
  public delete<T, R = T, S = R>(params: Omit<ApiRequestParams<T, R, S>, 'method'>) {
    return this.request<T, R, S>({ ...params, method: this.METHOD.DELETE });
  }

  async all<T extends readonly [...Promise<unknown>[]]>(...promises: T): Promise<SettledTuple<T>>;
  async all<T extends readonly [...Promise<unknown>[]]>(promises: T): Promise<SettledTuple<T>>;
  async all(...args: unknown[]) {
    const raw =
      args.length === 1 && Array.isArray(args[0])
        ? (args[0] as readonly Promise<unknown>[])
        : (args as readonly Promise<unknown>[]);

    const wrapped = raw.map((p) =>
      p.then(
        (v) => ({ ok: true, data: v }) as const,
        (e) => ({ ok: false, data: undefined, error: e }) as const
      )
    );

    const results = await Promise.all(wrapped);

    return results as unknown as SettledTuple<typeof raw>;
  }
}
