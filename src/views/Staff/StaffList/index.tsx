import React, { useRef, useEffect, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Dropdown, Space, App, Tag } from 'antd'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import { ProTable, ProColumns, ActionType, TableDropdown } from '@ant-design/pro-components'
import { useRoutesHook } from '@/hooks/useRoutes'
import { ROUTE_KEY, ROUTE_PARAM_NAME, ROUTE_PERMISSION, STAFF_ROLE } from '@/utils/constants'
import { IStaffListRequest, IStaffListResponse } from '@/api/type/staff'
import { useAppSelector } from '@/hooks/useAppStore'
import { getStaffListAPI } from '@/api/staff'
import PermissionWrapper from '@/components/permission/PermissionWrapper'

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

  const actionRef = useRef<ActionType>();

  // 员工列表列数据
  const columns: ProColumns<IStaffListResponse>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      title: '序号',
      width: 48,
      fixed: 'left',
      align: 'center',
    },
    {
      dataIndex: 'staffNumber',
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
            navigateTo(ROUTE_KEY.STAFF_DETAIL, { [ROUTE_PARAM_NAME.STAFF_ID]: record.id });
          }}
        >
          {record.staffNumber}
        </Button>
      ),
    },
    {
      dataIndex: 'staffName',
      title: '员工姓名',
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'staffMobile',
      title: '员工手机号',
      width: 120,
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
      dataIndex: 'staffDepartmentName',
      title: '员工部门',
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'staffPositionName',
      title: '员工职位',
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'staffRole',
      title: '员工角色',
      width: 100,
      render: (_, record) => (
        <Tag color={STAFF_ROLE[record.staffRole].color} key={record.id}>
          {STAFF_ROLE[record.staffRole].name}
        </Tag>
      ),
      align: 'center',
    },
    {
      dataIndex: 'staffCreateTime',
      title: '创建时间',
      valueType: 'dateTime',
      width: 200,
      align: 'center',
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
              navigateTo(ROUTE_KEY.STAFF_DETAIL, { [ROUTE_PARAM_NAME.STAFF_ID]: record.id });
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
              navigateTo(ROUTE_KEY.EDIT_STAFF, { [ROUTE_PARAM_NAME.STAFF_ID]: record.id });
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
      <div
        className='staff-list-container'
      >
        <ProTable<IStaffListResponse>
          scroll={{ x: true }}
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
            return (
              <Space size={24}>
                <span>
                  已选 {selectedRowKeys.length} 项
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
            console.log('params: ', params);
            // console.log('sort: ', sort);
            // console.log('filter: ', filter);
            // const res = await getStaffListAPI(params)
            return {
              data: staffList,
              success: true,
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
          search={{
            labelWidth: 'auto',
            defaultCollapsed: false,
          }}
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
                  page: Number(values.current),
                };
              }
              return values;
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
                  navigateTo(ROUTE_KEY.ADD_STAFF);
                }}
                type="primary"
              >
                新建员工
              </Button>
            </PermissionWrapper>
          ]}
        />
      </div>
    </>
  )
}

export default memo(StaffList)
