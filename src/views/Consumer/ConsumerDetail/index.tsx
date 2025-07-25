import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Descriptions, Spin } from 'antd'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-components'
import {
  Row, Col, Space, DescriptionsProps, Avatar, App, Table,
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
  CONSUMER_OPERATION
} from '@/constants'
import {
  MobileOutlined,
  UserOutlined
} from '@ant-design/icons'
import { theme } from 'antd'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import { useLayout } from '@/hooks/useLayout';
import { decodeRedirectInfo, encodeRedirectInfo } from '@/utils/auth'
import { IConsumerList, IConsumerOffList } from '@/api/type'
import dayjs from 'dayjs'
import CopyComponent from '@/components/copy'
import { getConsumerDetailAPI } from '@/api/consumer'

interface IProps {
  children?: ReactNode
}

const ConsumerDetail: FC<IProps> = (_props) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo, getRouteRole, switchTab, pureRemoveTab } = useLayout();
  const pageType = getLocationParamsByName(location, ROUTE_PARAM_NAME.PAGE_TYPE);
  const consumerId = getLocationParamsByName(location, ROUTE_PARAM_NAME.CONSUMER_ID);
  const redirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO);
  const formRef = useRef<ProFormInstance<any>>(null);
  const [consumerInfo, setConsumerInfo] = useState<IConsumerList>({} as IConsumerList);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (consumerId && pageType === '2') {
      setLoading(true);
      getConsumerDetailAPI({
        id: Number(consumerId)
      }).then((res) => {
        if (res.success) {
          setConsumerInfo(res.data || {} as IConsumerList)
        }
      }).finally(() => {
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
  }, [])
  // 描述列表
  const consumerInfoItems: DescriptionsProps['items'] = (consumerId && pageType === '2') ? [
    {
      key: 'avatar',
      label: '用户头像',
      children: (
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
          icon={<UserOutlined />}
          src={consumerInfo.avatar}
        />
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
    },
    {
      key: 'sex',
      label: '性别',
      children: SEX[consumerInfo.sex || 0].text || '未知',
    },
    {
      key: 'openid',
      label: '用户编号',
      children: (
        <CopyComponent copyText={consumerInfo.openid} />
      ),
    },
    {
      key: 'nickname',
      label: '用户昵称',
      children: consumerInfo.nickname,
    },
    {
      key: 'mobile',
      label: '手机号',
      children: (
        <CopyComponent copyText={consumerInfo.mobile} />
      ),
    },
    {
      key: 'loginIp',
      label: '最后登录IP',
      children: consumerInfo.loginIp,
    },
    {
      key: 'loginCity',
      label: '城市',
      children: consumerInfo.loginCity,
    },
    {
      key: 'compareCompany',
      label: '关联企业',
      children: consumerInfo.compareCompany,
    },
    {
      key: 'consumerPositionName',
      label: '职位',
      children: consumerInfo.consumerPositionName,
    },
    {
      key: 'waterMark',
      label: '水印编号',
      children: consumerInfo.waterMark,
    },
    {
      key: 'registerSource',
      label: '注册来源',
      children: CONSUMER_SOURCE[consumerInfo.registerSource].text,
    },
    {
      key: 'createTime',
      label: '注册时间',
      children: dayjs(consumerInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
      span: 2,
    },
    {
      key: 'remark',
      label: '备注',
      children: consumerInfo.remark,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }
    },
  ] : []

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
  const [offTableLoading, setOffTableLoading] = useState(false);

  useEffect(() => {
    if (consumerId && pageType === '2') {
      // setOffTableLoading(true);
      // getConsumerOffListAPI({
      //   id: consumerId,
      //   pageNo: 1,
      //   pageSize: 10
      // }).then((res) => {
      //   if (res.success) {
      //     setOffList(res.data);
      //   }
      // }).finally(() => {
      //   setOffTableLoading(false);
      // });
    }
  }, [consumerId]);

  return (
    <>
      {
        loading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin spinning={true} tip="加载中..." />
          </div>
        ) : pageType === '1' ? (
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
                } else {
                }
                res = {
                  success: true,
                  errMsg: ''
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
                  const res = {
                    success: true
                  }
                  if (res.success) {
                    return {
                      id: 1,
                      openid: 'USER00000001',
                      nickname: '测试用户',
                      consumerStatus: true,
                      mobile: '12345678901',
                      compareCompany: '上海测试公司',
                      consumerPositionName: '董事长',
                      registerSource: 1,
                      // registerTime: 1672531200000,
                      waterMark: 1,
                      loginIp: '192.168.1.1',
                      loginCity: '上海',
                      createTime: 1672531200000,
                      updateTime: 1672531200000,
                      sex: 1,
                      remark: '备注',
                    }
                  } else {
                    return {} as IConsumerList
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
                      if (!value) {
                        return Promise.reject('手机号不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  },
                  // {
                  //   validator: (_rule, value) => {
                  //     if (value && value.length === 15020202020) {
                  //       return Promise.reject('该手机号已存在！')
                  //     }
                  //     return Promise.resolve()
                  //   },
                  //   validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                  // }
                ]}
              />
              <ProFormSelect
                label="性别"
                name="sex"
                // colProps={{ xl: 8, md: 12 }}
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
            <Descriptions
              title="用户信息"
              // layout="vertical"
              bordered
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              extra={
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
              }
              items={consumerInfoItems}
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
