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
        <el-form-item required label="监测人:" :label-width="formLabelWidth">
          <el-input v-model="form.maintainer_username" autocomplete="off" />
        </el-form-item>
        <el-form-item required label="监测人手机:" :label-width="formLabelWidth">
          <el-input v-model="form.maintainer_phone" autocomplete="off" />
        </el-form-item>
        <div class="city-county">
          <el-form-item class="habitat" label="生境:" :label-width="formLabelWidth">
            <el-select v-model="form.habitat_id" placeholder="请选择活动区域">
              <el-option label="丘陵" value="1" />
              <el-option label="平川" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item class="crop" label="作物:" :label-width="formLabelWidth">
            <el-select v-model="form.crop_id" placeholder="请选择活动区域">
              <el-option label="番茄" value="1" />
              <el-option label="马铃薯" value="2" />
              <el-option label="茄子" value="3" />
              <el-option label="辣椒" value="4" />
              <el-option label="豆角" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item class="planting" label="种植方式:" :label-width="formLabelWidth">
            <el-select v-model="form.planting_method_id" placeholder="请选择活动区域">
              <el-option label="拱棚" value="1" />
              <el-option label="暖棚" value="2" />
              <el-option label="露地" value="3" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="生育期:" :label-width="formLabelWidth">
          <el-input v-model="form.growth_period" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="task === '编辑监测点'" label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="form.Remark" type="textarea" />
        </el-form-item>
      </el-form>
      <el-form v-else :model="formList" size="mini">
        <el-form-item label="监测人名称:" :label-width="formLabelWidth">
          <el-input class="nameInput" v-model="formList.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="初始密码:" :label-width="formLabelWidth">
          <el-input class="nameInput" v-model="formList.password" autocomplete="off" />
        </el-form-item>
        <div class="city-county">
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="formList.city" placeholder="请选择活动区域" @visible-change="handleChange" @change="onSelect">
              <el-option v-for="(city,index) in cityList" :key="index" :label="city.label" :value="city.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="县:" :label-width="formLabelWidth">
            <el-select v-model="formList.district" placeholder="请选择活动区域" @change="onCounty">
              <el-option v-for="(county, index) in countyList" :key="index" :label="county.label" :value="county.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="乡镇:" :label-width="formLabelWidth">
            <el-select v-model="formList.village" placeholder="请选择活动区域" @change="onTownship">
              <el-option v-for="(township, index) in townshipList" :key="index" :label="township.label" :value="township.value" />
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
import { getCreate, getStations } from '@/api/monitor'
import { getCityList, getCityId, getCityUnit } from '@/api/city'

import { getList } from '@/api/user'
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
      params: {
        region_id: ''
      },
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
      create: false,
      townshipId: '',
      countyId: '',
      cityId: '',
      department: '',
      townshipList: [],
      countyList: [],
      cityList: []
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
        console.log(newV, oldV, 9999)
      }
    }
  },
  created() {
    this.info()
  },
  mounted() {

  },
  methods: {
    async onCounty(val) {
      this.countyId = val
      console.log(val, 87)
      try {
        const res = await getCityId(`?region_id=${val}`)
        this.townshipList = res.data.map(item => ({ label: item.name, value: item.id }))
      } catch (error) {
        console.log(error)
      }
    },
    onTownship(val) {

      this.townshipId = val
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
      } catch (error) {
        console.log(error)
      }
    },
    async info() {
      if (this.monitorValue === '0') {
        try {
          const res = getStations()
          console.log(res, 8888)
        } catch (error) {
          console.log(error)
        }
      } else {
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
      }
    },
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
    async onSubmit() {
      if (this.monitorValue === '0') {
        try {
          const data = {
            name: this.form.name,
            // habitat_id:,
            // crop_id: ,
            // planting_method_id:,
            // growth_period:,
            maintainer_username: this.form.maintainer_username,
            maintainer_phone: this.form.maintainer_phone
          }
          const res = await getCreate(data)
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const data = {
            username: this.formList.username,
            password: this.formList.password,
            phone: this.formList.phone,
            user_level: 'admin',
            province: this.params.region_id,
            city: this.cityId,
            district: this.countyId,
            village: this.townshipId,
            department: this.department
          }
          const res = await getList(data)
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
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
