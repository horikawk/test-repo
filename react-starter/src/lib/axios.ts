import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import * as Sentry from '@sentry/react'

const createAxiosInstance = () => {
  const instance = Axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,
  })

  instance.interceptors.request.use((config: AxiosRequestConfig) => ({
    ...config,
    paramsSerializer: {
      indexes: null, // 配列のパラメータ形式(null: [index]も[]もなし)
    },
  }))

  return instance
}

export const axios = createAxiosInstance()

// インターセプタを利用したエラーハンドリング
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // httpステータスによりsentryに例外を報告するか判断
    if (error.status !== 402) {
      Sentry.captureException(error, { level: 'error' })
    }
    return Promise.reject(error)
  }
)

export const appendResponseTransformer = <T, R>(
  instance: AxiosInstance,
  transformer: (data: T) => R
) => {
  const defaultTransform = instance.defaults.transformResponse
  if (defaultTransform == null) {
    return transformer
  }
  if (Array.isArray(defaultTransform)) {
    return [...defaultTransform, transformer]
  }
  return [defaultTransform, transformer]
}
