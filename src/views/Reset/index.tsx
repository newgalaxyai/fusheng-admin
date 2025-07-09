import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ProForm,
    ProFormText,
    StepsForm,
    ProFormCaptcha,
} from '@ant-design/pro-components';
import { Button, Card, message, Result, theme } from 'antd';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { LOGIN_PATH } from '@/utils/constants';

export default () => {
    const navigate = useNavigate();
    const stepsFormRef = useRef<ProFormInstance>();
    const { token } = theme.useToken();

    return (
        <div
            className='reset-password-container'
        >
            <Card
                title="重置密码"
                extra={<Button type="link" onClick={() => {
                    navigate(LOGIN_PATH)
                }}>返回登录</Button>}
                className='reset-password-card'
            >
                <StepsForm<{
                    name: string;
                }>
                    formRef={stepsFormRef}
                    submitter={{
                        render: (_props, _dom) => {
                            return []
                        }
                    }}
                >
                    <StepsForm.StepForm<{
                        name: string;
                    }>
                        name="base"
                        title="身份验证"
                        onFinish={async () => {
                            console.log(stepsFormRef.current?.getFieldsValue());
                            return true;
                        }}
                    >
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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入手机号！',
                            //     },
                            //     {
                            //         pattern: /^1\d{10}$/,
                            //         message: '手机号格式错误！',
                            //     },
                            // ]}
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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: '请输入验证码！',
                            //     },
                            // ]}
                            onGetCaptcha={async () => {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                        <ProForm.Item>
                            <Button
                                type="primary"
                                onClick={() => {
                                    stepsFormRef.current?.submit();
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                下一步
                            </Button>
                        </ProForm.Item>
                    </StepsForm.StepForm>
                    <StepsForm.StepForm<{
                        checkbox: string;
                    }>
                        name="checkbox"
                        title="重置密码"
                        onFinish={async () => {
                            console.log(stepsFormRef.current?.getFieldsValue());
                            return true;
                        }}
                    >
                        <ProFormText.Password
                            name="newPassword"
                            label="新密码"
                            placeholder="请输入新密码"
                            fieldProps={{
                                size: 'large',
                            }}
                        />

                        <ProFormText.Password
                            name="confirmPassword"
                            label="确认密码"
                            placeholder="请确认密码"
                            fieldProps={{
                                size: 'large',
                            }}
                        />
                        <ProForm.Item>
                            <Button
                                type="primary"
                                onClick={() => {
                                    stepsFormRef.current?.submit();
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                提交
                            </Button>
                        </ProForm.Item>
                    </StepsForm.StepForm>
                    <StepsForm.StepForm
                        name="success"
                        title="操作成功"
                    >
                        <Result
                            status="success"
                            title="重置密码成功"
                            subTitle="请使用新密码登录"
                        />
                        <ProForm.Item>
                            <Button
                                type="primary"
                                onClick={() => {
                                    navigate(LOGIN_PATH);
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                去登录
                            </Button>
                        </ProForm.Item>
                    </StepsForm.StepForm>
                </StepsForm>
            </Card>
        </div>
    );
};