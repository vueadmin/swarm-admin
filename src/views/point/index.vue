<template>
  <div class="app-container">
    <div v-if="showCreate === false">
      <el-form
        :inline="true"
        :model="formInline"
        size="mini"
        class="demo-form-inline"
      >
        <el-form-item v-if="monitor !== '1'" label="监测点">
          <el-input v-model="formInline.user1" placeholder="请输入监测点" />
        </el-form-item>
        <el-form-item v-if="monitor !== '1'" label="创建单位">
          <el-input v-model="formInline.user2" placeholder="请输入创建单位" />
        </el-form-item>
        <el-form-item label="监测人">
          <el-input v-model="formInline.user3" placeholder="请输入检测人" />
        </el-form-item>
        <el-form-item v-if="monitor === '1'" label="手机号">
          <el-input v-model="formInline.phone" placeholder="请输入手机号" />
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
        <el-form-item label="市:">
          <el-select v-model="formInline.city" placeholder="请选择活动区域">
            <el-option label="全部" value="1" />
            <el-option label="太原市" value="2" />
            <el-option label="大同市" value="3" />
            <el-option label="晋中市" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item class="county" label="县:">
          <el-select v-model="formInline.county" placeholder="请选择活动区域">
            <el-option label="全部" value="1" />
            <el-option label="祁县" value="2" />
            <el-option label="太谷县" value="3" />
            <el-option label="清徐县" value="4" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        class="btn"
        size="mini"
        @click="onCreate"
      >{{ btnName }}</el-button>
      <el-button
        class="searchBtn"
        type="success"
        size="mini"
        @click="onSearch"
      >查询</el-button>
      <el-button
        class="infoBtn"
        type="info"
        size="mini"
        @click="onReset"
      >重置</el-button>
      <div style="position: relative; z-index: 888">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="label1" name="first">
            <el-table
              v-loading="listLoading"
              :data="list2"
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
              <el-table-column label="监测点">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="省/县">
                <template slot-scope="scope">
                  <span>{{ scope.row.city }}/{{ scope.row.district }}</span>
                </template>
              </el-table-column>
              <el-table-column label="监测人" style="width: 300px">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.maintainer_name }}</a>
                </template>
              </el-table-column>
              <el-table-column label="手机号">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.maintainer_phone }}</a>
                </template>
              </el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.created_at }}</a>
                </template>
              </el-table-column>
              <el-table-column label="生境">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.habitat }}</a>
                </template>
              </el-table-column>
              <el-table-column label="作物">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.crop }}</a>
                </template>
              </el-table-column>
              <el-table-column label="种植方式">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.planting_method }}</a>
                </template>
              </el-table-column>
              <el-table-column label="生育期">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.growth_period }}</a>
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
              <el-button v-show="isShow === true" class="btn-process" type="danger" size="mini">批量处理</el-button>
              <el-pagination
                class="pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane :label="label2" name="two">
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
              <el-table-column label="监测人">
                <template slot-scope="scope">
                  {{ scope.row.username }}
                </template>
              </el-table-column>
              <el-table-column label="省/县">
                <template slot-scope="scope">
                  <span>{{ scope.row.city }}/{{ scope.row.district }}/{{ scope.row.village}}</span>
                </template>
              </el-table-column>
              <el-table-column label="手机号" style="width: 300px">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.phone }}</a>
                </template>
              </el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  <a class="tableText">{{ scope.row.start_time }}</a>
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
                @size-change="handleSizeChanges"
                @current-change="handleCurrentChanges"
                layout="prev, pager, next"
                :total="totals"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>
    <create-and-edit-form
      v-else
      :show-create="showCreate"
      :tack-name="tackName"
      :edit-list="editList"
      :monitor="monitor"
      @change="onChange"
      @submit1="OnSubmit1"
      @submit2="OnSubmit2"
    />
  </div>
</template>

<script>
import { getList } from '@/api/monitor'
import { getUserList } from '@/api/user'
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
      total: null,
      totals: null,
      pageAndSize: {
        page: 1,
        size: 50
      },
      list2: [],
      list: [],
      listLoading: false,
      activeName: 'first',
      label1: '监测点概览',
      label2: '监测人概览',
      isShow: false,
      showCreate: false,
      formInline: {
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        date: '',
        city: '1',
        county: '1',
        phone: ''
      },
      multipleSelection: [],
      dialogFormVisible: false,
      form: {},
      btnName: '创建监测点',
      monitor: '0'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    OnSubmit1() {
      this.fetchData()
    },
    OnSubmit2() {
      this.inif()
    },
    handleSizeChange(val) {
      this.pageAndSize.size = val
      console.log(`每页 ${val} 条`)
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageAndSize.page = val
      this.fetchData()
      console.log(`当前页: ${val}`)
    },
    handleSizeChanges(val) {
      this.pageAndSize.size = val
      console.log(`每页 ${val} 条`)
      this.inif()
    },
    handleCurrentChanges(val) {
      this.pageAndSize.page = val
      this.inif()
      console.log(`当前页: ${val}`)
    },
    async onSearch() {
      if (this.monitor === '0') {
        try {
          const params = {
            name: this.formInline.name,
            start_time: this.formInline.date[0].getTime(),
            end_time: this.formInline.date[1].getTime(),
            cycle: 14,
            // province: this.params.region_id,
            // comment: this.form.comment,
            userName: this.formInline.userName
            // city: this.cityId || '',
            // district: this.countyId || '',
            // department: this.department
          }
          const res = await getList(params)
          console.log(res, 37737)
        } catch (error) {
          console.log(error)
        }
        // console.log(this.formInline, 999)
      } else {
        try {
          const params = {
            name: this.formInline.name,
            start_time: this.formInline.date[0].getTime(),
            end_time: this.formInline.date[1].getTime(),
            cycle: 14,
            // province: this.params.region_id,
            // comment: this.form.comment,
            userName: this.formInline.userName
            // city: this.cityId || '',
            // district: this.countyId || '',
            // department: this.department
          }
          const res = await getUserList(params)
          console.log(res, 37737)
        } catch (error) {
          console.log(error)
        }
        console.log(this.formInline, 999)
      }

    },
    onReset() {
      this.formInline.name = ''
      this.formInline
      this.formInline.userName = ''
      this.formInline.date = ''
      this.formInline.cycle = ''
    },
    onEdit(row) {
      if (this.monitor !== '0') {
        this.tackName = '编辑监测人'
      } else {
        this.tackName = '编辑监测点'
      }
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
      if (this.monitor !== '0') {
        this.tackName = '创建监测人'
      } else {
        this.tackName = '创建监测点'
      }
      this.showCreate = true
    },
    async handleClick(val) {
      if (val.index === '1') {
        this.inif()
      }
      this.monitor = val.index
      console.log(this.monitor, 876)
      if (val.index === '1') {
        this.btnName = '创建监测人'
      } else {
        this.btnName = '创建监测点'
      }
    },
    async inif() {
      this.listLoading = true
      try {
        const res = await getUserList()
        this.list = res.data
        this.totals = res.total
        this.listLoading = false
      } catch (error) {
        console.log(error)
      }
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
    async fetchData() {
      this.listLoading = true
      if (this.monitor === '0') {
        try {
          const res = await getList()
          this.list2 = res.data
          this.listLoading = false
          this.total = res.total
        } catch (error) {
          console.log(error)
        }
      }
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
  position: absolute;
  left: 250px;
  z-index: 999;
}
.searchBtn {
  position: absolute;
  right: 100px;
  z-index: 999;
}
.infoBtn {
  position: absolute;
  right: 20px;
  z-index: 999;
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
