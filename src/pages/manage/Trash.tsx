import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message } from 'antd'
import { useTitle } from 'ahooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const { confirm } = Modal

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

const Trash: FC = () => {
  useTitle('小🌟问卷 - 回收站')
  const [questionList, setQuestionList] = useState(rawQuestionList)

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除不可以找回',
      onOk: () => message.success(`删除${JSON.stringify(selectedIds)}`),
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log('==> selectedRowKeys', selectedRowKeys)
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
