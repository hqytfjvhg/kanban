<!-- 新版财务电子看板大屏，访问页面：http://localhost:8080/#/info_screen/screen/finance/financeV2  -->
<template>
    <div class='main' id="main">
        <div class="header">
            <h3 class="header-title">{{ $t(`finance.kanBanTitle`) }}</h3>
            <div class="header-info-r">{{ $t(`finance.kanBanDateText`) }}：<span></span>{{ getNowDate }}
                <ChangeLan class="header-info-r-lang" />
            </div>
        </div>
        <div class="content">
            <!-- 一组放三个 图表 -->
            <div class="content-group">
                <div class="content-group-chart borderAll" :style="{ 'width': computedWidth, 'height': computedHeight }" />
                <div class="content-group-chart borderAll" :style="{ 'width': computedWidth, 'height': computedHeight }" />
                <!-- 最后一个元素取消 margin-right -->
                <div class="content-group-chart borderAll"
                    :style="{ 'width': computedWidth, 'height': computedHeight, 'margin-right': '0px' }" />
            </div>
            <div class="content-group">
                <div class="content-group-chart borderAll" :style="{ 'width': computedWidth, 'height': computedHeight }" />
                <div class="content-group-chart borderAll" :style="{ 'width': computedWidth, 'height': computedHeight }" />
                <!-- 最后一个元素取消 margin-right -->
                <div class="content-group-chart borderAll"
                    :style="{ 'width': computedWidth, 'height': computedHeight, 'margin-right': '0px' }" />
            </div>
        </div>
        <div class="footer" />
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ChangeLan from '@/components/changeLan/index.vue'
export default {
    //组件名称
    name: 'indexV2',
    //父组件传递值
    props: {
    },
    //import引入的组件需要注入到对象中才能使用
    components: {
        ChangeLan
    },
    data() {
        //这里存放数据
        return {
            computedWidth: '0px',
            computedHeight: '0px'
        };
    },
    //监听属性 类似于data概念
    computed: {
        getNowDate() {
            const date = new Date()
            const yyyy = date.getFullYear()
            const month = date.getMonth() + 1
            const sky = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            return yyyy + '-' + month + '-' + sky
        }
    },
    //监控data中的数据变化
    watch: {
        "$i18n.locale": { //监听语言的变化，每次变动都要重新渲染图表
            handler() {
                console.info('语言改变')

            },
            immediate: false
        }
    },
    //方法集合
    methods: {
        // 动态计算单个容器宽高
        async computedSizeFun() {
            // 获取浏览器可视化宽度
            const clientWidth = document.getElementById('main').clientWidth
            console.info('当前屏幕可视化宽度：', clientWidth)

            // 获取浏览器可视化高度
            const clientHeight = document.getElementById('main').clientHeight
            console.info('当前屏幕可视化高度：', clientHeight)

            // 一组是三个容器,计算单个容器宽
            const singleWidth = (clientWidth / 3) + 'px'
            console.info('单个容器宽度：', singleWidth)

            // 一共两组，计算单个容器的高,需要去掉 margin-bottom等的px
            const singleHeight = ((clientHeight / 2) - 60) + 'px'
            console.info('单个容器高度：', singleHeight)


            this.computedWidth = singleWidth
            this.computedHeight = singleHeight
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    async mounted() {
        // 等待计算容器大小计算完成
        await this.computedSizeFun()

        // 等待日期获取完成

        // 监听屏幕大小改变，重新计算容器大小
        window.onresize = async () => {
            await this.computedSizeFun()
        }
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
/**scoped 表示样式只在当前组件有效*/
//@import url(); 引入公共css类
@import '@/style/ScreenTableCss.scss';

.header .header-info-r {
    position: absolute;
    top: 32px;
    font-size: 18px;
    color: #73aae5;
    right: 50px;
}

.header .header-info-r .header-info-r-lang {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -5px;
    margin-left: 10px;
    cursor: pointer;
    display: inline-table;
}

.content {
    position: absolute;
    top: 72px;
    bottom: 22px;
    left: 0;
    right: 0;
    padding: 0px 10px;
}

.content .content-group {
    color: white;
    margin-bottom: 20px;
    display: flex;
}

.content .content-group .content-group-chart {
    float: left;
    margin-right: 20px;
}

.borderAll {
    border: 1px solid rgba(25, 186, 139, .17);
    padding: 0 0.2rem 0.4rem 0.15rem;
    background: rgba(255, 255, 255, .04) url('~@/assets/images/line.png');
    background-size: 100% auto;
    position: relative;
    margin-bottom: 0.15rem;
    z-index: 10;
}

.borderAll:before, .borderAll:after {
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
    content: "";
    border-top: 2px solid #02a6b5;
    top: 0;
}

</style>
