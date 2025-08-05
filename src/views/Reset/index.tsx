import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ProForm,
    ProFormText,
    StepsForm,
    ProFormCaptcha,
} from '@ant-design/pro-components';
import { Button, Card, App, Result, theme, Spin } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { ROUTE_PATH } from '@/constants';
import { resetPasswordAPI, sendMobileCodeAPI, verifyMobileCodeAPI } from '@/api/login';
import { removeAccessToken, removeAccountPassword, removeRefreshToken, setRememberMe } from '@/utils/storge';

export default () => {
    const navigate = useNavigate();
    const stepsFormRef = useRef<ProFormInstance>();
    const { token } = theme.useToken();
    const { message } = App.useApp();
    const [resetResult, setResetResult] = useState<boolean>(false);
    const [resetLoading, setResetLoading] = useState<boolean>(true);

    return (
        <div
            className='reset-password-container'
        >
            <Card
                title="重置密码"
                extra={<Button type="link" onClick={() => {
                    // navigate(ROUTE_PATH.LOGIN)
                    navigate(-1)
                }}>返回</Button>}
                className='reset-password-card'
            >
                <StepsForm
                    formRef={stepsFormRef}
                    submitter={{
                        render: (props, _dom) => {
                            if (props.step === 0) {
                                return [
                                    <Button
                                        key='step0-next'
                                        type="primary"
                                        onClick={() => {
                                            props.onSubmit?.()
                                        }}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        下一步
                                    </Button>
                                ]
                            }
                            if (props.step === 1) {
                                return [
                                    <Button
                                        key='step1-prev'
                                        type="primary"
                                        onClick={() => {
                                            props.onPre?.()
                                        }}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        上一步
                                    </Button>,
                                    <Button
                                        key='step1-next'
                                        type="primary"
                                        onClick={() => {
                                            props.onSubmit?.()
                                        }}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        提交
                                    </Button>
                                ]
                            }
                            if (props.step === 2) {
                                return resetLoading ? [] : resetResult ? [
                                    <Button
                                        key='step2-login'
                                        type="primary"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        去登录
                                    </Button>
                                ] : [
                                    <Button
                                        key='step2-login'
                                        type="primary"
                                        style={{
                                            width: '100%',
                                        }}
                                        onClick={() => {
                                            navigate(-1);
                                        }}
                                    >
                                        返回
                                    </Button>,
                                    <Button
                                        key='step2-login'
                                        type="primary"
                                        style={{
                                            width: '100%',
                                        }}
                                        onClick={() => {
                                            props.onReset?.();
                                            setResetLoading(true);
                                            setResetResult(false);
                                        }}
                                    >
                                        再试一次
                                    </Button>
                                ];
                            }
                            return []
                        }
                    }}
                    onFinish={async (values) => {
                        const resetRes = await resetPasswordAPI({
                            mobile: values.mobile,
                            code: values.captcha,
                            password: values.newPassword,
                        });
                        if (resetRes.success && resetRes.data) {
                            // message.success('重置密码成功！');
                            setResetResult(true);
                            setResetLoading(false);
                            setRememberMe(false)
                            removeAccountPassword();
                            removeAccessToken();
                            removeRefreshToken();
                            navigate(ROUTE_PATH.LOGIN);
                            return true;
                        } else {
                            setResetLoading(false);
                            return false;
                        }
                    }}
                >
                    <StepsForm.StepForm<{
                        mobile: string
                        captcha: string
                    }>
                        name="identity"
                        title="身份验证"
                        onFinish={async (values) => {
                            const verifyRes = await verifyMobileCodeAPI({
                                mobile: values.mobile,
                                code: values.captcha,
                                scene: 23
                            })
                            if (verifyRes.success && verifyRes.data) {
                                message.success('验证成功！');
                                return true;
                            }
                            return false;
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
                            validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    validator: (_rule, value) => {
                                        if (!value || !value.trim()) {
                                            return Promise.reject('请输入手机号！')
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish'],
                                }
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
                            phoneName="mobile"
                            name="captcha"
                            validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    validator: (_rule, value) => {
                                        if (!value || !value.trim()) {
                                            return Promise.reject('请输入验证码！')
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                                },
                            ]}
                            onGetCaptcha={async (mobile) => {
                                const captchaRes = await sendMobileCodeAPI({
                                    mobile,
                                    scene: 23
                                })
                                if (captchaRes.success && captchaRes.data) {
                                    message.success('获取验证码成功！');
                                }
                                // message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </StepsForm.StepForm>
                    <StepsForm.StepForm<{
                        newPassword: string;
                    }>
                        name="reset"
                        title="重置密码"
                        onFinish={async (values) => {
                            // const mobile = stepsFormRef.current?.getFieldValue('mobile');
                            // const code = stepsFormRef.current?.getFieldValue('captcha');
                            // console.log('values', stepsFormRef.current?.getFieldsFormatValue?.(true));
                            stepsFormRef.current?.submit();
                            return true
                        }}
                    >
                        <ProFormText.Password
                            name="newPassword"
                            label="新密码"
                            placeholder="请输入新密码"
                            fieldProps={{
                                size: 'large',
                            }}
                            validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    validator: (_rule, value) => {
                                        if (!value || !value.trim()) {
                                            return Promise.reject('请输入新密码！')
                                        } else {
                                            if (value.length < 4) {
                                                return Promise.reject('密码长度不能小于4个字符！')
                                            }
                                            if (value.length > 16) {
                                                return Promise.reject('密码长度不能大于16个字符！')
                                            }
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                                }
                            ]}
                        />

                        <ProFormText.Password
                            name="confirmPassword"
                            label="确认密码"
                            placeholder="请确认密码"
                            fieldProps={{
                                size: 'large',
                            }}
                            validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    validator: (_rule, value) => {
                                        if (!value || !value.trim()) {
                                            return Promise.reject('请输入确认密码！')
                                        } else {
                                            if (value !== stepsFormRef.current?.getFieldValue('newPassword')) {
                                                return Promise.reject('两次输入密码不一致！')
                                            }
                                            if (value.length < 4) {
                                                return Promise.reject('密码长度不能小于4个字符！')
                                            }
                                            if (value.length > 16) {
                                                return Promise.reject('密码长度不能大于16个字符！')
                                            }
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                                },
                            ]}
                        />
                    </StepsForm.StepForm>
                    <StepsForm.StepForm
                        title="重置结果"
                    >
                        {
                            resetLoading ? (
                                <div
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Spin />
                                </div>
                            ) : resetResult ? (
                                <Result
                                    status="success"
                                    title="重置成功"
                                    subTitle="重置密码成功"
                                />
                            ) : (
                                <Result
                                    status="error"
                                    title="重置失败"
                                    subTitle="重置密码失败"
                                />
                            )
                        }
                    </StepsForm.StepForm>
                </StepsForm>
            </Card>
        </div >
    );
};