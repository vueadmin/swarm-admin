import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/v1/tasks',
    method: 'get',
    params
  })
}
export function getCreate(data) {
  return request({
    url: 'api/v1/tasks',
    method: 'post',
    data
  })
}
export function getRenew(task_id, data) {
  return request({
    url: `api/v1/tasks/${task_id}`,
    method: 'put',
    data
  })
}
export function getDel(task_id) {
  return request({
    url: `api/v1/tasks/${task_id}`,
    method: 'DELETE'
  })
}
