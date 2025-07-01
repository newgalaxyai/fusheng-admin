import { IExampleResponse } from '@/api/type/example'

export interface IExampleState {
  data: IExampleResponse | null
  loading: boolean
}

export interface IThunkExampleState {
  state: IExampleState
}
