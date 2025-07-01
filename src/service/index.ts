import { VITE_BASE_URL, TIME_OUT } from './config'
import ZZRequest from './request'
import { message } from 'antd'
import { IResponseData } from '@/api/type'

const createRequest = (baseURL: string, headers: any) => {
  return new ZZRequest({
    baseURL,
    timeout: TIME_OUT,  
    interceptors: {
      requestFailureFn(error) {
        console.log('请求失败', error);
        // 处理请求超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          message.error('请求超时，请检查网络连接后重试');
        } else {
          message.error(error.message || '接口请求失败');
        }
        // 将错误继续抛出，以便在业务代码中可以继续捕获
        return {
          success: false,
          data: null,
          errMsg: error.message || '接口请求失败'
        }
      },
      responseSuccessFn(res: IResponseData<any>) {
        switch (res.code) {
          // 成功
          case 0:
            return {
              success: true,
              data: res.data,
            }
          // 登录过期
          case 400:
            message.error(res.msg || '登录过期')
            return {
              success: false,
              data: res.data,
              errMsg: res.msg || '登录过期'
            }
          // 失败
          default:
            message.error(res.msg || '接口响应失败')
            return {
              success: false,
              data: res.data,
              errMsg: res.msg || '响应失败'
            }
        }
      },
      responseFailureFn(error) {
        console.log('响应失败', error);
        // 处理请求超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          message.error('请求超时，请检查网络连接后重试');
        } else {
          message.error(error.message || '接口响应失败');
        }
        // 将错误继续抛出，以便在业务代码中可以继续捕获
        return {
          success: false,
          data: null,
          errMsg: error.message || '接口响应失败'
        }
      }
    },
    headers
  })
}

const baseRequest = createRequest(VITE_BASE_URL, {
  'Content-Type': 'application/json'
})

export { baseRequest }
