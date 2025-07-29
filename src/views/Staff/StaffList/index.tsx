import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  Button,
  Space,
  App,
  Tag,
  Modal,
  Dropdown,
} from 'antd'
import type {
  MenuProps,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  ProTable,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useLayout } from '@/hooks/useLayout';
import { ROUTE_KEY, ROUTE_PARAM_NAME, ROUTE_PERMISSION, STAFF_ROLE, STAFF_ROLE_NAME } from '@/constants'
import { IStaffList, IStaffListRequest, IStaffListResponse } from '@/api/type'
import { useAppSelector } from '@/hooks/useAppStore'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import {
  getStaffListAPI,
  deleteStaffAPI,
  editStaffAPI,
  assignStaffRoleAPI,
  getStaffRolesAPI
} from '@/api/staff'
import { encodeRedirectInfo } from '@/utils/auth'
import { useFieldProps } from '@/hooks/useFieldProps'
import {
  getIDStaffRole,
} from '@/utils/staff'

interface IProps {
  children?: ReactNode
}

const StaffList: FC<IProps> = (_props) => {
  const { message, modal } = App.useApp();
  const { navigateTo, getRouteRole } = useLayout();
  const {
    dateRangePlaceholder,
    dateFormat
  } = useFieldProps()

  // 是否正在加载
  // const [isLoading, setIsLoading] = useState(true);

  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

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
      valueType: 'select',
      valueEnum: STAFF_ROLE,
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      valueType: 'date',
      width: 100,
      align: 'center',
      fieldProps: {
        format: dateFormat
      },
      search: false,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      valueType: 'dateRange',
      fieldProps: {
        placeholder: dateRangePlaceholder,
      },
      hidden: true,
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 150,
      render: (text, record, _, action) => {
        // 编辑员工下拉菜单
        const items: MenuProps['items'] = [
          {
            key: '1',
            label: (
              <a
                onClick={() => {
                  // console.log('record: ', record);
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
                }}>
                编辑员工
              </a>
            ),
          },
          {
            key: '2',
            label: (
              <a
                onClick={() => {
                  setCurrentStaff(record);
                  // 打开修改角色弹窗
                  setStaffRoleModalOpen(true);
                }}
              >
                修改角色
              </a>
            ),
          },
        ];
        return [
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
                // console.log('record: ', record);
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
            <Dropdown menu={{ items }} placement="bottom">
              <Button
                key="edit"
                color="primary"
                variant="text"
                size='small'
              >
                编辑
              </Button>
            </Dropdown>
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
        ]
      },
    },
  ]

  // 设置员工角色
  // 当前选中的员工
  const [currentStaff, setCurrentStaff] = useState<IStaffList | null>(null);
  // 员工角色弹窗表单实例
  const staffRoleModalFormRef = useRef<ProFormInstance<any>>(null);
  // 员工角色弹窗是否打开
  const [staffRoleModalOpen, setStaffRoleModalOpen] = useState(false);
  // 员工角色弹窗确认按钮加载中
  const [staffRoleModalConfirmLoading, setStaffRoleModalConfirmLoading] = useState(false);
  // 设置员工角色弹窗确定
  const handleStaffRoleModalOk = async () => {
    staffRoleModalFormRef.current?.submit();
  };
  // 设置员工角色弹窗取消
  const handleStaffRoleModalCancel = () => {
    setStaffRoleModalOpen(false);
  };
  // 设置员工角色提交表单
  const handleStaffRoleModalSubmit = async (values: any) => {
    setStaffRoleModalConfirmLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // 修改员工角色
      const assignStaffRoleRes = await assignStaffRoleAPI({
        userId: Number(currentStaff?.id),
        roleIds: [STAFF_ROLE[STAFF_ROLE_NAME.SUPER].id!, STAFF_ROLE[values.staffRole].id!],
      })
      if (!assignStaffRoleRes.success) {
        throw new Error(assignStaffRoleRes.errMsg);
      }
      message.success('设置成功');
      // 刷新员工列表
      actionRef.current?.reload();
      setStaffRoleModalOpen(false);
    } catch (error) {
      // console.log('error: ', error);
    } finally {
      setStaffRoleModalConfirmLoading(false);
    }
  };

  return (
    <>
      {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
      <ProTable<IStaffList>
        scroll={{ x: 1500 }}
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
          // return {
          //   success: true,
          //   total: 1,
          //   data: [
          //     {
          //       id: 1,
          //       employeeNo: 'USER00000001',
          //       username: 'admin',
          //       nickname: '超级管理员',
          //       mobile: '13800000000',
          //       deptName: '系统管理',
          //       staffPositionName: '超级管理员',
          //       staffRole: 'super_admin',
          //       idType: 'ID_CARD',
          //       idNumber: '110101199001011234',
          //       hireDate: [2023, 1, 1],
          //       createTime: 1765958000000,
          //       status: 1,
          //       staffUpdateTime: 1765958000000,
          //       staffDeleteTime: 1765958000000,
          //     }
          //   ]
          // }
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
          for (let staffIndex = 0; staffIndex < res.data.list.length; staffIndex++) {
            const roles = await getStaffRolesAPI({
              userId: res.data.list[staffIndex].id,
            })
            // console.log('roles: ' + res.data.list[staffIndex].username, roles);

            res.data.list[staffIndex].staffRole = getIDStaffRole(roles.data) as any;
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
          defaultPageSize: 10,
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
      {/* 设置员工角色 */}
      <Modal
        title="设置员工角色"
        open={staffRoleModalOpen}
        onOk={handleStaffRoleModalOk}
        confirmLoading={staffRoleModalConfirmLoading}
        onCancel={handleStaffRoleModalCancel}
        destroyOnHidden={true}
      >
        <ProForm
          submitter={false}
          formRef={staffRoleModalFormRef}
          onFinish={handleStaffRoleModalSubmit}
          initialValues={{
            staffRole: currentStaff?.staffRole ? currentStaff?.staffRole : null,
          }}
        >
          <ProFormSelect
            name="staffRole"
            label="员工角色"
            // colProps={{ md: 12, xl: 8 }}
            options={Object.keys(STAFF_ROLE).map((key) => ({
              label: STAFF_ROLE[key].text,
              value: key,
            }))}
            placeholder="请选择"
            rules={[
              {
                required: true,
                validator: (_rule, value) => {
                  if (!value) {
                    return Promise.reject('员工角色不能为空！')
                  }
                  return Promise.resolve()
                },
                validateTrigger: ['onSubmit', 'onFinish'],
              }
            ]}
          />
        </ProForm>
      </Modal>
    </>
  )
}

export default memo(StaffList)
