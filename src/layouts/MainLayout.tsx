import React, { FC } from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>小🌟问卷 &copy; 2023 - present. Created by Yinsw</Footer>
    </Layout>
  )
}

export default MainLayout
