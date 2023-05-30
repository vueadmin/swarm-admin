<template>
  <div class="btn">
    <el-button class="success" type="success" @click="open">数据上报</el-button>
    <el-button class="info" type="info" @click="onClickDownload">数据下载</el-button>
  </div>
</template>

<script>
import { getUserLevel } from '@/utils/auth'
export default {
  created() {
    console.log(getUserLevel())
  },
  methods: {
    open() {
      this.$confirm('请确认是否立即上报数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '上报成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上报'
          })
        })
    },
    onClickDownload() {
      const userRule = getUserLevel()
      const fileName = '虫害数据'
      let filePath = ''
      switch (userRule) {
        case 'admin':
          filePath = '/static/province.xlsx'
          break
        case 'province':
          filePath = '/static/province.xlsx'
          break
        case 'city':
          filePath = '/static/city.xlsx'
          break
        case 'district':
          filePath = '/static/district.xlsx'
          break
        case 'village':
          filePath = '/static/city.xlsx'
          break
        default:
          break
      }

      this.downloadExcel(filePath, fileName)
    },
    downloadExcel(filePath, fileName) {
      var a = document.createElement('a')
      a.href = filePath
      a.download = `${fileName}.xlsx`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 95%;
  padding: 50px;
  margin: 20px;
  margin-right: 20px;
  border-bottom: 1px solid #d0d0d0;

  .success {
    width: 200px;
    height: 60px;
    margin-right: 40px;
  }

  .info {
    width: 200px;
    height: 60px;
  }
}
</style>
