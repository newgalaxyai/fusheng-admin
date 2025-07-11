import { IStaffListResponse } from '@/api/type/staff'
import { DispatchType } from '@/redux'

export interface IStaffState {
  staffList: IStaffListResponse[]
  loading: boolean
}

export interface IThunkStaffState {
  state: IStaffState
  dispatch: DispatchType
}
