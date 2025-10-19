import { message } from 'antd'
import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'
import { getDefaultStore } from 'jotai'
import { authStore } from '~/store'

export class Request {
  service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API
      // timeout: 5000
    })

    // * 请求拦截器
    this.service.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        const store = getDefaultStore()
        const token = store.get(authStore.tokenAtom)
        if (token) {
          request.headers['Authorization'] = 'Bearer ' + token
        }

        return request
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )

    // * 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 文件对象直接返回
        if (
          response.request.responseType === 'blob' ||
          response.request.responseType === 'arraybuffer'
        ) {
          return response.data
        }

        const { code, msg, data } = response.data

        if (code === 401) {
          // TODO 提示重新登录
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 403) {
          message.error('您没有权限访问该资源, 请联系管理员')
          return Promise.reject(msg)
        } else if (code !== 200) {
          message.error(msg)
          return Promise.reject(msg)
        } else {
          return Promise.resolve(data)
        }
      },

      (error: AxiosError) => {
        let msg = error.message
        if (msg == 'Network Error') {
          msg = '后端接口连接异常'
        } else if (msg.includes('timeout')) {
          msg = '系统接口请求超时'
        } else if (msg.includes('Request failed with status code')) {
          msg = '系统接口' + msg.substr(msg.length - 3) + '异常'
        } else {
          msg = '系统繁忙,请稍后再试'
        }

        message.error(msg)
        return Promise.reject(error)
      }
    )
  }

  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.service.get(url, config)
  }

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.service.post(url, data, config)
  }

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.service.put(url, data, config)
  }

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.service.delete(url, config)
  }

  // TODO: 上传文件
}
export default new Request()

// * 导出api模块
export * from './auth.api'
export * from './user.api'
export * from './perm.api'
export * from './tenant.api'
export * from './account.api'
