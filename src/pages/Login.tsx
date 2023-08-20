import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const onFinish = (values: any) => {
    console.log('🚀 ~ file: Register.tsx:12 ~ onFinish ~ values:', values)
    const { remember, username, password } = values || {}
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5 - 20 之间' },
              { pattern: /^\w+$/, message: '只能是数字字母下划线' },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
