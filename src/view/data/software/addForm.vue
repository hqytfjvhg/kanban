<!--  -->
<template>
  <div class="addForm">
    <el-form :model="form" label-width="120px">
            <el-form-item label="product:">
                <el-input type="text" :placeholder="$t(`software.productPlaceholder`)" v-model="form.product"></el-input>
            </el-form-item>
            <el-form-item label="version:">
                <el-input type="text" :placeholder="$t(`software.versionPlaceholder`)" v-model="form.version"></el-input>
            </el-form-item>
            <el-form-item label="prc:">
                <el-date-picker v-model="form.prc" type="date" :placeholder="$t(`software.prcPlaceholder`)" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="uk:">
                <el-date-picker v-model="form.uk" type="date" :placeholder="$t(`software.ukPlaceholder`)" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="launch:">
                <el-date-picker v-model="form.launch" type="date" :placeholder="$t(`software.launchPlaceholder`)" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="remark:">
                <el-date-picker v-model="form.remark" type="date" :placeholder="$t(`software.remarkPlaceholder`)" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" size="mini">{{$t(`software.comfirm`)}}</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { add } from '@/api/software';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'addForm',
//   props: {
//    handA: {
//      type: String,
//      required: true,
//      default: '100'
//    }
//   },
  data() {
    // 这里存放数据
    return {
      form:{}
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async submit(){
        console.log(this.form)
        const{data:res} = await add(this.form)
        if(res.code == 200){
            this.$message({
                    type: 'success',
                    message: 'add successfully!'
                })
          this.form = {}
          this.$emit("fatherMethod")      
        }else{
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类

</style>