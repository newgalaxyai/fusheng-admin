import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZZRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class ZZRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: ZZRequestConfig) {
    this.instance = axios.create(config)

    // 先添加自定义拦截器（这样可以访问到完整的AxiosResponse对象）
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )

    // 然后添加默认的拦截器（用于基础处理）
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('responseSuccessFn', res)
        return res
      },
      (err) => {
        return err
      }
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: ZZRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: ZZRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: ZZRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  put<T = any>(config: ZZRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete<T = any>(config: ZZRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: ZZRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default ZZRequest
