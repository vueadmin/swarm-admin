<template>
  <div class="dashboard-container">
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="monitor_point" label="监测点" />
        <el-table-column prop="adress" label="详细地址" />
        <el-table-column prop="monitor_data" label="监测数据" />
        <el-table-column prop="monitor_user" label="监测人员" />
        <el-table-column prop="superior" label="所属单位" />
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
