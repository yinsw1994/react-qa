import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  timeout: 10 * 1000,
})

//response 拦截： 统一处理 errno 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno != 0) {
    // 错误提示
    if (msg) {
      console.log('🚀 ~ file: ajax.ts:12 ~ errno:', errno, msg)
      message.error(msg)
    }

    // throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
