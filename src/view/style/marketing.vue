<!--
* @description  参数1
* @fileName  marketing
* @author Arvin
* @date 2022-11-18 09:19:48
* @version V1.0.0
!-->

<template>
  <div id='marketing' class="marketing-container">
     
    <div class="table" style="margin:20px 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size:20px">Style list</span>
          <el-button style="float: right; padding: 3px 0;font-size:20px" type="primary"  @click="toAddStyle">Add Style</el-button>
          <el-button style="float: right; padding: 3px 0;font-size:20px;margin-right:10px ;" type="primary"
            @click="toClockList">See Clocks</el-button>
        </div>
        <el-table :data="globalStyles" style="width: 80%;margin:auto auto;">
          <el-table-column prop="clockStyleId" label="ID" width="100" align="center">
          </el-table-column>
          <el-table-column prop="dial,hour,minute,number,second,background" label="Style" width="200" align="center">
            <template slot-scope="scope">
              <div :style="`background:${scope.row.background.color};`">
                <vueClock class="clock" :dial="scope.row.dial" :number="scope.row.number"
                  :needle="{ minute: scope.row.minute, second: scope.row.second, hour: scope.row.hour }"></vueClock>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="statu" label="Statu" align="center" width="150">
            <template slot-scope="scope">
              <el-switch @change='changeStatus($event, scope.row.clockStyleId)' v-model="scope.row.statu"
                active-color="#13ce66" inactive-color="#ff4949" :disabled="scope.row.statu==true?true:false">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="operation" align="center" width="220">
            <template slot-scope="scope">
              <div style="display:flex;justify-content: space-around;">
                <div>
                  <el-button type="danger">delete</el-button>
                </div>
                <div>
                  <el-button type="primary" @click="update(scope.row.clockStyleId)">update</el-button>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="备注" align="center" width="220">
            <template>
              <div style="display:flex;justify-content: space-around;">
                备注
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getListByScreenId, changeStyleStatuToOne } from '@/api/style';
import { vueClock } from 'vue-clock-lonlyape'
export default {
  name: 'style-marketing',
  data () {
    return {
      globalStyles: [],
    }
  },
  created () { // 实例被创建之后执行代码
    this.getList()
    },
  computed: { // 计算属性

    },
  components: { // 组件的引用
    vueClock
    },
  methods: { // 方法
    async getList() {
      const screenId = 2
      const { data: res1 } = await getListByScreenId(screenId)
      console.log(res1)
      if (res1.code == 200) {
        this.globalStyles = res1.data
      }
    },
    toClockList() {
      const screenId = 2
      this.$router.push({ path: `/info_screen/data/clock?screenId=${screenId}` })
    },
    update(styleId) {

      this.$router.push({ path: `/info_screen/style/updateStyle?styleId=${styleId}` })
    }, 
    toAddStyle(){
      const screenId = 2
      this.$router.push({ path: `/info_screen/style/addStyle?screenId=${screenId}` })
    },
    async changeStatus($event, clockStyleId) {
      console.log($event)
      console.log(clockStyleId)
      const screenId = 2
      if ($event == true) {
        const { data: res3 } = await changeStyleStatuToOne(clockStyleId, screenId)
        console.log(res3);
        if (res3.code == 200) {
          this.getList()
        }
      }

    }
    },
  mounted () { // 页面进入时加载内容

    },
  watch: { // 监测变化

    }
}
</script>
<style lang='scss' scoped>

</style>