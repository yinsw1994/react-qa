import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Divider, message } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'

import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)

  async function handleCreateClick() {
    setLoading(true)
    const data = await createQuestionService()
    const { id } = data || {}
    if (id) {
      nav(`/question/edit/${id}`)
      message.success('创建成功')
    }

    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            onClick={handleCreateClick}
            disabled={loading}
            icon={<PlusOutlined />}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }}></Divider>
          <Button
            type={pathname.startsWith(MANAGE_INDEX_PATHNAME) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(MANAGE_INDEX_PATHNAME)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
