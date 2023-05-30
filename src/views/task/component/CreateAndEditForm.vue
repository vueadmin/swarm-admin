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
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入任务名称"  />
        </el-form-item>
        <el-form-item label="活动时间:" :label-width="formLabelWidth">
          <el-date-picker
            @change="onChange"
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <div class="city-county">
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select
              v-model="form.city"
              placeholder="请选择市"
              @visible-change="handleChange"
              @change="onSelect"
            >
              <el-option v-for="(city, index) in cityList" :key="index" :label="city.label" :value="city.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="县:" :label-width="formLabelWidth">
            <el-select v-model="form.district" placeholder="请选择县" @change="onCounty">
              <el-option v-for="(county, index) in countyList" :key="index" :label="county.label" :value="county.value" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="监测频次:" :label-width="formLabelWidth">
          <el-select v-model="form.cycle" placeholder="请选择监测频次">
            <el-option label="两周一次" value="14" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入信息" />
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
import { getCreate } from '@/api/tasks'
import { getCityList, getCityId, getCityUnit } from '@/api/city'
import { formatList } from '@/utils/time'
// import { purifyTime } from '@/utils/time'
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
      cityList: [],
      cityId: '',
      countyId: '',
      department: '',
      params: {
        region_id: ''
      },
      countyList: [],
      form: {
        name: '',
        date: '',
        city: '',
        district: '',
        cycle: '',
        comment: ''
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
        if (this.task === '编辑任务') {
          this.form.name = newV.name
          this.form.date = [formatList(newV.start_time), formatList(newV.end_time)]
          this.form.city = newV.city
          this.form.district = newV.district
          this.form.cycle = newV.city
          this.form.comment = newV.comment
        }
        console.log(newV, oldV, 87644)
      }
    }
  },
  created() {
    this.info()
  },
  mounted() {
  },
  methods: {
    onCounty(val) {
      this.countyId = val
    },
    async onSelect(val) {
      this.cityId = val
      console.log(val, 8809)
      try {
        const res = await getCityId(`?region_id=${val}`)
        this.countyList = res.data.map(item => ({ label: item.name, value: item.id }))
      } catch (error) {
        console.log(error)
      }
    },
    async handleChange() {
      try {
        const res = await getCityId(`?region_id=${this.params.region_id}`)
        this.cityList = res.data.map(item => ({ label: item.name, value: item.id }))
        console.log(res, 877666)
      } catch (error) {
        console.log(error)
      }
    },
    onChange(value) {
      this.form.date = value
      console.log(this.form.date, 765)
    },
    async info() {
      try {
        const res = await getCityList()
        this.params.region_id = res.data[0].id
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await getCityUnit(`?region_id=${this.params.region_id}`)
        this.department = res.data[0].id
        console.log(res, 444)
      } catch (error) {
        console.log(error)
      }
    },
    onReturn() {
      this.create = false
      if (this.create === false) {
        this.form.name = ''
        this.form.date = ''
        this.form.city = ''
        this.form.district = ''
        this.form.cycle = ''
        this.form.comment = ''
      }

      this.$emit('change', false)
      this.$emit('submit', false)
    },
    async onSubmit() {
      console.log(this.form.date[0].getTime(), 9999)
      try {
        const data = {
          name: this.form.name,
          start_time: this.form.date[0].getTime(),
          end_time: this.form.date[1].getTime(),
          cycle: 14,
          comment: this.form.comment,
          province: this.params.region_id,
          city: this.cityId || '',
          district: this.countyId || '',
          department: this.department

        }
        const res = await getCreate(data)
        this.create = false
        this.$emit('submit', false)
        this.$emit('change', false)
        console.log(res)
        this.form.name = ''
        this.form.date = ''
        this.form.city = ''
        this.form.district = ''
        this.form.cycle = ''
        this.form.comment = ''
      } catch (error) {
        console.log(error)
      }
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
