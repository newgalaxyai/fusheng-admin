import React, { useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Tag } from 'antd'
import { ROUTE_PARAM_NAME, STATUS } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
  ProFormInstance,
  ProDescriptions,
  ProDescriptionsItemProps
} from '@ant-design/pro-components'
import {
  Row,
  Col,
  Space,
  App,
} from 'antd'
import {
  STAFF_ROLE,
  CERTIFICATE_TYPE,
  SEX,
  EDUCATION,
  MARRIAGE,
} from '@/constants'
import {
  MobileOutlined,
} from '@ant-design/icons'
import { theme } from 'antd'
import {
  IStaffList,
} from '@/api/type'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import { ROUTE_KEY, ROUTE_PERMISSION } from '@/constants'
import { useLayout } from '@/hooks/useLayout';
import { getStaffDetailAPI, editStaffAPI, addStaffAPI, getStaffRolesAPI } from '@/api/staff'
import { decodeRedirectInfo, encodeRedirectInfo } from '@/utils/auth'
import { isLetterAndNumber } from '@/utils/reg'
import { getIDStaffRole } from '@/utils/staff'
import dayjs from 'dayjs'

interface IProps {
  children?: ReactNode
}

const StaffDetail: FC<IProps> = (_props) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const { navigateTo, getRouteRole, pureRemoveTab } = useLayout();
  const pageType = getLocationParamsByName(location, ROUTE_PARAM_NAME.PAGE_TYPE);
  const staffId = getLocationParamsByName(location, ROUTE_PARAM_NAME.STAFF_ID);
  const redirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO);
  const formRef = useRef<ProFormInstance<any>>(null);

  // 描述列表column
  const descColumn: ProDescriptionsItemProps<IStaffList>[] = [
    {
      title: '员工编号',
      key: 'username',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '员工姓名',
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
      title: '员工状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS,
    },
    {
      dataIndex: 'staffRole',
      title: '员工角色',
      valueType: 'select',
      valueEnum: STAFF_ROLE,
    },
    {
      title: '员工手机号',
      key: 'mobile',
      dataIndex: 'mobile',
      copyable: true,
    },
    {
      title: '员工部门',
      key: 'deptName',
      dataIndex: 'deptName',
    },
    {
      title: '员工职位',
      key: 'staffPositionName',
      dataIndex: 'staffPositionName',
    },
    {
      title: '证件类型',
      key: 'idType',
      dataIndex: 'idType',
      valueType: 'select',
      valueEnum: CERTIFICATE_TYPE,
    },
    {
      title: '证件号码',
      key: 'idNumber',
      dataIndex: 'idNumber',
    },
    {
      title: '入职日期',
      key: 'hireDate',
      dataIndex: 'hireDate',
      render: (_, record) => record.hireDate?.join('-'),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_dom, _record, _, action) => [
        <PermissionWrapper
          requiredRole={getRouteRole(ROUTE_KEY.EDIT_STAFF, 3)}
          requiredPermissions={[ROUTE_PERMISSION.EDIT_STAFF]}
        >
          <Button
            key="edit"
            color="primary" variant="text"
            onClick={() => {
              const encodedRedirectInfo = encodeRedirectInfo({
                pathname: ROUTE_KEY.STAFF_DETAIL,
                search: `?${ROUTE_PARAM_NAME.STAFF_ID}=${staffId}&${ROUTE_PARAM_NAME.PAGE_TYPE}=2`,
                hash: '',
                state: null,
                key: ''
              })
              navigateTo(ROUTE_KEY.EDIT_STAFF,
                {
                  [ROUTE_PARAM_NAME.STAFF_ID]: staffId,
                  [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                  [ROUTE_PARAM_NAME.REDIRECT_INFO]: encodedRedirectInfo,
                });
            }}
          >
            编辑
          </Button>
        </PermissionWrapper>,
        <Button
          key="refresh"
          type='primary'
          size='small'
          onClick={() => {
            action?.reload();
          }}
        >
          刷新
        </Button>,
        <Button
          key="refresh"
          type='default'
          size='small'
          onClick={() => {
            navigate(-1)
          }}
        >
          返回
        </Button>
      ],
    },
  ]

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
            <ProForm<IStaffList>
              autoFocusFirstInput={false}
              formRef={formRef}
              layout="vertical"
              grid={true}
              rowProps={{
                gutter: [16, 0],
              }}
              colProps={{
                xs: 24,
                sm: 12,
                md: 8,
                lg: 6,
                xl: 6,
                xxl: 6,
              }}
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
                if (staffId) {
                  // 修改员工信息
                  res = await editStaffAPI({
                    ...values,
                    hireDate: values.hireTime,
                    employeeNo: values.username.toUpperCase(),
                    id: Number(staffId),
                  })
                } else {
                  res = await addStaffAPI({
                    ...values,
                    hireDate: values.hireTime,
                    employeeNo: values.username.toUpperCase(),
                    password: 'fusheng', // 初始密码
                  })
                }
                if (res.success) {
                  message.success('提交成功');
                  if (redirectInfo) {
                    const redirect = decodeRedirectInfo(redirectInfo);
                    if (redirect.pathname === ROUTE_KEY.STAFF_LIST) {
                      if (staffId) {
                        pureRemoveTab(ROUTE_KEY.EDIT_STAFF);
                      } else {
                        pureRemoveTab(ROUTE_KEY.ADD_STAFF);
                      }
                    } else if (redirect.pathname === ROUTE_KEY.STAFF_DETAIL) {
                      pureRemoveTab(ROUTE_KEY.EDIT_STAFF);
                    }
                    navigateTo(redirect.pathname, redirect.search, redirect.state);
                  }
                }
              }}
              params={{}}
              request={async () => {
                if (staffId) {
                  const res = await getStaffDetailAPI({
                    id: Number(staffId)
                  })
                  if (res.success) {
                    const data = {
                      ...res.data,
                      hireTime: res.data.hireDate ? dayjs(res.data.hireDate?.join('-')).unix() * 1000 : undefined,
                    }
                    return data
                  } else {
                    return {} as IStaffList
                  }
                }
                return {} as IStaffList;
              }}
            >
              <ProFormText
                name="username"
                label="员工编号"
                tooltip="最长为 20 位，只允许包含字母与数字！"
                placeholder="请输入"
                // colProps={{ md: 8, xl: 8 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur', 'onChange']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!isLetterAndNumber(value)) {
                        return Promise.reject('只允许包含字母与数字！');
                      }
                      if (value && value.length && value.length > 20) {
                        return Promise.reject('员工编号最长20位！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish', 'onChange'],
                  },
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (value && value === '1') {
                        return Promise.reject('该员工编号已存在！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                  },
                  {
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('员工编号不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormText
                name="nickname"
                label="员工姓名"
                placeholder="请输入"
                // colProps={{ md: 12, xl: 8 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('员工姓名不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormText
                name="deptName"
                label="员工部门"
                placeholder="请输入"
              // colProps={{ md: 12, xl: 8 }}
              // rules={[
              //   {
              //     required: true,
              //     validator: (_rule, value) => {
              //       if (!value) {
              //         return Promise.reject('员工部门不能为空！')
              //       }
              //       return Promise.resolve()
              //     },
              //     validateTrigger: ['onSubmit', 'onFinish'],
              //   }
              // ]}
              />
              <ProFormText
                name="staffPositionName"
                label="员工职位"
                placeholder="请输入"
              // colProps={{ md: 12, xl: 8 }}
              // rules={[
              //   {
              //     required: true,
              //     validator: (_rule, value) => {
              //       if (!value) {
              //         return Promise.reject('员工职位不能为空！')
              //       }
              //       return Promise.resolve()
              //     },
              //     validateTrigger: ['onSubmit', 'onFinish'],
              //   }
              // ]}
              />
              {/* <ProFormSelect
                name="staffRole"
                label="员工角色"
                colProps={{ md: 12, xl: 8 }}
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
              /> */}
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
                  {
                    validator: (_rule, value) => {
                      if (value && value.length && value === '15020202020') {
                        return Promise.reject('该手机号已存在！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                  }
                ]}
              />
              <ProFormSelect
                label="证件类型"
                name="idType"
                // colProps={{ xl: 8, md: 12 }}
                options={Object.keys(CERTIFICATE_TYPE).map((key) => ({
                  label: CERTIFICATE_TYPE[key].text,
                  value: key,
                }))}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('证件类型不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormText
                label="证件号码"
                name="idNumber"
                // colProps={{ xl: 8, md: 12 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('证件号码不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormSelect
                label="学历"
                name="education"
                // colProps={{ xl: 8, md: 12 }}
                options={Object.keys(EDUCATION).map((key) => ({
                  label: EDUCATION[key].text,
                  value: key,
                }))}
              />
              <ProFormSelect
                label="婚姻状态"
                name="marriageStatus"
                // colProps={{ xl: 8, md: 12 }}
                options={Object.keys(MARRIAGE).map((key) => ({
                  label: MARRIAGE[key].text,
                  value: key,
                }))}
              />
              <ProFormText
                label="邮箱"
                name="email"
              // colProps={{ xl: 8, md: 12 }}
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
              <ProFormDatePicker
                label="入职日期"
                name="hireTime"
                // colProps={{ xl: 8, md: 12 }}
                validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                rules={[
                  {
                    required: true,
                    validator: (_rule: any, value: any) => {
                      if (!value) {
                        return Promise.reject('入职日期不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormTextArea
                label="备注"
                name="remark"
                colProps={{
                  span: 24
                }}
                fieldProps={{
                  maxLength: 20,
                  showCount: true,
                  autoSize: { minRows: 3, maxRows: 3 },
                }}
              />
            </ProForm>
          </div>
        ) : (
          <ProDescriptions
            title="员工详情"
            request={async () => {
              // 详情接口
              const res = await getStaffDetailAPI({
                id: Number(staffId)
              })
              if (res.success) {
                // 角色接口
                const rolesRes = await getStaffRolesAPI({
                  userId: res.data.id,
                })
                if (rolesRes.success) {
                  // 角色接口返回值处理
                  res.data.staffRole = getIDStaffRole(rolesRes.data) as any;
                  return Promise.resolve({
                    success: true,
                    data: res.data,
                  });
                }
              }
              return Promise.reject({
                success: false,
                data: null,
              });
            }}
            emptyText={'-'}
            columns={descColumn}
          />
        )
      }
    </>
  )
}

export default StaffDetail
