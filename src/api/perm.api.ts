import service from '.'

const baseURL = '/perm'

const create = (data: ApiType.Perm.Info) => service.post(`${baseURL}/create`, data)
const modify = (data: ApiType.Perm.Info) => service.post(`${baseURL}/modify`, data)
const remove = (id: number) => service.post(`${baseURL}/remove/${id}`)
const list = (params: ApiType.Perm.Search) =>
  service.get<ApiType.Perm.Info[]>(`${baseURL}/list`, { params })
const info = (id: number) => service.get<ApiType.Perm.Info>(`${baseURL}/info/${id}`)

export const permApi = {
  create,
  modify,
  remove,
  list,
  info
}
