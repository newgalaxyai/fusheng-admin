import React, { useRef, useEffect, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space, App } from 'antd'
import { ProTable, ProColumns } from '@ant-design/pro-components'
import type { FormInstance, ActionType } from '@ant-design/pro-components'
import { useLayout } from '@/hooks/useLayout';
import { CONSUMER_SOURCE, ROUTE_KEY, ROUTE_PARAM_NAME, ROUTE_PERMISSION, SEX, STATUS, STATUS_NAME } from '@/constants'
import { useAppSelector } from '@/hooks/useAppStore'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import { encodeRedirectInfo } from '@/utils/auth'
import { IConsumerList, IConsumerListRequest } from '@/api/type'
import { consumerChangeStatusAPI, getConsumerListAPI } from '@/api/consumer'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
  children?: ReactNode
}

const ConsumerList: FC<IProps> = (_props) => {
  const { message, modal } = App.useApp();
  const { navigateTo, getRouteRole } = useLayout();
  const {
    dateRangePlaceholder,
    dateTimeFormat,
  } = useFieldProps()

  // 是否正在加载
  // const [isLoading, setIsLoading] = useState(true);

  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  // 用户列表列数据
  const columns: ProColumns<IConsumerList>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      title: '序号',
      width: 48,
      fixed: 'left',
      align: 'center',
    },
    {
      dataIndex: 'id',
      title: '用户ID',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'openid',
      title: '用户编号',
      width: 180,
      ellipsis: true,
      align: 'center',
    },
    {
      dataIndex: 'nickname',
      title: '用户昵称',
      width: 100,
      align: 'center',
    },
    {
      dataIndex: 'mobile',
      title: '手机号',
      width: 120,
      copyable: true,
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '状态',
      width: 80,
      align: 'center',
      valueType: 'select',
      valueEnum: STATUS,
    },
    {
      dataIndex: 'sex',
      title: '性别',
      width: 80,
      valueType: 'select',
      valueEnum: SEX,
      align: 'center',
      search: false
    },
    {
      dataIndex: 'compareCompany',
      title: '关联企业',
      width: 180,
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'consumerPositionName',
      title: '职位',
      width: 100,
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'registerSource',
      title: '注册来源',
      width: 120,
      align: 'center',
      valueType: 'select',
      valueEnum: CONSUMER_SOURCE,
      search: false,
    },
    {
      dataIndex: 'createTime',
      title: '注册时间',
      valueType: 'dateTime',
      width: 120,
      align: 'center',
      fieldProps: {
        format: dateTimeFormat,
      },
      search: false,
    },
    {
      dataIndex: 'createTime',
      title: '注册时间',
      valueType: 'dateRange',
      fieldProps: {
        placeholder: dateRangePlaceholder,
      },
      hidden: true,
    },
    {
      dataIndex: 'waterMark',
      title: '水印编号',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'remark',
      title: '备注',
      width: 180,
      align: 'center',
      search: false
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 150,
      render: (text, record, _, action) => {
        const optList = [
          <PermissionWrapper
            requiredRole={getRouteRole(ROUTE_KEY.CONSUMER_DETAIL, 3)}
            requiredPermissions={[ROUTE_PERMISSION.CONSUMER_DETAIL]}
          >
            <Button
              key="view"
              color="primary"
              variant="text"
              size='small'
              onClick={() => {
                // console.log('record: ', record);
                navigateTo(ROUTE_KEY.CONSUMER_DETAIL,
                  {
                    [ROUTE_PARAM_NAME.CONSUMER_ID]: record.id,
                    [ROUTE_PARAM_NAME.PAGE_TYPE]: '2'
                  });
              }}
            >
              查看
            </Button>
          </PermissionWrapper>,
          <PermissionWrapper
            requiredRole={getRouteRole(ROUTE_KEY.EDIT_CONSUMER, 3)}
            requiredPermissions={[ROUTE_PERMISSION.EDIT_CONSUMER]}
          >
            <Button
              key="edit"
              color="primary"
              variant="text"
              size='small'
              onClick={() => {
                // console.log('record: ', record);
                const encodedRedirectInfo = encodeRedirectInfo({
                  pathname: ROUTE_KEY.CONSUMER_LIST,
                  search: '',
                  hash: '',
                  state: null,
                  key: ''
                })
                navigateTo(ROUTE_KEY.EDIT_CONSUMER,
                  {
                    [ROUTE_PARAM_NAME.CONSUMER_ID]: record.id,
                    [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                    [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
                  });
              }}
            >
              编辑
            </Button>
          </PermissionWrapper>,
          <PermissionWrapper
            requiredRole={getRouteRole(ROUTE_KEY.DELETE_CONSUMER, 3)}
            requiredPermissions={[ROUTE_PERMISSION.DELETE_CONSUMER]}
          >
            <Button
              key="status"
              color={!STATUS[record.status].boolean ? 'primary' : 'danger'}
              variant="text"
              size='small'
              onClick={() => {
                modal.confirm({
                  title: !STATUS[record.status].boolean ? '启用用户' : '禁用用户',
                  content: !STATUS[record.status].boolean ? '确定启用该用户吗？' : '确定禁用该用户吗？',
                  okText: '确定',
                  cancelText: '取消',
                  onOk() {
                    return new Promise((resolve, reject) => {
                      consumerChangeStatusAPI({
                        id: record.id,
                        status: STATUS[record.status].boolean ? STATUS_NAME.DISABLE : STATUS_NAME.ENABLE
                      }).then(res => {
                        if (res.success) {
                          message.success(!STATUS[record.status].boolean ? '启用成功' : '禁用成功');
                          // 删除后刷新列表
                          action?.reload();
                          resolve(res);
                        } else {
                          reject(res.errMsg);
                        }
                      })
                    })
                  },
                });
              }}
            >
              {!STATUS[record.status].boolean ? '启用' : '禁用'}
            </Button>
          </PermissionWrapper>,
          <PermissionWrapper
            requiredRole={getRouteRole(ROUTE_KEY.DELETE_CONSUMER, 3)}
            requiredPermissions={[ROUTE_PERMISSION.DELETE_CONSUMER]}
          >
            <Button
              key="delete"
              color="danger"
              variant="text"
              size='small'
              onClick={() => {
                modal.confirm({
                  title: '删除用户',
                  content: '确定删除该用户吗？',
                  okText: '确定',
                  cancelText: '取消',
                  onOk() {
                    return new Promise((resolve, reject) => {
                      // const res = await deleteStaffAPI({
                      //   id: record.id,
                      // })
                      // if (res.success) {
                      //   message.success('删除成功');
                      // }
                      // 删除后刷新列表
                      action?.reload();
                      resolve(true);
                    })
                  },
                });
              }}
            >
              删除
            </Button>
          </PermissionWrapper>
        ]
        return (
          <Space size="small">
            {optList}
          </Space>
        )
      },
    },
  ]

  return (
    <>
      {/* <Spin
        spinning={true}
        tip="加载中..."
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      /> */}
      <ProTable<IConsumerList>
        scroll={{ x: 2500 }}
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
                requiredRole={getRouteRole(ROUTE_KEY.DELETE_CONSUMER, 3)}
                requiredPermissions={[ROUTE_PERMISSION.DELETE_CONSUMER]}
              >
                <a
                  onClick={() => {
                    modal.confirm({
                      title: '批量删除用户',
                      content: '确定删除所选用户吗？',
                      okText: '确定',
                      cancelText: '取消',
                      onOk() {
                        return new Promise((resolve, reject) => {
                          message.success('删除成功');
                          // 删除后刷新列表
                          actionRef.current?.reload();
                          resolve(true);
                        })
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
          //   data: [
          //     {
          //       id: 1,
          //       openid: 'USER00000001',
          //       nickname: '测试用户',
          //       consumerStatus: true,
          //       mobile: '12345678901',
          //       compareCompany: '上海测试公司',
          //       consumerPositionName: '董事长',
          //       registerSource: 1,
          //       waterMark: 1,
          //       loginIp: '192.168.1.1',
          //       loginCity: '上海',
          //       createTime: 1672531200000,
          //       updateTime: 1672531200000,
          //       sex: 1,
          //       remark: '备注',
          //     }
          //   ],
          //   success: true,
          //   total: 1
          // }
          // console.log('params: ', params);
          // console.log('sort: ', sort);
          // console.log('filter: ', filter);
          let queryParams: IConsumerListRequest = {
            pageNo: params.current!,
            pageSize: params.pageSize!,
            id: params.id, // 用户ID
            openid: params.openid, // 用户编号
            nickname: params.nickname, // 用户昵称
            consumerStatus: params.consumerStatus, // 用户状态 true:启用 false:禁用
            mobile: params.mobile, // 用户手机号
            waterMark: params.waterMark, // 水印编号
          }
          if (params.createTime) {
            queryParams = {
              ...queryParams,
              createStartTime: params.createTime[0], // 注册开始时间
              createEndTime: params.createTime[1], // 注册结束时间
            }
          }
          const res = await getConsumerListAPI(queryParams)
          return {
            data: res.data.list,
            total: res.data.total,
            success: res.success,
          }
        }
        }
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
        headerTitle="用户列表"
      // toolBarRender={() => [
      //   <PermissionWrapper
      //     requiredRole={getRouteRole(ROUTE_KEY.ADD_CONSUMER, 3)}
      //     requiredPermissions={[ROUTE_PERMISSION.ADD_CONSUMER]}
      //   >
      //     <Button
      //       key="add-staff"
      //       icon={<PlusOutlined />}
      //       onClick={() => {
      //         // actionRef.current?.reload();
      //         const encodedRedirectInfo = encodeRedirectInfo({
      //           pathname: ROUTE_KEY.CONSUMER_LIST,
      //           search: '',
      //           hash: '',
      //           state: null,
      //           key: ''
      //         })
      //         navigateTo(
      //           ROUTE_KEY.ADD_CONSUMER,
      //           {
      //             [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
      //             [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
      //           });
      //       }}
      //       type="primary"
      //     >
      //       新建用户
      //     </Button>
      //   </PermissionWrapper>
      // ]}
      />
    </>
  )
}

export default memo(ConsumerList);
