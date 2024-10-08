<!--  -->
<template>
    <div class="dd-container">
        <!-- <div class="title" style="padding:1rem;">IfiBoard 消息推送</div>
        <div class="change-lan" style="margin:1rem;position:absolute;top: 0;right:0rem;">
            <ChangeLan></ChangeLan>
        </div> -->
        <van-nav-bar title="IfiBoard 消息推送"/>
        <div class="change-lan" style="margin:0.7rem;position:absolute;top: 0;right:0rem;z-index: 99;">
            <ChangeLan></ChangeLan>
        </div>
        <router-view />
        <van-tabbar v-model="activeName" route>
            <van-tabbar-item name="news-publish" icon="home-o" :to="{name:'news-publish'}">重要通知
                <!-- <keyNewForm></keyNewForm> -->
            </van-tabbar-item >
            <van-tabbar-item icon="friends-o"  to="/news">
                <!-- <ShowNewForm></ShowNewForm> -->展会信息
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o"  to="/news">
                <!-- <UrgentNewForm></UrgentNewForm> -->紧急通知
            </van-tabbar-item>
        </van-tabbar>

        <!-- <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import ChangeLan from '@/components/changeLan/index.vue'
import keyNewForm from "./component/key-new.vue"
import UrgentNewForm from "./component/urgent-new.vue"
import ShowNewForm from "./component/show-new.vue"
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        keyNewForm,
        UrgentNewForm,
        ShowNewForm,
        ChangeLan
    },
    name: 'dd-index',
    // props: {
    //    activeName: {
    //    type: String,
    //    required: false,
    //    default: 'first'
    //  }
    // },
    data() {
        // 这里存放数据
        return {
            rem: 0,
            activeName: 0,
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        // handleClick(tab, event) {
        //     console.log(tab, event);
        // },
        getHeight() {
            var htmlEle = document.documentElement
            var winWidth = htmlEle.clientWidth || document.body.clientWidth
            const rem = Math.ceil(winWidth / 15)
            document.documentElement.style.fontSize = rem + 'px'
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log("hello")

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        const that = this
        // window.onresize = () => {
        //     return (() => {
        //         that.getHeight()
        //     })()
        // }
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