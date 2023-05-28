import request from '@/utils/request'

export function getCityList(params) {
  return request({
    url: 'api/v1/regions',
    method: 'get',
    params
  })
}
export function getCityUnit(id) {
  return request({
    url: `api/v1/regions/departments${id}`,
    method: 'get'
  })
}
export const getCityId = (id) =>
  request({
    url: `api/v1/regions/${id}`,
    method: 'GET'
  })

