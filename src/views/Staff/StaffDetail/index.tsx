import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Descriptions, Spin } from 'antd'
import { ROUTE_PARAM_NAME, STAFF_ROLE_NAME } from '@/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
  ProFormInstance,
} from '@ant-design/pro-components'
import {
  Row,
  Col,
  Space,
  App,
  DescriptionsProps
} from 'antd'
import {
  STAFF_ROLE,
  CERTIFICATE_TYPE,
  SEX,
  EDUCATION,
  MARRIAGE,
  SEX_NAME,
  EDUCATION_NAME,
  MARRIAGE_NAME
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
import { getStaffDetailAPI, editStaffAPI, addStaffAPI, assignStaffRoleAPI } from '@/api/staff'
import { decodeRedirectInfo, encodeRedirectInfo } from '@/utils/auth'
import CopyComponent from '@/components/copy'
import { isLetterAndNumber } from '@/utils/reg'

interface IProps {
  children?: ReactNode
}

const StaffDetail: FC<IProps> = (_props) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo, getRouteRole, switchTab, pureRemoveTab } = useLayout();
  const pageType = getLocationParamsByName(location, ROUTE_PARAM_NAME.PAGE_TYPE);
  const staffId = getLocationParamsByName(location, ROUTE_PARAM_NAME.STAFF_ID);
  const redirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO);
  const formRef = useRef<ProFormInstance<any>>(null);
  const [staffInfo, setStaffInfo] = useState<IStaffList>({} as IStaffList);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (staffId && pageType === '2') {
      setLoading(true);
      getStaffDetailAPI({
        id: Number(staffId)
      }).then((res) => {
        if (res.success) {
          setStaffInfo(res.data)
        }
      }).finally(() => {
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
  }, [location.pathname])
  const staffInfoItems: DescriptionsProps['items'] = (staffId && pageType === '2') ? [
    {
      key: 'username',
      label: '员工编号',
      children: staffInfo.username,
    },
    {
      key: 'nickname',
      label: '员工姓名',
      children: staffInfo.nickname,
    },
    {
      key: 'deptName',
      label: '员工部门',
      children: staffInfo.deptName,
    },
    {
      key: 'staffPositionName',
      label: '员工职位',
      children: staffInfo.staffPositionName,
    },
    {
      key: 'staffRole',
      label: '员工角色',
      children: STAFF_ROLE[staffInfo.staffRole].text,
    },
    {
      key: 'mobile',
      label: '手机号',
      children: (
        <CopyComponent copyText={staffInfo.mobile} />
      ),
    },
    {
      key: 'idType',
      label: '证件类型',
      children: CERTIFICATE_TYPE[staffInfo.idType].text,
    },
    {
      key: 'idNumber',
      label: '证件号码',
      children: staffInfo.idNumber,
    },
    {
      key: 'hireDate',
      label: '入职日期',
      children: staffInfo.hireDate?.join('-'),
    },
    {
      key: 'sex',
      label: '性别',
      children: SEX[staffInfo.sex || SEX_NAME.SEX_SECRET].text,
    },
    {
      key: 'education',
      label: '学历',
      children: EDUCATION[staffInfo.education || EDUCATION_NAME.EDUCATION_OTHER].text,
    },
    {
      key: 'marriageStatus',
      label: '婚姻状态',
      children: MARRIAGE[staffInfo.marriageStatus || MARRIAGE_NAME.MARRIAGE_SINGLE].text,
    },
    {
      key: 'email',
      label: '邮箱',
      children: staffInfo.email,
    },
    {
      key: 'remark',
      label: '备注',
      children: staffInfo.remark,
    },
  ] : []

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
            <ProForm<IStaffList>
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
                // console.log('values', values);

                let res = null;
                if (staffId) {
                  // 修改员工角色
                  const assignStaffRoleRes = await assignStaffRoleAPI({
                    userId: Number(staffId),
                    roleIds: [STAFF_ROLE[STAFF_ROLE_NAME.SUPER].id!, STAFF_ROLE[values.staffRole].id!],
                  })
                  if (!assignStaffRoleRes.success) {
                    return;
                  }
                  // 修改员工信息
                  res = await editStaffAPI({
                    ...values,
                    employeeNo: values.username.toUpperCase(),
                    id: Number(staffId),
                  })
                } else {
                  res = await addStaffAPI({
                    ...values,
                    employeeNo: values.username.toUpperCase(),
                    password: 'fusheng@' + values.username, // 初始密码
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
                // message.success('提交成功');
              }}
              params={{}}
              request={async () => {
                if (staffId) {
                  const res = await getStaffDetailAPI({
                    id: Number(staffId)
                  })
                  if (res.success) {
                    return res.data
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
                // colProps={{ md: 12, xl: 8 }}
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
                      if (value && value.length === 15020202020) {
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
                name="hireDate"
                className="staff-form-date-picker"
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
                fieldProps={{
                  maxLength: 20,
                  showCount: true,
                  autoSize: { minRows: 3, maxRows: 3 },
                }}
              />
            </ProForm>
          </div>
        ) : (
          <Descriptions
            title="员工信息"
            // layout="vertical"
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            extra={
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
              </PermissionWrapper>
            }
            items={staffInfoItems}
          />
        )
      }
    </>
  )
}

export default StaffDetail
