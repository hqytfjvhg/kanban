<!--  -->
<template>
    <div class="changeLan">
        <!-- <el-select v-model="$i18n.locale" @change="selectI18($event)" size="mini" style="width:4.8rem">
            <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->

        <!-- <el-dropdown>
            <span class="el-dropdown-link">
                CN/EN<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setLan('ch')">CN</el-dropdown-item>
                <el-dropdown-item @click.native="setLan('en')">EN</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->

        <img v-if="$i18n.locale==='en'" src="@/assets/en.png" style="width:1.8rem;height: 1.8rem;" alt="" @click="setLan('ch')" />
        <img v-if="$i18n.locale==='ch'" src="@/assets/ch.png" style="width:1.8rem;height: 1.8rem;" alt="" @click="setLan('en')" />
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import i18n from "@/language/index.ts"
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'change-lan',
    //props: {
    //  handA: {
    //    type: String,
    //    required: true
    //    default: '100'
    //  }
    //},
    data() {
        // 这里存放数据
        return {
            langs: [{
                value: 'ch',
                label: 'CN'
            },
            {
                value: 'en',
                label: 'EN'
            }
            ],
            fit: true
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        selectI18(value) {
            console.log(value)
            localStorage.setItem('locale', value)
        },
        setLan(lan) {
            console.log(`set`, lan)
            this.$i18n.locale = lan
            localStorage.setItem('locale', lan)
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let lan = localStorage.getItem('locale') === null ? `en` : localStorage.getItem('locale');
        i18n.locale = lan
    },
    beforeCreate() { }, // 生命周期 - 创建之前
    beforeMount() { }, // 生命周期 - 挂载之前
    beforeUpdate() { }, // 生命周期 - 更新之前
    updated() { }, // 生命周期 - 更新之后
    beforeDestroy() { }, // 生命周期 - 销毁之前
    destroyed() { }, // 生命周期 - 销毁完成
    activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
</style>