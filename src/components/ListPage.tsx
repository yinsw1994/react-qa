import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'

interface PropTypes {
  total: number
}

const ListPage: FC<PropTypes> = (props: PropTypes) => {
  const { total = 0 } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_KEY)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_KEY
    setPageSize(pageSize)
  }, [searchParams])
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
  )
}

export default ListPage
