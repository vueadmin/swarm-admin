<template>
  <div class="app-container">
    <div v-if="showCreate === false">
      <el-form
        :inline="true"
        :model="formInline"
        size="mini"
        class="demo-form-inline"
      >
        <el-form-item v-if="monitor !== '1'" label="任务名称">
          <el-input v-model="formInline.user1" placeholder="任务名称" />
        </el-form-item>
        <el-form-item v-if="monitor !== '1'" label="创建单位">
          <el-input v-model="formInline.user2" placeholder="创建单位" />
        </el-form-item>
        <el-form-item label="监测人">
          <el-input v-model="formInline.user3" placeholder="创建人" />
        </el-form-item>
        <el-form-item v-if="monitor === '1'" label="手机号">
          <el-input v-model="formInline.phone" placeholder="创建人" />
        </el-form-item>
        <el-form-item v-if="monitor !== '1'" label="虫害">
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
        <el-form-item>
          <el-button type="success">查询</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button
        class="btn"
        size="mini"
        @click="onCreate"
      >{{ btnName }}</el-button>
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
                {{ scope.row.Monitoring }}
              </template>
            </el-table-column>
            <el-table-column label="省/县">
              <template slot-scope="scope">
                <span>{{ scope.row.cityCounty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="监测人" style="width: 300px">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column label="手机号">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.phone }}</a>
              </template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column label="生境">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.Habitat }}</a>
              </template>
            </el-table-column>
            <el-table-column label="作物">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.crop }}</a>
              </template>
            </el-table-column>
            <el-table-column label="种植方式">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.planting }}</a>
              </template>
            </el-table-column>
            <el-table-column label="生育期">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.Growth }}</a>
              </template>
            </el-table-column>
            <el-table-column label="虫害">
              <template slot-scope="scope">
                <a class="tableText">{{ scope.row.Pests }}</a>
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
      :monitor="monitor"
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
      list2: [
        {
          Monitoring: '1',
          cityCounty: '2',
          name: '3',
          phone: '4',
          date: '4',
          Habitat: '4',
          crop: '4',
          planting: '4',
          Growth: '4',
          state: '5'
        }
      ],
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
  methods: {
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
    handleClick(val) {
      this.monitor = val.index
      console.log(val.index)
      if (val.index === '1') {
        this.btnName = '创建监测人'
      } else {
        this.btnName = '创建监测点'
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
  // margin-left: 120px;
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
