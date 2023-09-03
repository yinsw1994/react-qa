import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, message, Popconfirm, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicatedQuestionService } from '../services/question'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  const [isStared, setIsStared] = useState(isStar)

  // 切换标星状态
  const { loading: changeLoading, run: changeStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, {
        isStar: !isStared,
      })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStared(!isStared)
      },
    }
  )

  // function duplicate() {
  //   message.success('执行复制')
  // }

  // 复制问卷功能
  const { loading: duplicatedLoading, run: duplicate } = useRequest(
    async () => await duplicatedQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  // 删除问卷
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deletedLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  function del() {
    confirm({
      title: '确定删除问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/eidt/${_id}`}>
            <Space>
              {isStared && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              disabled={changeLoading}
              onClick={changeStar}
            >
              {isStared ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicatedLoading}>
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deletedLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
