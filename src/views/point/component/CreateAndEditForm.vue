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
      <el-form v-if="monitorValue !== '1'" ref="form" :model="form" :rules="rules" size="mini">
        <el-form-item label="监测点名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入监测点名称" />
        </el-form-item>
        <el-form-item required prop="maintainer_name" label="监测人:" :label-width="formLabelWidth">
          <el-input v-model="form.maintainer_name" autocomplete="off" placeholder="请输入监测人" />
        </el-form-item>
        <el-form-item required prop="maintainer_phone" label="监测人手机:" :label-width="formLabelWidth">
          <el-input v-model="form.maintainer_phone" autocomplete="off" placeholder="请输入手机号" />
        </el-form-item>
        <div class="city-county">
          <el-form-item class="habitat" label="生境:" :label-width="formLabelWidth">
            <el-select v-model="form.habitat" placeholder="请选择" @change="onSearch1">
              <el-option v-for="(habitat, index) in habitatList" :key="index" :label="habitat.label" :value="habitat.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="crop" label="作物:" :label-width="formLabelWidth">
            <el-select @change="onSearch2" v-model="form.crop" placeholder="请选择">
              <el-option v-for="(crop, index) in cropList" :key="index" :label="crop.label" :value="crop.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="planting" label="种植方式:" :label-width="formLabelWidth">
            <el-select @change="onSearch3" v-model="form.planting_method" placeholder="请选择">
              <el-option v-for="(planting, index) in planting_methodList" :key="index" :label="planting.label" :value="planting.value" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="生育期:" :label-width="formLabelWidth">
          <el-input v-model="form.growth_period" autocomplete="off" placeholder="请输入生育期" />
        </el-form-item>
        <el-form-item v-if="task === '编辑监测点'" label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <el-form v-else :model="formList" size="mini">
        <el-form-item label="监测人名称:" :label-width="formLabelWidth">
          <el-input class="nameInput" v-model="formList.username" autocomplete="off" placeholder="请输入监测人名称" />
        </el-form-item>
        <el-form-item label="初始密码:" :label-width="formLabelWidth">
          <el-input class="nameInput" v-model="formList.password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <div class="city-county">
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="formList.city" placeholder="请选择" @visible-change="handleChange" @change="onSelect">
              <el-option v-for="(city,index) in cityList" :key="index" :label="city.label" :value="city.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="县:" :label-width="formLabelWidth">
            <el-select v-model="formList.district" placeholder="请选择" @change="onCounty">
              <el-option v-for="(county, index) in countyList" :key="index" :label="county.label" :value="county.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="county" label="乡镇:" :label-width="formLabelWidth">
            <el-select v-model="formList.village" placeholder="请选择" @change="onTownship">
              <el-option v-for="(township, index) in townshipList" :key="index" :label="township.label" :value="township.value" />
            </el-select>
          </el-form-item>
        </div>
        <!-- <el-form-item label="上级单位:" :label-width="formLabelWidth">
          <el-select v-model="formList.unit" placeholder="请选择上级单位">
            <el-option label="晋中市太谷区植保站" value="1" />
          </el-select>
        </el-form-item> -->
        <el-form-item v-if="task === '编辑监测人'" label="创建时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          />
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
import { getUserLevel } from '@/utils/auth'
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

      // rules: {
      //   maintainer_phone: [
      //     { required: true, message: '手机号必填', trigger: 'blur' },
      //     { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
      //   ],
      //   maintainer_name: [
      //     { required: true, message: '检测人必填', trigger: 'blur' },
      //     { min: 2, max: 10, message: '请填写监测人', trigger: 'blur' }
      //   ]
      // },
      params: {
        region_id: ''
      },
      form: {
        name: '',
        date: '',
        city: '',
        maintainer_phone: '',
        county: '',
        frequency: '',
        pests: '',
        Remark: ''
      },
      formList: {
        name: '',
        phone: '',
        city: '',
        county: '',
        Township: '',
        unit: '',
        village: ''
      },
      create: false,
      townshipId: '',
      countyId: '',
      cityId: '',
      department: '',
      townshipList: [],
      countyList: [],
      cityList: [],
      cropList: [],
      habitatList: [],
      planting_methodList: [],
      cropId: '',
      habitatId: '',
      planting_methodId: ''
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
        if (this.task === '编辑监测点') {
          this.form.name = newV.name
          this.form.habitat = newV.habitat
          this.form.crop = newV.crop
          this.form.planting_method = newV.planting_method
          this.form.growth_period = newV.growth_period
          this.form.maintainer_name = newV.maintainer_name
          this.form.maintainer_phone = newV.maintainer_phone
        } else if (this.task === '编辑监测人') {
          this.formList.username = newV.username
          // this.formList.password = newV.username
          this.formList.phone = newV.phone
          // this.params.region_id = newV.username
          this.formList.city = newV.city
          this.formList.district = newV.district
          this.formList.village = newV.village
        }
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
    onSearch1(val) {
      this.habitatId = val
    },
    onSearch2(val) {
      this.cropId = val
    },
    onSearch3(val) {
      this.planting_methodId = val
    },
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
          const res = await getStations()
          console.log(res.crop, 7777)
          this.cropList = res.crop.map(item => ({ label: item.name, value: item.id }))
          console.log();
          this.habitatList = res.habitat.map(item => ({ label: item.name, value: item.id }))
          this.planting_methodList = res.planting_method.map(item => ({ label: item.name, value: item.id }))
          console.log(this.cropList, 633636)
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
      this.form.habitat = ''
      this.form.crop = ''
      this.form.planting_method = ''
      this.form.growth_period = ''
      this.form.maintainer_name = ''
      this.form.maintainer_phone = ''
      this.formList.username = ''
      this.formList.password = ''
      this.formList.phone = ''
      this.formList.unit = ''
      // this.params.region_id = newV.username
      this.formList.city = ''
      this.formList.district = ''
      this.formList.village = null
      this.$emit('change', false)
      this.$emit('submit1', false)
      this.$emit('submit2', false)
    },
    async onSubmit() {
      console.log(this.formList.village === '', 8888)
      if (this.monitorValue === '0') {
        try {
          const data = {
            name: this.form.name,
            habitat_id: this.habitatId,
            crop_id: this.cropId,
            planting_method_id: this.planting_methodId,
            growth_period: parseInt(this.form.growth_period),
            maintainer_username: this.form.maintainer_name,
            maintainer_phone: this.form.maintainer_phone
          }
          const res = await getCreate(data)
          console.log(res)
          this.create = false
          this.$emit('submit1', false)
          this.$emit('change', false, this.form)
          this.form.name = ''
          this.form.habitat = ''
          this.form.crop = ''
          this.form.planting_method = ''
          this.form.growth_period = ''
          this.form.maintainer_name = ''
          this.form.maintainer_phone = ''
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const data = {
            username: this.formList.username,
            password: this.formList.password,
            phone: this.formList.phone,
            user_level: getUserLevel(),
            province: this.params.region_id,
            city: this.formList.city === '' ? null : this.cityId,
            district: this.formList.district === '' ? null : this.countyId,
            village: this.formList.village === '' ? null : this.townshipId,
            department: this.department
          }
          const res = await getList(data)
          console.log(res)
          this.create = false
          this.$emit('submit2', false)
          this.$emit('change', false, this.form),
          this.formList.username = ''
          this.formList.password = ''
          this.formList.phone = ''
          this.formList.unit = ''
          // this.params.region_id = newV.username
          this.formList.city = ''
          this.formList.district = ''
          this.formList.village = null
        } catch (error) {
          console.log(error)
        }
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
