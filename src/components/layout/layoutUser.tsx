import React from 'react'
import { Avatar, Dropdown, Space, MenuProps, App } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './css/index.scss'
import { removeAccessToken, removeRefreshToken } from '@/utils/storge'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { resetRouteAction } from '@/redux/modules/route'
import { resetUserAction } from '@/redux/modules/user'

const LayoutUser = () => {
  const navigate = useNavigate()
  const { modal } = App.useApp()
  const dispatch = useAppDispatch()
  const {
    user: {
      userInfo,
      userRole
    }
  } = useAppSelector(state => state)
  // 下拉菜单项的配置
  const items: MenuProps['items'] = [
    // {
    //   key: 'personal',
    //   label: '个人中心',
    //   onClick: () => {
    //     console.log('个人中心')
    //   },
    // },
    // {
    //   key: 'setting',
    //   label: '设置',
    //   onClick: () => {
    //     console.log('设置')
    //   },
    // },
    // {
    //   type: 'divider',
    // },
    {
      key: 'logout',
      label: '退出登录',
      onClick: () => {
        modal.confirm({
          title: '提示',
          content: '确定退出登录吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            // 退出登录
            removeAccessToken()
            removeRefreshToken()
            dispatch(resetRouteAction())
            dispatch(resetUserAction())
            navigate(ROUTE_PATH.LOGIN)
          },
        })
      },
    },
  ];
  return (
    <div
      className='layout-user'
    >
      <Dropdown
        menu={{ items }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Avatar
            src=""
            alt=""
            shape='square'
            icon={<UserOutlined />}
            style={{
              cursor: 'pointer',
              marginRight: 10,
              backgroundColor: '#87d068'
            }}
          />
          <Space>
            {userInfo?.nickname}
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default LayoutUser