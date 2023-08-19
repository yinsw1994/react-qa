import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    createdAt: '2023年10月 13:23',
    isStar: true,
    answerCount: 5,
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    createdAt: '2023年9月 13:23',
    isStar: false,
    answerCount: 5,
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    createdAt: '2023年8月 13:23',
    isStar: true,
    answerCount: 4,
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    createdAt: '2023年7月 13:23',
    isStar: false,
    answerCount: 7,
  },
]

const Star: FC = () => {
  useTitle('小🌟问卷 - 星标问卷')
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
