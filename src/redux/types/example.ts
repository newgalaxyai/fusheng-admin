import { IExampleResponse } from '@/api/type'
import { DispatchType } from '@/redux'

export interface IExampleState {
  data: IExampleResponse | null
  loading: boolean
}

export interface IThunkExampleState {
  state: IExampleState
  dispatch: DispatchType
}
