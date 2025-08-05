import React, { useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { getAreaTreeAPI } from '@/api/common'
import { IAreaTree } from '@/api/type';
import dayjs from 'dayjs';

interface Option {
    value?: string | number | null;
    label: React.ReactNode;
    children?: Option[];
    isLeaf?: boolean;
}

// protable筛选表单组件props通用配置
export function useFieldProps() {
    // 日期范围选择
    const dateRangePlaceholder = ['开始日期', '结束日期'];
    // 日期时间范围选择
    const dateTimeRangePlaceholder = ['开始时间', '结束时间'];
    // 日期格式
    const dateFormat = 'YYYY-MM-DD';
    // 时间格式
    const timeFormat = 'HH:mm:ss';
    // 日期时间格式
    const dateTimeFormat = dateFormat + ' ' + timeFormat;
    // 开始时间
    const startTimeFormat = '00:00:00';
    // 结束时间
    const endTimeFormat = '23:59:59';
    // 开始日期时间
    const startDateTimeFormat = dateFormat + ' ' + startTimeFormat;
    // 结束日期时间
    const endDateTimeFormat = dateFormat + ' ' + endTimeFormat;
    // 选择器placeholder
    const selectPlaceholder = '请选择';
    // 级联选择器
    const [cascaderOptions, setCascaderOptions] = useState<Option[]>([]);

    // 级联选择器加载数据
    const cascaderLoadData = (selectedOptions: Option[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
    };

    // 地区树级联fieldNames
    const areaFieldNames = {
        label: 'name',
        value: 'id',
        children: 'children',
    }

    // 地区树初始化数据
    const [areaTreeOptions, setAreaTreeOptions] = useState<IAreaTree[]>([]);
    useEffect(() => {
        getAreaTreeAPI().then((res) => {
            if (res.success) {
                setAreaTreeOptions(res.data);
            }
        });
    }, []);

    return {
        cascaderOptions,
        cascaderLoadData,
        areaFieldNames,
        areaTreeOptions,
        selectPlaceholder,
        dateRangePlaceholder,
        dateTimeRangePlaceholder,
        dateFormat,
        timeFormat,
        dateTimeFormat,
        startTimeFormat,
        endTimeFormat,
        startDateTimeFormat,
        endDateTimeFormat,
    }
}
