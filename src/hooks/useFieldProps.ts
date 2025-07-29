import React, { useState } from 'react'
import type { FC, ReactNode } from 'react'

interface Option {
    value?: string | number | null;
    label: React.ReactNode;
    children?: Option[];
    isLeaf?: boolean;
}

const cascaderOptionsLists: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];

// protable筛选表单组件props通用配置
export function useFieldProps() {
    // 日期范围选择
    const dateRangePlaceholder = ['开始日期', '结束日期'];
    // 日期格式
    const dateFormat = 'YYYY-MM-DD';
    // 时间格式
    const timeFormat = 'HH:mm:ss';
    // 日期时间格式
    const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
    // 级联选择器
    const [cascaderOptions, setCascaderOptions] = useState<Option[]>(cascaderOptionsLists);
    const cascaderLoadData = (selectedOptions: Option[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];

        // load options lazily
        setTimeout(() => {
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            setCascaderOptions([...cascaderOptions]);
        }, 1000);
    };

    return {
        cascaderOptions,
        cascaderLoadData,
        dateRangePlaceholder,
        dateFormat,
        timeFormat,
        dateTimeFormat,
    }
}
