import {
  type AxiosError,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface IHttpClientOptions extends CreateAxiosDefaults {
  onError?: (code?: string, count?: number) => void;
  getToken?: () => string;
  isRetryable?: boolean;
}

export interface IHttpAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

export interface ApiRequestParams<T, R = T, S = R> {
  method: HttpMethod;
  url: string;
  payload?: S;
  transform?: (data: T) => R;
  reverseTransform?: (data: S) => T;
  defaultValue?: R;
  axiosConfig?: AxiosRequestConfig;
}

export type OkResult<R> = { ok: true; data: R };
export type ErrResult<R> = { ok: false; data?: R; error: AxiosError };
export type RequestResult<R> = OkResult<R> | ErrResult<R>;

export type AwaitedTuple<T extends readonly unknown[]> = { [K in keyof T]: Awaited<T[K]> };
export type SettledTuple<T extends readonly unknown[]> = {
  [K in keyof T]: OkResult<AwaitedTuple<T>[K]> | ErrResult<AwaitedTuple<T>[K]>;
};
