
import {
    ProSchemaValueEnumType
} from '@ant-design/pro-components'

// record type
export type IRecord = ProSchemaValueEnumType & {
    id?: number
    step?: number
}

// 性别
export type ISex = 0 | 1 | 2 // 0: 保密, 1: 男, 2: 女
