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
      <el-form v-if="monitorValue !== '1'" :model="form" size="mini">
        <el-form-item label="监测点名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
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
        <el-form-item label="上级单位:" :label-width="formLabelWidth">
          <el-select v-model="form.unit" placeholder="请选择活动区域">
            <el-option label="晋中市太谷区植保站" value="1" />
            <!-- <el-option label="平川" value="2" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="监测人:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <div class="city-county">
          <el-form-item class="habitat" label="生境:" :label-width="formLabelWidth">
            <el-select v-model="form.habitat" placeholder="请选择活动区域">
              <el-option label="丘陵" value="1" />
              <el-option label="平川" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item class="crop" label="作物:" :label-width="formLabelWidth">
            <el-select v-model="form.crop" placeholder="请选择活动区域">
              <el-option label="番茄" value="1" />
              <el-option label="马铃薯" value="2" />
              <el-option label="茄子" value="3" />
              <el-option label="辣椒" value="4" />
              <el-option label="豆角" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item class="planting" label="种植方式:" :label-width="formLabelWidth">
            <el-select v-model="form.planting" placeholder="请选择活动区域">
              <el-option label="拱棚" value="1" />
              <el-option label="暖棚" value="2" />
              <el-option label="露地" value="3" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="生育期:" :label-width="formLabelWidth">
          <el-input v-model="form.Growth" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="task === '编辑监测点'" label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          />
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
      <el-form v-else :model="formList" size="mini">
        <el-form-item label="监测人名称:" :label-width="formLabelWidth">
          <el-input class="nameInput" v-model="form.name" autocomplete="off" />
        </el-form-item>
        <div class="city-county">
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="formList.city" placeholder="请选择活动区域">
              <el-option label="全部" value="1" />
              <el-option label="太原市" value="2" />
              <el-option label="大同市" value="3" />
              <el-option label="晋中市" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="县:" :label-width="formLabelWidth">
            <el-select v-model="formList.county" placeholder="请选择活动区域">
              <el-option label="全部" value="1" />
              <el-option label="祁县" value="2" />
              <el-option label="太谷县" value="3" />
              <el-option label="清徐县" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="乡镇:" :label-width="formLabelWidth">
            <el-select v-model="formList.county" placeholder="请选择活动区域">
              <el-option label="全部" value="1" />
              <el-option label="祁县" value="2" />
              <el-option label="太谷县" value="3" />
              <el-option label="清徐县" value="4" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="上级单位:" :label-width="formLabelWidth">
          <el-select v-model="formList.unit" placeholder="请选择活动区域">
            <el-option label="晋中市太谷区植保站" value="1" />
            <!-- <el-option label="平川" value="2" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="监测人手机:" :label-width="formLabelWidth">
          <el-input class="phoneInput" v-model="formList.phone" autocomplete="off" />
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
    showCreate: {
      type: Boolean
    },
    tackName: {
      type: String
    },
    editList: {
      type: Object
    },
    monitor: {
      type: String
    }
  },
  data() {
    return {
      task: '',
      formLabelWidth: '100px',
      monitorValue: '',
      form: {
        name: '',
        date: '',
        city: '1',
        county: '1',
        frequency: '1',
        pests: '1',
        Remark: ''
      },
      formList: {
        name: '',
        phone: '',
        city: '',
        county: '',
        Township: '',
        unit: ''
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
    },
    monitor: {
      immediate: true,
      handler(newV, oldV) {
        this.monitorValue = newV
        console.log(newV, oldV,9999)
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
      .county,
      .habitat,
      .crop,
      .planting {
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
.phoneInput {
  width: 200px;
}
.nameInput {
  width: 350px;
}
.el-form-item__content {
  margin-bottom: 18px !important;
}
</style>
