import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE_KEY, LIST_SEARCH_PARAM_KEY } from '../../constant'

// import { getQuestionListService } from '../../services/question'
// import useLoadQuestionListData from '../../hooks/useQuestionListData'

// import { useRequest } from 'ahooks'

const { Title } = Typography

const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log('🚀 ~ file: List.tsx:43 ~ searchParams:', searchParams.get('keyword'))
  // const [questionList, setQuestionList] = useState(rawQuestionList)

  // const [list = [], setList] = useState()
  // const [total, setTotal] = useState()

  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  // const { data = {}, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data

  const containerRef = useRef<HTMLDivElement>(null)

  const [list = [], setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [searchParams] = useSearchParams()
  const haveMoreData = total > list.length

  // 优化 debounce 的 延迟 出现 加载图标
  const [started, setStarted] = useState(false)

  // 搜索参数变化，重置 state
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setList([])
    setPage(1)
    setTotal(0)
    setStarted(false)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_KEY,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setPage(page + 1)
        setList(list.concat(l))
        setTotal(total)
        // setStarted(false)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 500,
    }
  )

  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 底部加载更多组件
  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total == 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了....</span>
    return <span>开始加载下一页</span>
  }

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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )} */}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  )
}
export default List
