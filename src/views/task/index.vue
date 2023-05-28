<template>
  <div class="app-container">
    <div v-if="showCreate === false">
      <el-form
        :inline="true"
        :model="formInline"
        size="mini"
        class="demo-form-inline"
      >
        <el-form-item label="监管点">
          <el-input v-model="formInline.user1" placeholder="任务名称" />
        </el-form-item>
        <el-form-item label="创建单位">
          <el-input v-model="formInline.user2" placeholder="创建单位" />
        </el-form-item>
        <el-form-item label="检测人">
          <el-input v-model="formInline.user3" placeholder="创建人" />
        </el-form-item>
        <el-form-item label="虫害">
          <el-input v-model="formInline.user4" placeholder="虫害" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region1" placeholder="活动区域">
            <el-option label="全部" value="1" />
            <el-option label="正常" value="2" />
            <el-option label="暂停" value="3" />
            <el-option label="停止" value="4" />
            <el-option label="未开始" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="监测频次">
          <el-select v-model="formInline.region2" placeholder="活动区域">
            <el-option label="全部" value="1" />
            <el-option label="每月一次" value="2" />
            <el-option label="每周一次" value="3" />
            <el-option label="自定义时间" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button
        class="btn"
        size="mini"
        @click="onCreate"
      >创建任务</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="label" name="first">
          <el-table
            v-loading="listLoading"
            :data="list"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :header-cell-style="{background:'#F5F5F5',color:'#606266'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="任务名称">
              <template slot-scope="scope">
                {{ scope.row.content }}
              </template>
            </el-table-column>
            <el-table-column label="省/县">
              <template slot-scope="scope">
                <span>{{ scope.row.cityCounty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="监测频次" style="width: 300px">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.frequency }}</a>
              </template>
            </el-table-column>
            <el-table-column label="创建单位">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.unit }}</a>
              </template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column label="开始时间">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.startDate }}</a>
              </template>
            </el-table-column>
            <el-table-column label="结束时间">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.endDate }}</a>
              </template>
            </el-table-column>
            <el-table-column label="虫害">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.pests }}</a>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.state }}</a>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="onMore">操作</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-button class="btn-process" v-show="isShow === true" type="danger" size="mini">批量处理</el-button>
            <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <create-and-edit-form
      v-else
      :show-create="showCreate"
      :tack-name="tackName"
      :edit-list="editList"
      @change="onChange"
    />
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import CreateAndEditForm from './component/CreateAndEditForm.vue'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    CreateAndEditForm
  },
  data() {
    return {
      tackName: '',
      editList: {},
      list: [
        {
          content: '虫',
          cityCounty: '凌源/大河北',
          frequency: '每周二次',
          unit: '辽宁',
          name: '丁海超',
          startDate: '2023年05月27日',
          endDate: '2023年05月29日',
          pests: '蜈蚣',
          state: '未开始'
        },
        {
          content: '虫',
          cityCounty: '凌源/大河北',
          frequency: '每周二次',
          unit: '辽宁',
          name: '丁海超',
          startDate: '2023年05月27日',
          endDate: '2023年05月29日',
          pests: '蜈蚣',
          state: '未开始'
        },
        {
          content: '虫',
          cityCounty: '凌源/大河北',
          frequency: '每周二次',
          unit: '辽宁',
          name: '丁海超',
          startDate: '2023年05月27日',
          endDate: '2023年05月29日',
          pests: '蜈蚣',
          state: '未开始'
        },
        {
          content: '虫',
          cityCounty: '凌源/大河北',
          frequency: '每周二次',
          unit: '辽宁',
          name: '丁海超',
          startDate: '2023年05月27日',
          endDate: '2023年05月29日',
          pests: '蜈蚣',
          state: '未开始'
        },
        {
          content: '虫',
          cityCounty: '凌源/大河北',
          frequency: '每周二次',
          unit: '辽宁',
          name: '丁海超',
          startDate: '2023年05月27日',
          endDate: '2023年05月29日',
          pests: '蜈蚣',
          state: '未开始'
        }
      ],
      listLoading: false,
      activeName: 'first',
      label: '数据概览',
      isShow: false,
      showCreate: false,
      formInline: {
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        date: '',
        region1: '1',
        region2: '1'
      },
      multipleSelection: [],
      dialogFormVisible: false,
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onEdit(row) {
      this.tackName = '编辑任务'
      this.showCreate = true
      this.editList = row
      console.log(row, 66)
    },
    onMore() {

    },
    onChange(val, form) {
      console.log(val, form, 88)
      this.showCreate = val
    },
    onCreate() {
      console.log(222)
      this.tackName = '创建任务'
      this.showCreate = true
    },
    handleClick() {

    },
    handleSelectionChange(val) {
      console.log(val)
      if (val.length !== 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.multipleSelection = val
    },
    fetchData() {
      // this.listLoading = true
      // getList().then((response) => {
      //   this.list = response.data.items.splice(0, 10)
      //   this.listLoading = false
      // })
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table_1_column_2 {
  color: red !important;
}
.btn {
  background-color: #4d4d4d;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;

}
.btn:hover {
  background-color: #6d6b6b;
}
.tableText {
  color: rgb(0, 140, 255)
}
.footer {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .btn-process {
    display: flex;
    justify-content: flex-start;
    }
  .pagination {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
