import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import { HOME_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <Link to={HOME_PATHNAME}>
      <div className={styles.container}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小🌟问卷</Title>
        </Space>
      </div>
    </Link>
  )
}

export default Logo
