import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, App, Tag, Spin, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, TableDropdown } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY, ROUTE_PARAM_NAME, ROUTE_PERMISSION, STAFF_ROLE } from '@/utils/constants'
import { IStaffList, IStaffListRequest, IStaffListResponse } from '@/api/type/staff'
import { useAppSelector } from '@/hooks/useAppStore'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import dayjs from 'dayjs'
import { getStaffListAPI } from '@/api/staff'

interface IProps {
  children?: ReactNode
}

const StaffList: FC<IProps> = (_props) => {
  const {
    staff: {
      staffList
    },
    user: {
      userRole,
      permissions
    }
  } = useAppSelector((state) => state)
  const { message, modal } = App.useApp();
  const { navigateTo, getRouteRole } = useRoutesHook();

  // 是否正在加载
  // const [isLoading, setIsLoading] = useState(true);

  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  // useEffect(() => {
  //   // 解决protable搜索表单参数会同步到url，导致不点重置按钮直接刷新页面时会将上次搜索表单中的数据当作默认数据，重置按钮失效的问题
  //   const url = new URL(window.location.href);
  //   const staffNumber = url.searchParams.get('staffNumber');
  //   const staffName = url.searchParams.get('staffName');
  //   const staffMobile = url.searchParams.get('staffMobile');
  //   const staffStatus = url.searchParams.get('staffStatus');
  //   const staffRole = url.searchParams.get('staffRole');
  //   const staffCreateTime = url.searchParams.get('staffCreateTime');
  //   const current = url.searchParams.get('current') || '1';
  //   const pageSize = url.searchParams.get('pageSize') || '20';
  //   if (staffNumber || staffName || staffMobile || staffStatus || staffRole || staffCreateTime) {
  //     window.location.href = `${url.origin}${url.pathname}?current=${current}&pageSize=${pageSize}${url.hash}`;
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [])

  // 员工列表列数据
  const columns: ProColumns<IStaffList>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      title: '序号',
      width: 48,
      fixed: 'left',
      align: 'center',
    },
    {
      dataIndex: 'username',
      title: '员工编号',
      fixed: 'left',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Button
          type="link"
          variant="link"
          color="primary"
          onClick={() => {
            console.log('record: ', record);
            navigateTo(ROUTE_KEY.STAFF_DETAIL,
              {
                [ROUTE_PARAM_NAME.STAFF_ID]: record.id,
                [ROUTE_PARAM_NAME.PAGE_TYPE]: '2'
              });
          }}
        >
          {record.username}
        </Button>
      ),
    },
    {
      dataIndex: 'nickname',
      title: '员工姓名',
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'mobile',
      title: '员工手机号',
      width: 150,
      copyable: true,
      align: 'center',
    },
    {
      dataIndex: 'staffStatus',
      title: '员工状态',
      width: 100,
      valueType: 'select',
      valueEnum: {
        true: {
          text: '启用',
          status: 'Success',
        },
        false: {
          text: '禁用',
          status: 'Error',
        },
      },
      align: 'center',
    },
    {
      dataIndex: 'deptName',
      title: '员工部门',
      width: 100,
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'staffPositionName',
      title: '员工职位',
      width: 100,
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'staffRole',
      title: '员工角色',
      width: 100,
      render: (_, record) => (
        <Tag color={STAFF_ROLE[record.staffRole]?.color || 'default'} key={record.id}>
          {STAFF_ROLE[record.staffRole]?.name || '未设置'}
        </Tag>
      ),
      align: 'center',
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      valueType: 'date',
      width: 200,
      align: 'center',
      renderFormItem: (_, { onChange }) => {
        return (
          <DatePicker.RangePicker
            onChange={(value) => {
              onChange?.(value);
            }}
          />
        )
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record, _, action) => [
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.STAFF_DETAIL, 3)}
          requiredPermissions={[ROUTE_PERMISSION.STAFF_DETAIL]}
        >
          <Button
            key="view"
            color="primary" variant="text"
            onClick={() => {
              console.log('record: ', record);
              navigateTo(ROUTE_KEY.STAFF_DETAIL,
                {
                  [ROUTE_PARAM_NAME.STAFF_ID]: record.id,
                  [ROUTE_PARAM_NAME.PAGE_TYPE]: '2'
                });
            }}
          >
            查看
          </Button>
        </PermissionWrapper>,
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.EDIT_STAFF, 3)}
          requiredPermissions={[ROUTE_PERMISSION.EDIT_STAFF]}
        >
          <Button
            key="edit"
            color="primary" variant="text"
            onClick={() => {
              console.log('record: ', record);
              navigateTo(ROUTE_KEY.EDIT_STAFF,
                {
                  [ROUTE_PARAM_NAME.STAFF_ID]: record.id,
                  [ROUTE_PARAM_NAME.PAGE_TYPE]: '1'
                });
            }}
          >
            编辑
          </Button>
        </PermissionWrapper>,
        <TableDropdown
          menus={[
            {
              key: 'status',
              name: (
                <PermissionWrapper
                  requiredRole={getRouteRole(ROUTE_KEY.DELETE_STAFF, 3)}
                  requiredPermissions={[ROUTE_PERMISSION.DELETE_STAFF]}
                >
                  <Button
                    key="status"
                    color={!record.staffStatus ? 'primary' : 'danger'}
                    variant="link"
                    onClick={() => {
                      modal.confirm({
                        title: !record.staffStatus ? '启用员工' : '禁用员工',
                        content: !record.staffStatus ? '确定启用该员工吗？' : '确定禁用该员工吗？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          message.success(!record.staffStatus ? '启用成功' : '禁用成功');
                          // 删除后刷新列表
                          action?.reload();
                        },
                      });
                    }}
                  >
                    {!record.staffStatus ? '启用' : '禁用'}
                  </Button>
                </PermissionWrapper>
              ),
            },
            {
              key: 'delete',
              name: (
                <PermissionWrapper
                  requiredRole={getRouteRole(ROUTE_KEY.DELETE_STAFF, 3)}
                  requiredPermissions={[ROUTE_PERMISSION.DELETE_STAFF]}
                >
                  <Button
                    key="delete"
                    color="danger"
                    variant="link"
                    onClick={() => {
                      modal.confirm({
                        title: '删除员工',
                        content: '确定删除该员工吗？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          message.success('删除成功');
                          // 删除后刷新列表
                          action?.reload();
                        },
                      });
                    }}
                  >
                    删除
                  </Button>
                </PermissionWrapper>
              ),
            }
          ]}

        />
      ],
    },
  ]

  return (
    <>
      {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
      <ProTable<IStaffList>
        scroll={{ x: true, y: 'calc(100vh - 300px)' }}
        bordered
        columns={columns}
        rowSelection={{
          // 注释该行则默认不显示下拉选项
          // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          // console.log('selectedRowKeys: ', selectedRowKeys);
          // console.log('selectedRows: ', selectedRows);
          return (
            <Space size={24}>
              <span>
                已选 {selectedRows.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <PermissionWrapper
                requiredRole={getRouteRole(ROUTE_KEY.DELETE_STAFF, 3)}
                requiredPermissions={[ROUTE_PERMISSION.DELETE_STAFF]}
              >
                <a
                  onClick={() => {
                    modal.confirm({
                      title: '批量删除员工',
                      content: '确定删除所选员工吗？',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        message.success('删除成功');
                        // 删除后刷新列表
                        actionRef.current?.reload();
                      },
                    });
                  }}
                >批量删除</a>
              </PermissionWrapper>
              <a>导出数据</a>
            </Space>
          );
        }}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          // console.log('params: ', params);
          // console.log('sort: ', sort);
          // console.log('filter: ', filter);
          let queryParams: IStaffListRequest = {
            pageNo: params.current!,
            pageSize: params.pageSize!,
            staffNumber: params.staffNumber,
            mobile: params.mobile,
            staffStatus: params.staffStatus,
            username: params.username,
            staffRole: params.staffRole,
            staffCreateTime: params.staffCreateTime,
          }
          const res = await getStaffListAPI(queryParams)
          return {
            data: res.data.list,
            total: res.data.total,
            success: res.success,
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          // onChange(value) {
          //   console.log('value: ', value);
          // },
        }}
        rowKey="id"
        // 搜索表单配置
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        // 搜索表单实例
        formRef={formRef}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
              };
            }
            // 解决protable搜索表单参数会同步到url，导致不点重置按钮直接刷新页面时会将上次搜索表单中的数据当作默认数据，重置按钮失效的问题
            return {};
          },
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30, 40, 50],
        }}
        dateFormatter="string"
        headerTitle="员工列表"
        toolBarRender={() => [
          <PermissionWrapper
            requiredRole={getRouteRole(ROUTE_KEY.ADD_STAFF, 3)}
            requiredPermissions={[ROUTE_PERMISSION.ADD_STAFF]}
          >
            <Button
              key="add-staff"
              icon={<PlusOutlined />}
              onClick={() => {
                // actionRef.current?.reload();
                navigateTo(
                  ROUTE_KEY.ADD_STAFF,
                  {
                    [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                    [ROUTE_PARAM_NAME.REDIRECT]: ROUTE_KEY.STAFF_LIST,
                  });
              }}
              type="primary"
            >
              新建员工
            </Button>
          </PermissionWrapper>
        ]}
      />
    </>
  )
}

export default memo(StaffList)
