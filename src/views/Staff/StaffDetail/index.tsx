import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Result, Button, Descriptions } from 'antd'
import { ROUTE_PARAM_NAME } from '@/utils/constants'
import { getLocationParamsByName } from '@/utils/location'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ProForm,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDigit,
  ProFormInstance,
} from '@ant-design/pro-components'
import { Row, Col, Space, message, DescriptionsProps } from 'antd'
import { STAFF_ROLE, STAFF_CERTIFICATE_TYPE, STAFF_GENDER, STAFF_EDUCATION, STAFF_MARRIAGE_STATUS } from '@/utils/constants'
import { MobileOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import { IStaffListResponse } from '@/api/type/staff'
import PermissionWrapper from '@/components/permission/PermissionWrapper'
import { ROUTE_KEY, ROUTE_PERMISSION } from '@/utils/constants'
import { useRoutesHook } from '@/hooks/useRoutes'

interface IProps {
  children?: ReactNode
}

const StaffDetail: FC<IProps> = (_props) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo, getRouteRole, switchTab, pureRemoveTab } = useRoutesHook();
  const pageType = getLocationParamsByName(location, ROUTE_PARAM_NAME.PAGE_TYPE);
  const staffId = getLocationParamsByName(location, ROUTE_PARAM_NAME.STAFF_ID);
  const redirect = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT);
  const formRef = useRef<ProFormInstance<any>>(null);
  const [staffInfo, setStaffInfo] = useState<IStaffListResponse>({} as IStaffListResponse);
  useEffect(() => {
    if (staffId && pageType === '2') {
      setStaffInfo({
        id: Number(staffId),
        staffNumber: '1234567890',
        staffName: '张三',
        staffStatus: true,
        staffMobile: '1234567890',
        staffDepartmentName: '技术部',
        staffPositionName: '技术员',
        staffRole: 'super',
        staffCreateTime: 1715404800,
        staffUpdateTime: 1715404800,
        staffDeleteTime: 1715404800,
        certificateType: 1,
        certificateNumber: '1234567890',
        staffGender: 1,
        education: 3,
        marriageStatus: 1,
        email: '1234567890@qq.com',
        remark: '备注',
      })
    }
  }, [])
  const staffInfoItems: DescriptionsProps['items'] = (staffId && pageType === '2') ? [
    {
      key: 'staffNumber',
      label: '员工编号',
      children: staffInfo.staffNumber,
    },
    {
      key: 'staffName',
      label: '员工姓名',
      children: staffInfo.staffName,
    },
    {
      key: 'staffDepartmentName',
      label: '员工部门',
      children: staffInfo.staffDepartmentName,
    },
    {
      key: 'staffPositionName',
      label: '员工职位',
      children: staffInfo.staffPositionName,
    },

    {
      key: 'staffRole',
      label: '员工角色',
      children: STAFF_ROLE[staffInfo.staffRole]?.name || '未知',
    },
    {
      key: 'staffMobile',
      label: '手机号',
      children: (
        <>
          {staffInfo.staffMobile}
        </>
      ),
    },
    {
      key: 'certificateType',
      label: '证件类型',
      children: STAFF_CERTIFICATE_TYPE[staffInfo.certificateType],
    },
    {
      key: 'certificateNumber',
      label: '证件号码',
      children: staffInfo.certificateNumber,
    },
    {
      key: 'staffCreateTime',
      label: '入职日期',
      children: staffInfo.staffCreateTime,
    },
    {
      key: 'staffGender',
      label: '性别',
      children: STAFF_GENDER[staffInfo.staffGender || 0] || '未知',
    },
    {
      key: 'education',
      label: '学历',
      children: STAFF_EDUCATION[staffInfo.education || 0] || '未知',
    },
    {
      key: 'marriageStatus',
      label: '婚姻状态',
      children: STAFF_MARRIAGE_STATUS[staffInfo.marriageStatus || 0] || '未知',
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
            <ProForm<IStaffListResponse>
              autoFocusFirstInput={false}
              formRef={formRef}
              layout="vertical"
              grid={true}
              rowProps={{
                gutter: [16, 0],
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
                console.log(values);
                message.success('提交成功');
                if (redirect) {
                  pureRemoveTab(ROUTE_KEY.EDIT_STAFF);
                  switchTab(ROUTE_KEY.STAFF_DETAIL);
                }
              }}
              params={{}}
              request={async () => {
                if (staffId) {
                  return {
                    id: Number(staffId),
                    staffNumber: '1234567890',
                    staffName: '张三',
                    staffStatus: true,
                    staffMobile: '1234567890',
                    staffDepartmentName: '技术部',
                    staffPositionName: '技术员',
                    staffRole: 'super',
                    staffCreateTime: 1715404800,
                    staffUpdateTime: 1715404800,
                    staffDeleteTime: 1715404800,
                    certificateType: 1,
                    certificateNumber: '1234567890',
                    // staffGender: 1,
                    // education: 3,
                    // marriageStatus: 1,
                    // email: '1234567890@qq.com',
                    // remark: '备注',
                  }
                }
                return {} as IStaffListResponse;
              }}
            >
              <ProFormText
                name="staffNumber"
                label="员工编号"
                tooltip="最长为 24 位"
                placeholder="请输入"
                colProps={{ md: 12, xl: 8 }}
                rules={[
                  {
                    required: true,
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
                name="staffName"
                label="员工姓名"
                placeholder="请输入"
                colProps={{ md: 12, xl: 8 }}
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
                name="staffDepartmentName"
                label="员工部门"
                placeholder="请输入"
                colProps={{ md: 12, xl: 8 }}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('员工部门不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormText
                name="staffPositionName"
                label="员工职位"
                placeholder="请输入"
                colProps={{ md: 12, xl: 8 }}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('员工职位不能为空！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormSelect
                name="staffRole"
                label="员工角色"
                colProps={{ md: 12, xl: 8 }}
                options={Object.keys(STAFF_ROLE).map((key) => ({
                  label: STAFF_ROLE[key].name,
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
                name="staffMobile"
                placeholder="请输入"
                colProps={{ xl: 8, md: 12 }}
                rules={[
                  {
                    required: true,
                    validator: (_rule, value) => {
                      if (!value) {
                        return Promise.reject('手机号不能为空！')
                      }
                      if (value && value.length === 15020202020) {
                        return Promise.reject('该手机号已存在！')
                      }
                      return Promise.resolve()
                    },
                    validateTrigger: ['onSubmit', 'onFinish'],
                  }
                ]}
              />
              <ProFormSelect
                label="证件类型"
                name="certificateType"
                colProps={{ xl: 8, md: 12 }}
                options={Object.keys(STAFF_CERTIFICATE_TYPE).map((key) => ({
                  label: STAFF_CERTIFICATE_TYPE[Number(key)],
                  value: key,
                }))}
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
                name="certificateNumber"
                colProps={{ xl: 8, md: 12 }}
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
                colProps={{ xl: 8, md: 12 }}
                options={Object.keys(STAFF_EDUCATION).map((key) => ({
                  label: STAFF_EDUCATION[Number(key)],
                  value: key,
                }))}
              />
              <ProFormSelect
                label="婚姻状态"
                name="marriageStatus"
                colProps={{ xl: 8, md: 12 }}
                options={Object.keys(STAFF_MARRIAGE_STATUS).map((key) => ({
                  label: STAFF_MARRIAGE_STATUS[Number(key)],
                  value: key,
                }))}
              />
              <ProFormText
                label="邮箱"
                name="email"
                colProps={{ xl: 8, md: 12 }}
              />
              <ProFormSelect
                label="性别"
                name="staffGender"
                colProps={{ xl: 8, md: 12 }}
                options={Object.keys(STAFF_GENDER).map((key) => ({
                  label: STAFF_GENDER[Number(key)],
                  value: key,
                }))}
              />
              <ProFormDatePicker
                label="入职日期"
                name="staffCreateTime"
                className="staff-form-date-picker"
                colProps={{ xl: 8, md: 12 }}
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
            layout="vertical"
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
                    navigateTo(ROUTE_KEY.EDIT_STAFF,
                      {
                        [ROUTE_PARAM_NAME.STAFF_ID]: staffId,
                        [ROUTE_PARAM_NAME.PAGE_TYPE]: '1',
                        [ROUTE_PARAM_NAME.REDIRECT]: '1',
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
