import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/v1/regions/monitor_stations',
    method: 'get',
    params
  })
}
export function getCreate(data) {
  return request({
    url: 'api/v1/regions/monitor_stations',
    method: 'post',
    data
  })
}
export function getStations(params) {
  return request({
    url: 'api/v1/regions/monitor_stations/options',
    method: 'get',
    params
  })
}
