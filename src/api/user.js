import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/users/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/api/v1/users/',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
