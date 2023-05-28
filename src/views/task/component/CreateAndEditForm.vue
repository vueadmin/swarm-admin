<template>
  <div class="box">
    <div class="box-create">
      <div class="return">
        <el-button size="mini" class="return-btn" @click="onReturn">
          <i class="el-icon-back" />
          <span>返回</span>
        </el-button>
        <div class="return-text">{{ task }}</div>
      </div>
      <el-form :model="form" size="mini">
        <el-form-item label="任务名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <div class="city-county">
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="form.city" placeholder="请选择活动区域">
              <el-option label="全部" value="1" />
              <el-option label="太原市" value="2" />
              <el-option label="大同市" value="3" />
              <el-option label="晋中市" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="县:" :label-width="formLabelWidth">
            <el-select v-model="form.county" placeholder="请选择活动区域">
              <el-option label="全部" value="1" />
              <el-option label="祁县" value="2" />
              <el-option label="太谷县" value="3" />
              <el-option label="清徐县" value="4" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="监测频次:" :label-width="formLabelWidth">
          <el-select v-model="form.frequency" placeholder="请选择活动区域">
            <el-option label="两周一次" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="虫害:" :label-width="formLabelWidth">
          <el-select v-model="form.pests" placeholder="请选择活动区域">
            <el-option label="鳞翅目/夜蛾科/番茄潜叶娥" value="1" />
            <el-option label="鞘翅目/天牛科/松褐天牛" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="form.Remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="dialog-footer-btn"
          type="success"
          size="mini"
          @click="onSubmit"
        >保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAndEditForm',
  props: {
    showCreate: Boolean,
    tackName: String,
    editList: Object
  },
  data() {
    return {
      task: '',
      formLabelWidth: '80px',
      form: {
        name: '',
        date: '',
        city: '1',
        county: '1',
        frequency: '1',
        pests: '1',
        Remark: ''
      },
      create: false
    }
  },
  watch: {
    showCreate: {
      immediate: true,
      handler(newV, oldV) {
        this.create = newV
        console.log(newV, oldV)
      }
    },
    tackName: {
      immediate: true,
      handler(newV, oldV) {
        this.task = newV
        console.log(newV, oldV)
      }
    },
    editList: {
      immediate: true,
      handler(newV, oldV) {
        this.form = newV
        console.log(newV, oldV)
      }
    }
  },
  mounted() {

  },
  methods: {
    onReturn() {
      this.create = false
      this.form.name = ''
      this.form.date = ''
      this.form.city = '1'
      this.form.county = '1'
      this.form.frequency = '1'
      this.form.pests = '1'
      this.form.Remark = ''
      this.$emit('change', false)
    },
    onSubmit() {
      this.create = false
      this.$emit('change', false, this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 700px;
  .box-create {
    display: flex;
    flex-direction: column;
    .city-county {
      display: flex;
      .county {
        margin-left: 50px;
      }
    }
    .dialog-footer {
      margin-left: 50px;
      margin-top: 20px;
      .dialog-footer-btn {
        width: 80px;
      }
    }
    .return {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .return-btn {
        margin-right: 15px;
        border-radius: 12px;
        width: 55px;
        padding: 5px;
      }
      .return-text {
        font-weight: 600;
      }
    }
  }
}
.el-form-item__content {
  margin-bottom: 18px !important;
}
</style>
