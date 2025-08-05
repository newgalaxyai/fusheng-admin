import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProFormInstance
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, theme, App } from 'antd';
import type { CSSProperties } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRememberMe, setRememberMe, setAccessToken, setRefreshToken, setAccountPassword, getAccountPassword } from '@/utils/storge';
import { getLocationParamsByName } from '@/utils/location';
import { ROUTE_PARAM_NAME, ROUTE_PATH } from '@/constants';
import { loginAPI, phoneLoginAPI, sendMobileCodeAPI } from '@/api/login';
import { decodeRedirectInfo } from '@/utils/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore';
// import { getLoginInfoAsync, getLoginPermissionInfoAsync } from '@/redux/asyncs/login';
import { LoginBg } from '@/assets/img';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const loginForm = useRef<ProFormInstance<any>>(null);
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const {
    user: {
      userInfo,
      userRole
    }
  } = useAppSelector(state => state);
  // 登录类型
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const rememberMe = getRememberMe();
    if (rememberMe) {
      const loginData = getAccountPassword()
      if (loginData) {
        // console.log('loginData', loginData);
        loginForm.current?.setFieldsValue({
          ...loginData,
          rememberMe: rememberMe === 'true'
        })
      }
    }
  }, []);

  return (
    <LoginFormPage
      formRef={loginForm}
      style={{
        minHeight: '100%',
        height: 'max-content',
        // alignItems: 'center',
        paddingTop: '50px',
        boxSizing: 'border-box',
      }}
      // 表单提交
      onFinish={async (values) => {
        let loginRes
        // console.log('valus', values);
        if (loginType === 'account') {
          const queryParams = {
            username: values.username,
            password: values.password,
          };
          if (values.rememberMe) {
            setAccountPassword(queryParams);
          }
          // 调用登录接口
          loginRes = await loginAPI(queryParams);
        } else {
          loginRes = await phoneLoginAPI(
            {
              mobile: values.mobile,
              code: values.captcha,
            }
          )
        }
        if (loginRes.success) {
          setAccessToken(loginRes.data.accessToken)
          setRefreshToken(loginRes.data.refreshToken)
          // dispatch(getLoginInfoAsync())
          // dispatch(getLoginPermissionInfoAsync())
          message.success('登录成功');
        } else {
          return;
        }
        const encodedRedirectInfo = getLocationParamsByName(location, ROUTE_PARAM_NAME.REDIRECT_INFO)
        if (encodedRedirectInfo) {
          const paramsRedirect = decodeRedirectInfo(encodedRedirectInfo)
          navigate(paramsRedirect.pathname + (paramsRedirect.search || '') + (paramsRedirect.hash || ''), { replace: true, state: paramsRedirect.state })
        } else {
          navigate(ROUTE_PATH.HOME, { replace: true })
        }
      }}
      // 表单请求入参
      // params={{
      //   username: '',
      //   password: '',
      //   mobile: '',
      //   captcha: '',
      // }}
      // 表单请求
      // request={async (params, props) => {
      //   console.log('params', params);
      //   console.log('props', props);
      //   return {
      //     data: {},
      //     success: true,
      //   };
      // }}
      backgroundImageUrl={LoginBg}
      // logo={LoginLogo}
      // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
      title="New Galaxy AI"
      containerStyle={{
        // backgroundColor: 'rgba(0, 0, 0,0.65)',
        backdropFilter: 'blur(4px)',
      }}
      subTitle="后台管理系统"
    // 左侧广告配置
    // activityConfig={{
    //   style: {
    //     boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
    //     color: token.colorTextHeading,
    //     borderRadius: 8,
    //     backgroundColor: 'rgba(255,255,255,0.25)',
    //     backdropFilter: 'blur(4px)',
    //   },
    //   title: '活动标题，可配置图片',
    //   subTitle: '活动介绍说明文字',
    //   action: (
    //     <Button
    //       size="large"
    //       style={{
    //         borderRadius: 20,
    //         background: token.colorBgElevated,
    //         color: token.colorPrimary,
    //         width: 120,
    //       }}
    //     >
    //       去看看
    //     </Button>
    //   ),
    // }}
    // 登录表单底部其他登录方式配置
    // actions={
    //   <div
    //     style={{
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       flexDirection: 'column',
    //     }}
    //   >
    //     <Divider plain>
    //       <span
    //         style={{
    //           color: token.colorTextPlaceholder,
    //           fontWeight: 'normal',
    //           fontSize: 14,
    //         }}
    //       >
    //         其他登录方式
    //       </span>
    //     </Divider>
    //     <Space align="center" size={24}>
    //       <div
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           flexDirection: 'column',
    //           height: 40,
    //           width: 40,
    //           border: '1px solid ' + token.colorPrimaryBorder,
    //           borderRadius: '50%',
    //         }}
    //       >
    //         <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
    //       </div>
    //       <div
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           flexDirection: 'column',
    //           height: 40,
    //           width: 40,
    //           border: '1px solid ' + token.colorPrimaryBorder,
    //           borderRadius: '50%',
    //         }}
    //       >
    //         <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
    //       </div>
    //       <div
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           flexDirection: 'column',
    //           height: 40,
    //           width: 40,
    //           border: '1px solid ' + token.colorPrimaryBorder,
    //           borderRadius: '50%',
    //         }}
    //       >
    //         <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
    //       </div>
    //     </Space>
    //   </div>
    // }
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeLoginType) => setLoginType(activeLoginType as LoginType)}
        items={[
          {
            key: 'account',
            label: '账号密码登录',
          },
          {
            key: 'phone',
            label: '手机号登录',
          },
        ]}
      />
      {loginType === 'account' && (
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                validator: (_rule, value) => {
                  if (!value || !value.trim()) {
                    // console.log('用户名不能为空!')
                    return Promise.reject('用户名不能为空!')
                  }
                  return Promise.resolve()
                },
                validateTrigger: ['onSubmit', 'onFinish'],
              }
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                validator: (_rule, value) => {
                  if (!value || !value.trim()) {
                    return Promise.reject('密码不能为空!')
                  }
                  return Promise.resolve()
                },
                validateTrigger: ['onSubmit', 'onFinish'],
              }
            ]}
          />
        </>
      )}
      {loginType === 'phone' && (
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: (
                <MobileOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            name="mobile"
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码'}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            name="captcha"
            phoneName='mobile'
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (mobile) => {
              const captchaRes = await sendMobileCodeAPI({
                mobile,
                scene: 21
              })
              if (captchaRes.success && captchaRes.data) {
                message.success('获取验证码成功！');
              }
            }}
          />
        </>
      )}
      <div
        style={{
          marginBlockEnd: 24,
        }}
      >
        {
          loginType === 'account' && (
            <ProFormCheckbox
              noStyle
              name="rememberMe"
              fieldProps={{
                onChange: (e) => {
                  setRememberMe(e.target.checked)
                }
              }}
            >
              记住我
            </ProFormCheckbox>
          )
        }
        <Button
          type="link"
          style={{
            float: 'right',
          }}
          onClick={() => {
            navigate(ROUTE_PATH.RESET)
          }}
        >
          忘记密码
        </Button>
      </div>
    </LoginFormPage>
  );
};

export default () => {
  return (
    <ProConfigProvider>
      <Page />
    </ProConfigProvider>
  );
};