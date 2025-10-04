import service from '.'

const baseURL = '/tenant'

const create = (data: ApiType.Tenant.Info) => service.post(`${baseURL}/create`, data)
const modify = (data: ApiType.Tenant.Info) => service.post(`${baseURL}/modify`, data)
const remove = (id: number) => service.post(`${baseURL}/remove/${id}`)
const page = (params: ApiType.Page.Param & ApiType.Tenant.Search) =>
  service.get<ApiType.Page.Result<ApiType.Tenant.Info>>(`${baseURL}/page`, { params })
const info = (id: number) => service.get<ApiType.Tenant.Info>(`${baseURL}/${id}`)
const list = () => service.get<ApiType.Tenant.Info[]>(`${baseURL}/list`)
const assignPerms = (data: ApiType.Perm.Info) => service.post(`${baseURL}/assignPerms`, data)
const perms = (id: number) => service.get<ApiType.Perm.Info>(`${baseURL}/perms/${id}`)

export const tenantApi = {
  create,
  modify,
  remove,
  page,
  info,
  list,
  assignPerms,
  perms
}
