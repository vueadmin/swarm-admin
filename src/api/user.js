import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/api/v1/users/login`,
    method: 'post',
    data
  })
}
export function getList(data) {
  return request({
    url: '/api/v1/users',
    method: 'post',
    data
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
