import type {
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface ZZInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: Partial<InternalAxiosRequestConfig>
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface ZZRequestConfig<T = any> extends Partial<InternalAxiosRequestConfig> {
  interceptors?: ZZInterceptors<T>
}
