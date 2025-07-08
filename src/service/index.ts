import { VITE_BASE_URL, TIME_OUT } from './config'
import ZZRequest from './request'
import { message } from 'antd'
import { IResponseData } from '@/api/type'
import { refreshToken } from '@/utils/auth'
import { getToken, removeToken } from '@/utils/storge'

// 是否正在刷新token
let isRefreshToken = false

// 等待队列 - 存储待重试的请求
interface PendingRequest {
  config: any;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}
const waitQueue: PendingRequest[] = []

// 处理token刷新逻辑
const handleTokenRefresh = async (originalRequest: any) => {
  return new Promise((resolve, reject) => {
    // 将请求加入等待队列
    waitQueue.push({
      config: originalRequest,
      resolve,
      reject
    })

    // 如果已经在刷新token，直接返回
    if (isRefreshToken) {
      return
    }

    // 开始刷新token
    isRefreshToken = true

    refreshToken()
      .then((newToken) => {
        // 刷新成功，处理等待队列中的所有请求
        console.log('Token刷新成功，重试等待队列中的请求')
        
        // 为所有等待的请求更新token并重试
        waitQueue.forEach(({ config, resolve, reject }) => {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${newToken}`
          
          // 重新发起请求
          baseRequest.request(config)
            .then(resolve)
            .catch(reject)
        })

        // 清空等待队列
        waitQueue.length = 0
      })
      .catch((error) => {
        console.error('Token刷新失败:', error)
        
        // 刷新失败，拒绝所有等待的请求
        waitQueue.forEach(({ reject }) => {
          reject(error)
        })

        // 清空等待队列
        waitQueue.length = 0

        // 清除token
        removeToken()
      })
      .finally(() => {
        // 重置刷新状态
        isRefreshToken = false
      })
  })
}

const createRequest = (baseURL: string) => {
  return new ZZRequest({
    baseURL,
    timeout: TIME_OUT,
    interceptors: {
      // 请求拦截器 - 自动携带访问令牌
      requestSuccessFn(config: any) {
        const token = getToken()
        if (token) {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${token}`
          config.headers['tenant-id'] = '1'
        }
        return config
      },
      requestFailureFn(error) {
        console.log('请求失败', error);
        // 处理请求超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          message.error('请求超时，请检查网络连接后重试');
        } else {
          message.error(error.message || '接口请求失败');
        }
        // 将错误继续抛出，以便在业务代码中可以继续捕获
        return Promise.reject({
          success: false,
          data: null,
          errMsg: error.message || '接口请求失败'
        })
      },
      responseSuccessFn(res: IResponseData<any>) {
        switch (res.code) {
          // 成功
          case 0:
            return {
              success: true,
              data: res.data,
            }
          // 登录过期/权限不足 - 抛出401错误，让responseFailureFn处理
          case 401:
            console.log('检测到业务401错误，转换为网络401错误')
            const error = new Error('Unauthorized') as any
            error.response = { status: 401, data: res }
            error.config = (res as any).config
            throw error
          // 其他失败情况
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
        
        // 处理401错误 - 可能是网络层面的401
        if (error.response && error.response.status === 401) {
          console.log('网络层401错误，开始token刷新流程')
          return handleTokenRefresh(error.config)
        }
        
        // 处理请求超时
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
          message.error('请求超时，请检查网络连接后重试');
        } else {
          message.error(error.message || '接口响应失败');
        }
        
        // 将错误继续抛出，以便在业务代码中可以继续捕获
        return Promise.reject({
          success: false,
          data: null,
          errMsg: error.message || '接口响应失败'
        })
      }
    },
  })
}

const baseRequest = createRequest(VITE_BASE_URL + '/app-api')

export { baseRequest }
