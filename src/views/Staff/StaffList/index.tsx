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
import { getStaffListAPI, deleteStaffAPI, editStaffAPI } from '@/api/staff'
import { encodeRedirectInfo } from '@/utils/auth'

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

  // 获取员工状态的boolean值
  const staffStatus = (status: number) => {
    return status === 0;
  };

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
      // fixed: 'left',
      width: 100,
      align: 'center',
      // render: (_, record) => (
      //   <Button
      //     type="link"
      //     variant="link"
      //     color="primary"
      //     onClick={() => {
      //       // console.log('record: ', record);
      //       navigateTo(ROUTE_KEY.STAFF_DETAIL,
      //         {
      //           [ROUTE_PARAM_NAME.STAFF_ID]: record.id,
      //           [ROUTE_PARAM_NAME.PAGE_TYPE]: '2'
      //         });
      //     }}
      //   >
      //     {record.username}
      //   </Button>
      // ),
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
      width: 100,
      copyable: true,
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '员工状态',
      width: 80,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '启用',
          status: 'Success',
        },
        1: {
          text: '禁用',
          status: 'Error',
        },
      },
      align: 'center',
    },
    {
      dataIndex: 'deptName',
      title: '员工部门',
      width: 120,
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
      width: 80,
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
      width: 100,
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
      align: 'center',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 150,
      render: (text, record, _, action) => [
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.STAFF_DETAIL, 3)}
          requiredPermissions={[ROUTE_PERMISSION.STAFF_DETAIL]}
        >
          <Button
            key="view"
            color="primary"
            variant="text"
            size='small'
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
            color="primary"
            variant="text"
            size='small'
            onClick={() => {
              console.log('record: ', record);
              const encodedRedirectInfo = encodeRedirectInfo({
                pathname: ROUTE_KEY.STAFF_LIST,
                search: '',
                hash: '',
                state: null,
                key: ''
              })
              navigateTo(ROUTE_KEY.EDIT_STAFF,
                {
                  [ROUTE_PARAM_NAME.STAFF_ID]: record.id,
                  [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                  [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
                });
            }}
          >
            编辑
          </Button>
        </PermissionWrapper>,
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.DELETE_STAFF, 3)}
          requiredPermissions={[ROUTE_PERMISSION.DELETE_STAFF]}
        >
          <Button
            key="status"
            color={!staffStatus(record.status) ? 'primary' : 'danger'}
            variant="text"
            size='small'
            onClick={() => {
              modal.confirm({
                title: !staffStatus(record.status) ? '启用员工' : '禁用员工',
                content: !staffStatus(record.status) ? '确定启用该员工吗？' : '确定禁用该员工吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                  editStaffAPI({
                    ...record,
                    status: staffStatus(record.status) ? 1 : 0
                  }).then((res) => {
                    if (res.success) {
                      message.success(!staffStatus(record.status) ? '启用成功' : '禁用成功');
                      // 删除后刷新列表
                      action?.reload();
                    } else {
                      message.error('操作失败');
                    }
                  })
                },
              });
            }}
          >
            {!staffStatus(record.status) ? '启用' : '禁用'}
          </Button>
        </PermissionWrapper>,
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.DELETE_STAFF, 3)}
          requiredPermissions={[ROUTE_PERMISSION.DELETE_STAFF]}
        >
          <Button
            key="delete"
            color="danger"
            variant="text"
            size='small'
            onClick={() => {
              modal.confirm({
                title: '删除员工',
                content: '确定删除该员工吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  const res = await deleteStaffAPI({
                    id: record.id,
                  })
                  if (res.success) {
                    message.success('删除成功');
                  } else {
                    message.error(res.errMsg);
                  }
                  // 删除后刷新列表
                  action?.reload();
                },
              });
            }}
          >
            删除
          </Button>
        </PermissionWrapper>
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
        scroll={{ x: 1500, y: 'calc(100vh - 300px)' }}
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
            status: params.status,
            username: params.username,
            staffRole: params.staffRole,
          }
          if (params.staffCreateTime) {
            queryParams = {
              ...queryParams,
              staffCreateStartTime: params.staffCreateTime[0], // 注册开始时间
              staffCreateEndTime: params.staffCreateTime[1], // 注册结束时间
            }
          }
          const res = await getStaffListAPI(queryParams)
          if (res.errMsg) {
            message.error(res.errMsg)
          }
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
                const encodedRedirectInfo = encodeRedirectInfo({
                  pathname: ROUTE_KEY.STAFF_LIST,
                  search: '',
                  hash: '',
                  state: null,
                  key: ''
                })
                navigateTo(
                  ROUTE_KEY.ADD_STAFF,
                  {
                    [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                    [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
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
