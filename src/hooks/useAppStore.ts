import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import type { IRootState, DispatchType } from '@/redux'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => ThunkDispatch<any, undefined, Action> = useDispatch
