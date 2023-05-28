import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return 'Bearer ' + Cookies.get('token')
}

export function setToken(token) {
  console.log(token, 11111)
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}
export function setName(name) {
  return sessionStorage.setItem('name', name)
}
export function setPhone(phone) {
  return sessionStorage.setItem('phone', phone)
}
export function setId(id) {
  return sessionStorage.setItem('id', id)
}
