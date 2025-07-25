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
import { ROUTE_PATH } from '@/constants';

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
                    // navigate(ROUTE_PATH.LOGIN)
                    navigate(-1)
                }}>返回</Button>}
                className='reset-password-card'
            >
                <StepsForm<{
                    name: string;
                }>
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
                                return [
                                    <Button
                                        key='step2-login'
                                        type="primary"
                                        onClick={() => {
                                            navigate(ROUTE_PATH.LOGIN);
                                        }}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        去登录
                                    </Button>
                                ]
                            }
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
                        // validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                        // rules={[
                        //     {
                        //         required: true,
                        //         validator: (_rule, value) => {
                        //             if (!value) {
                        //                 return Promise.reject('请输入手机号！')
                        //             }
                        //             return Promise.resolve()
                        //         },
                        //         validateTrigger: ['onSubmit', 'onFinish'],
                        //     },
                        //     {
                        //         validator: (_rule, value) => {
                        //             if (value && value.length && value === '15020202020') {
                        //                 return Promise.reject('该手机号不存在！')
                        //             }
                        //             return Promise.resolve()
                        //         },
                        //         validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                        //     }
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
                            // validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            // rules={[
                            //     {
                            //         required: true,
                            //         validator: (_rule, value) => {
                            //             if (!value) {
                            //                 return Promise.reject('请输入验证码！')
                            //             }
                            //             return Promise.resolve()
                            //         },
                            //         validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                            //     },
                            // ]}
                            onGetCaptcha={async () => {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
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
                            validateTrigger={['onSubmit', 'onFinish', 'onBlur']}
                            rules={[
                                {
                                    required: true,
                                    validator: (_rule, value) => {
                                        if (!value) {
                                            return Promise.reject('请输入新密码！')
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                                },
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
                                        if (!value) {
                                            return Promise.reject('请输入确认密码！')
                                        }
                                        return Promise.resolve()
                                    },
                                    validateTrigger: ['onSubmit', 'onFinish', 'onBlur'],
                                },
                            ]}
                        />
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
                    </StepsForm.StepForm>
                </StepsForm>
            </Card>
        </div>
    );
};