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
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();
  const navigate = useNavigate();
  return (
      <LoginFormPage
        style={{
          minHeight: '100%',
          height: 'max-content',
          alignItems: 'center',
        }}
        // 表单提交
        onFinish={async (values) => {
          console.log('onFinish', values);
          // 调用登录接口
          // 跳转首页
          window.location.href = '/'
        }}
        // 表单请求参数
        params={{
          username: '',
          password: '',
        }}
        // 表单请求
        // request={async (params) => {
        //   console.log('request', params);
        //   return {
        //     data: {},
        //     success: true,
        //   };
        // }}
        // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        // logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Galaxy AI"
        containerStyle={{
          // backgroundColor: 'rgba(0, 0, 0,0.65)',
          // backdropFilter: 'blur(4px)',
        }}
        subTitle="AI获客助手"
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
                  required: true,
                  message: '请输入用户名!',
                },
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
                  required: true,
                  message: '请输入密码！',
                },
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
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <Button
            type="link"
            style={{
              float: 'right',
            }}
            onClick={() => {
              navigate('/resetPassword')
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