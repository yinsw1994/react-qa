import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { Typography } from 'antd'
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

const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log('🚀 ~ file: List.tsx:43 ~ searchParams:', searchParams.get('keyword'))
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map(q => {
          const { _id } = q

          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多...</div>
    </>
  )
}
export default List
