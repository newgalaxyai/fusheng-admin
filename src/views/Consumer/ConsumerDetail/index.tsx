import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button } from 'antd'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation } from 'react-router-dom'
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormRadio
} from '@ant-design/pro-components'
import {
  Row,
  Col,
  Space,
  Avatar,
  App,
  Table,
  Empty
} from 'antd'
import type {
  TableProps
} from 'antd'
import {
  ROUTE_KEY,
  ROUTE_PERMISSION,
  SEX,
  ROUTE_PARAM_NAME,
  CONSUMER_SOURCE,
  CONSUMER_OPERATION,
  CONSUMER_STATUS
} from '@/constants'
import {
  MobileOutlined,
} from '@ant-design/icons'
import { theme } from 'antd'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import { useLayout } from '@/hooks/useLayout';
import { decodeRedirectInfo, encodeRedirectInfo } from '@/utils/auth'
import { IConsumerList, IConsumerOffList } from '@/api/type'
import dayjs from 'dayjs'
import { consumerEditAPI, getConsumerDetailAPI } from '@/api/consumer'
import { useFieldProps } from '@/hooks/useFieldProps'

interface IProps {
  children?: ReactNode
}

const ConsumerDetail: FC<IProps> = (_props) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const location = useLocation();
  const { navigateTo, getRouteRole, pureRemoveTab } = useLayout();
  const {
    dateTimeFormat,
  } = useFieldProps();

  const pageType = getLocationParamsByName(location, ROUTE_PARAM_NAME.PAGE_TYPE);
  const consumerId = getLocationParamsByName(location, ROUTE_PARAM_NAME.CONSUMER_ID);
  const redirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO);
  const formRef = useRef<ProFormInstance<any>>(null);

  // 描述列表columns
  const descColumn: ProDescriptionsItemProps<IConsumerList>[] = [
    {
      title: '头像',
      key: 'avatar',
      dataIndex: 'avatar',
      span: 3,
      render: (_, record) => <Avatar shape='square' size={64} src={record.avatar} />,
    },
    {
      title: '用户编号',
      key: 'openid',
      dataIndex: 'openid',
      copyable: true,
    },
    {
      title: '用户昵称',
      key: 'nickname',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      key: 'sex',
      dataIndex: 'sex',
      valueType: 'select',
      valueEnum: SEX,
    },
    {
      title: '用户状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: CONSUMER_STATUS,
    },
    {
      title: '用户手机号',
      key: 'mobile',
      dataIndex: 'mobile',
      copyable: true,
    },
    {
      title: '最后登录IP',
      key: 'loginIp',
      dataIndex: 'loginIp',
    },
    {
      title: '城市',
      key: 'loginArea',
      dataIndex: 'loginArea',
    },
    {
      title: '关联企业',
      key: 'compareCompany',
      dataIndex: 'compareCompany',
    },
    {
      title: '职位',
      key: 'consumerPositionName',
      dataIndex: 'consumerPositionName',
    },
    {
      title: '水印编号',
      key: 'waterMark',
      dataIndex: 'waterMark',
    },
    {
      title: '注册来源',
      key: 'registerSource',
      dataIndex: 'registerSource',
      valueType: 'select',
      valueEnum: CONSUMER_SOURCE,
    },
    {
      title: '注册时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      fieldProps: {
        format: dateTimeFormat,
      },
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      span: 3,
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.EDIT_CONSUMER, 3)}
          requiredPermissions={[ROUTE_PERMISSION.EDIT_CONSUMER]}
        >
          <Button
            key="edit"
            color="primary" variant="text"
            onClick={() => {
              const encodedRedirectInfo = encodeRedirectInfo({
                pathname: ROUTE_KEY.CONSUMER_DETAIL,
                search: `?${ROUTE_PARAM_NAME.CONSUMER_ID}=${consumerId}&${ROUTE_PARAM_NAME.PAGE_TYPE}=2`,
                hash: '',
                state: null,
                key: ''
              })
              navigateTo(ROUTE_KEY.EDIT_CONSUMER,
                {
                  [ROUTE_PARAM_NAME.CONSUMER_ID]: consumerId,
                  [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                  [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
                });
            }}
          >
            编辑
          </Button>
        </PermissionWrapper>
      ]
    }
  ]

  // 表单样式
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }

  // 操作日志
  const columns: TableProps<IConsumerOffList>['columns'] = [
    {
      title: '操作时间',
      dataIndex: 'offTime',
      key: 'offTime',
      minWidth: 120,
      align: 'center',
      render: (offTime) => dayjs(offTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      minWidth: 120,
      align: 'center',
      render: (operation) => CONSUMER_OPERATION[operation].text,
    },
  ];

  const [offList, setOffList] = useState<IConsumerOffList[]>([]);
  // const [offTableLoading, setOffTableLoading] = useState(false);

  // useEffect(() => {
  //   if (consumerId && pageType === '2') {
  //     // setOffTableLoading(true);
  //     // getConsumerOffListAPI({
  //     //   id: consumerId,
  //     //   pageNo: 1,
  //     //   pageSize: 10
  //     // }).then((res) => {
  //     //   if (res.success) {
  //     //     setOffList(res.data);
  //     //   }
  //     // }).finally(() => {
  //     //   setOffTableLoading(false);
  //     // });
  //   }
  // }, [consumerId]);

  return (
    <>
      {
        pageType === '1' ? (
          <div
            className="staff-form-container"
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <ProForm<IConsumerList>
              {...formItemLayout}
              autoFocusFirstInput={false}
              formRef={formRef}
              layout="horizontal"
              style={{
                margin: '0 auto',
                marginTop: 20,
                maxWidth: 800,
              }}
              // grid={true}
              // rowProps={{
              //   gutter: [16, 0],
              // }}
              submitter={{
                render: (props, doms) => {
                  return (
                    <Row>
                      <Col span={14} offset={11}>
                        <Space>{doms}</Space>
                      </Col>
                    </Row>
                  )
                },
              }}
              onFinish={async (values) => {
                let res = null;
                if (consumerId) {
                  res = await consumerEditAPI({
                    ...values,
                    id: Number(consumerId),
                  })
                } else {
                  res = {
                    success: true,
                    errMsg: ''
                  }
                }
                if (res.success) {
                  message.success('提交成功');
                  if (redirectInfo) {
                    const redirect = decodeRedirectInfo(redirectInfo);
                    if (redirect.pathname === ROUTE_KEY.CONSUMER_LIST) {
                      if (consumerId) {
                        pureRemoveTab(ROUTE_KEY.EDIT_CONSUMER);
                      } else {
                        pureRemoveTab(ROUTE_KEY.ADD_CONSUMER);
                      }
                    } else if (redirect.pathname === ROUTE_KEY.CONSUMER_DETAIL) {
                      pureRemoveTab(ROUTE_KEY.EDIT_CONSUMER);
                    }
                    navigateTo(redirect.pathname, redirect.search, redirect.state);
                  }
                }
                // message.success('提交成功');
              }}
              params={{}}
              request={async () => {
                if (consumerId) {
                  const res = await getConsumerDetailAPI({
                    id: Number(consumerId)
                  })
                  if (res.success) {
                    return res.data;
                  }
                }
                return {} as IConsumerList;
              }}
            >
              <ProFormText
                name="nickname"
                label="用户昵称"
                placeholder="请输入"
                // colProps={{ md: 12, xl: 8 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('用户昵称不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormText
                fieldProps={{
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                label="手机号"
                name="mobile"
                placeholder="请输入"
                // colProps={{ xl: 8, md: 12 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value || !value.trim()) {
                        return Promise.reject('手机号不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  },
                ]}
              />
              <ProFormRadio.Group
                label="状态"
                name="status"
                options={Object.keys(CONSUMER_STATUS).map((key) => ({
                  label: CONSUMER_STATUS[Number(key)].text,
                  value: Number(key),
                }))}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (value !== 0 && !value) {
                        return Promise.reject('请选择状态！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormRadio.Group
                label="性别"
                name="sex"
                options={Object.keys(SEX).map((key) => ({
                  label: SEX[Number(key)].text,
                  value: Number(key),
                }))}
              />
              <ProFormTextArea
                label="备注"
                name="remark"
                fieldProps={{
                  maxLength: 20,
                  showCount: true,
                  autoSize: { minRows: 3, maxRows: 3 },
                }}
              />
            </ProForm>
          </div>
        ) : (
          <>
            <ProDescriptions
              title="用户详情"
              request={async () => {
                // 详情接口
                const res = await getConsumerDetailAPI({
                  id: Number(consumerId)
                })
                if (res.success) {
                  return Promise.resolve({
                    success: true,
                    data: res.data,
                  });
                }
                return Promise.reject({
                  success: false,
                  data: null,
                });
              }}
              emptyText={'-'}
              columns={descColumn}
            />
            <Table<IConsumerOffList>
              style={{
                marginTop: '20px',
                maxWidth: 600,
              }}
              title={() => (
                <div
                  style={{
                    fontWeight: 600,
                    color: '#000',
                    fontSize: 16,
                  }}
                >
                  操作日志
                </div>
              )}
              columns={columns}
              dataSource={offList}
              size='small'
              locale={{ emptyText: <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
            />
          </>
        )
      }
    </>
  )
}

export default ConsumerDetail
