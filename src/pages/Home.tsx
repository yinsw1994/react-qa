import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

import axios from 'axios'

const Home: FC = () => {
  const nav = useNavigate()

  // useEffect(() => {
  //   axios.post('/api/question').then(res => {
  //     console.log('res.data => ', res.data)
  //   })
  // }, [])

  // function clickHandler() {
  //   // nav('/login')

  //   nav({
  //     pathname: '/login',
  //     search: 'b=21',
  //   })
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
