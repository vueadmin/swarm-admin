<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
      <el-form-item label="监测点">
        <el-input v-model="formInline.user1" placeholder="监测点" />
      </el-form-item>
      <el-form-item label="创建单位">
        <el-input v-model="formInline.user2" placeholder="创建单位" />
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="formInline.user3" placeholder="创建人" />
      </el-form-item>
      <el-form-item label="虫害">
        <el-input v-model="formInline.user4" placeholder="虫害" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region1" placeholder="活动区域">
          <el-option label="未开始" value="1" />
          <el-option label="已结束" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="监测频次">
        <el-select v-model="formInline.region2" placeholder="活动区域">
          <el-option label="一天一次" value="1" />
          <el-option label="一周一次" value="2" />
          <el-option label="半月一次" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">创建</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="省/市/县">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="监测频次">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="创建单位">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="虫害">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: right; margin-top: 10px" background layout="prev, pager, next" :total="1000" />
    <el-dialog title="创建监测点" :visible.sync="dialogFormVisible">
      <el-form :model="form" size="mini">
        <el-form-item label="监测点名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-select v-model="form.shi" placeholder="请选择活动区域">
            <el-option label="全部市" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="县" :label-width="formLabelWidth">
          <el-select v-model="form.xian" placeholder="请选择活动区域">
            <el-option label="全部县" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="上级单位" :label-width="formLabelWidth">
          <el-select v-model="form.pinci" placeholder="请选择活动区域">
            <el-option label="晋中市太保区植保站" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="监测人" :label-width="formLabelWidth">
          <el-input v-model="form.name1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.name2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="虫害" :label-width="formLabelWidth">
          <el-select v-model="form.chonghai" placeholder="请选择活动区域">
            <el-option label="番茄潜叶娥" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动备注" :label-width="formLabelWidth">
          <el-input v-model="form.beizhu" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: {
        user1: '',
        user2: '',
        user3: '',
        user4: '',
        region1: '',
        region2: ''
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data.items.splice(0, 10)
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
