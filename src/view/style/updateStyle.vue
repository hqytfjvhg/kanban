<!--
* @description  参数1
* @fileName  updateStyle
* @author Arvin
* @date 2022-11-18 15:57:41
* @version V1.0.0
!-->

<template>
  <div id='updateStyle' class="updateStyle-container" style="display:flex;justify-content: space-around;">

    <div>
      <el-form label-width="150px">
        <el-form-item label="screen-background">
          <el-color-picker v-model="style.background.color"></el-color-picker>
        </el-form-item>

        <el-form-item label="border-style">
          <el-select v-model="style.border.type" placeholder="请选择">
            <el-option v-for="item in borderOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="border-lineWidth">
          <el-slider v-model="style.border.lineWidth" :max="lineWidthMax"></el-slider>
        </el-form-item>

        <el-form-item label="border-color">
          <el-color-picker v-model="style.border.color"></el-color-picker>
        </el-form-item>


        <!--dial-->
        <el-form-item label="dial-isDial">
          <el-switch v-model="style.dial.isDial" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

        <el-form-item label="number-isNumber">
          <el-switch v-model="style.number.isNumber" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

        <el-form-item label="number-style" v-if="style.number.isNumber">
          <el-select v-model="style.number.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="number-color" v-if="style.number.isNumber">
          <el-color-picker v-model="style.number.color"></el-color-picker>
        </el-form-item>

        <el-form-item label="number-fontSize" v-if="style.number.isNumber">
          <el-slider v-model="numberSize" :max="numberSizeMax"></el-slider>
        </el-form-item>

        <el-form-item label="number-fontWeight" v-if="style.number.isNumber">
          <el-select v-model="style.number.fontWeight" placeholder="请选择">
            <el-option v-for="item in fontWeightOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="needle-style">

          <el-dropdown>
            <el-button type="primary">
              choose<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="chooseNeedleType('second')">second</el-dropdown-item>
              <el-dropdown-item @click.native="chooseNeedleType('minute')">minute</el-dropdown-item>
              <el-dropdown-item @click.native="chooseNeedleType('hour')">hour</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div style="display:flex;justify-content: space-between;">
            <div v-if="currentNeedle == 'second'">
              second-length<el-slider v-model="style.second.length" :max="150"></el-slider>
              second-lineWidth<el-slider v-model="style.second.lineWidth" :max="8"></el-slider>
              second-longOut<el-slider v-model="style.second.longOut" :max="10"></el-slider>
              second-color<el-color-picker v-model="style.second.color"></el-color-picker>
            </div>

            <div v-if="currentNeedle == 'minute'">
              minute-length<el-slider v-model="style.minute.length" :max="150"></el-slider>
              minute-lineWidth<el-slider v-model="style.minute.lineWidth" :max="8"></el-slider>
              minute-longOut<el-slider v-model="style.minute.longOut" :max="10"></el-slider>
              minute-color<el-color-picker v-model="style.minute.color"></el-color-picker>
            </div>

            <div v-if="currentNeedle == 'hour'">
              hour-length<el-slider v-model="style.hour.length" :max="150"></el-slider>
              hour-lineWidth<el-slider v-model="style.hour.lineWidth" :max="5"></el-slider>
              hour-longOut<el-slider v-model="style.hour.longOut" :max="10"></el-slider>
              hour-color<el-color-picker v-model="style.hour.color"></el-color-picker>
            </div>
          </div>
        </el-form-item>

        <el-button type="primary" @click="update">确认</el-button>
      </el-form>
    </div>

    <div style="width:400px;height:400px;margin: 20px 20px;" :style="`background:${style.background.color};`">
      <vueClock :dial="style.dial" :number="style.number" :border="style.border"
        :needle="{ minute: style.minute, second: style.second, hour: style.hour }"></vueClock>
    </div>


    <!-- <div class="block">
      <span class="demonstration">背景颜色设置</span>
      <el-color-picker v-model="style.background.color"></el-color-picker>
    </div>

    <div class="block" style="width:300px;">
    <span class="demonstration">设置分针长度</span>
    <el-slider v-model="style.minute.length" max="200"></el-slider>
  </div>
  <div class="block">
      <span class="demonstration">分针颜色设置</span>
      <el-color-picker v-model="style.hour.color"></el-color-picker>
    </div>
    <div class="block" style="width:300px;">
    <span class="demonstration">设置分针粗细</span>
    <el-slider v-model="style.minute.lineWidth" max="10"></el-slider>
  </div> -->



  </div>
</template>


<script>
import { vueClock } from 'vue-clock-lonlyape'
import { getStyleById, updateStyle } from '@/api/style'
export default {
  name: 'update-style',
  data() {
    return {
      style: {
      },
      styleId: 1,
      options: [{
        value: 'roman',
        label: 'Roman'
      }, {
        value: 'arabic',
        label: 'Arabic'
      }],
      borderOptions: [
        {
          value: 'circle',
          label: 'Circle',
        },
        {
          value: 'rectangle',
          label: 'Rectangle',
        }
      ],
      fontWeightOptions: [
        {
          value: 'normal',
          label: 'Normal'
        },
        {
          value: 'bold ',
          label: 'bold'
        },
        {
          value: 'lighter',
          label: 'Lighter'
        },
        {
          value: 'bolder ',
          label: 'Bolder '
        },
      ],
      //
      lineWidthMax: 20,
      numberSizeMax: 30,
      numberSize: 19,

      currentNeedle: 'second'
    }
  },
  props: {

  },
  created() { // 实例被创建之后执行代码
    console.log(this.$route.query.styleId)
    this.styleId = this.$route.query.styleId
  },
  computed: { // 计算属性

  },
  components: { // 组件的引用
    vueClock
  },
  methods: { // 方法
    async getStyle() {

      const { data: res1 } = await getStyleById(this.styleId)
      console.log(res1)
      if (res1.code == 200) {
        this.style = res1.data
        if (this.style.number.fontSize != null) {
          this.numberSize = parseInt(this.style.number.fontSize)
        }
      }
    },
    async update() {
      console.log(this.style);
      const { data: res2 } = await updateStyle(this.style)
      console.log(res2);
      if (res2.code == 200) {
        this.getStyle()
      }
    },
    chooseNeedleType(type){
      this.currentNeedle = type
    }
  },
  mounted() { // 页面进入时加载内容

  },
  watch: { // 监测变化
    styleId() {
      this.getStyle()
    },
    numberSize() {
      this.style.number.fontSize = this.numberSize + 'px'
    }
  }
}
</script>
<style lang='scss' scoped>

</style>