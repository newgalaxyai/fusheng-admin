export interface IResponseData<T> {
  code: number
  data: T
  msg?: string
}

export interface IResponse<T> {
  success: boolean
  data: T
  errMsg?: string
}

export type IRequest<T>  = T

export * from './staff'
export * from './consumer'
export * from './data'
export * from './login'
export * from './example'
export * from './company'
export * from './feedback'
export * from './common'
