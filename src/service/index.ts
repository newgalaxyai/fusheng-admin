import { AxiosRequestHeaders } from 'axios'
import { VITE_BASE_URL, TIME_OUT } from './config'
import ZZRequest from './request'

const baseRequest = new ZZRequest({
  baseURL: VITE_BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  },
  headers: {
    // 必要的头部配置
    'Content-Type': 'application/json'
  } as AxiosRequestHeaders
})

export default baseRequest
