import { divide } from 'lodash-es';
import {
    IRecord
} from './type'
import {
    FrownOutlined,
    SmileOutlined,
    MehOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';

// 问答入口
export const QA_ENTRY_NAME = {
    QA_ENTRY_WINNER: 1,
}
export const QA_ENTRY: Record<number, IRecord> = {
    [QA_ENTRY_NAME.QA_ENTRY_WINNER]: {
        text: '追踪大赢家',
    },
}

// 评价
export const EVALUATE_NAME = {
    EVALUATE_GOOD: 1,
    EVALUATE_NORMAL: 2,
    EVALUATE_BAD: 3,
}
export const EVALUATE: Record<number, IRecord> = {
    [EVALUATE_NAME.EVALUATE_GOOD]: {
        text: (
            <Tag
                icon={<SmileOutlined />}
                color='success'>
                点赞
            </Tag>
        ),

    },
    [EVALUATE_NAME.EVALUATE_NORMAL]: {
        text: (
            <Tag
                icon={<MehOutlined />}
                color='warning'>
                一般
            </Tag>
        ),
    },
    [EVALUATE_NAME.EVALUATE_BAD]: {
        text: (
            <Tag
                icon={<FrownOutlined />}
                color='error'>
                点踩
            </Tag>
        ),
    },
}
