import dayjs from 'dayjs'

export const purifyTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}
// export const orderTime = (time, format = 'YYYY-MM-DD') => {
//   return dayjs(time).format(format);
// }

export const add0 = (m) => {
  return m < 10 ? '0' + m : m
}
export const formatList = (timeName) => {
  // shijianchuo是整数，否则要parseInt转换
  var time = new Date(timeName)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}
