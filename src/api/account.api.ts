import service from '.'

const baseURL = '/account'

const add = (data: any) => service.post(`${baseURL}/add`, data)
const modify = (data: any) => service.post(`${baseURL}/modify`, data)
const freeze = (id: number) => service.post(`${baseURL}/freeze/${id}`)
const page = (params: any) => service.get<any>(`${baseURL}/page`, { params })
const info = (id: number) => service.get<any>(`${baseURL}/${id}`)

export const accountApi = {
  add,
  modify,
  freeze,
  page,
  info
}
