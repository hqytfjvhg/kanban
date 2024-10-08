<!--  -->
<template>
    <div class="test1">
        <AreaClock></AreaClock>
        <div style="display: flex;justify-content: left;">
            <AvgTicket style="margin:10px;width: 600px;"></AvgTicket>
            <UnsolvedTicket style="margin:10px;width: 600px;"></UnsolvedTicket>
            <div class="clock-group" id="clock-group">
                <CrayonClock :timeZone="Number(8)" :country="China" />
            </div>
        </div>
        <UrgentNotice></UrgentNotice>
        <ExtNews></ExtNews>
        <KeyNews></KeyNews>
        <div style="display: flex;justify-content: left;">
            <AwardsIfr style="width: 800px;" :height="'450px'"></AwardsIfr>
            <NationalHoliday style="width: 800px;margin-left:10px"></NationalHoliday>
        </div>
        <div style="display: flex;justify-content: left;">
            <ProductReturn style="margin:10px;width: 800px;"></ProductReturn>
            <SoftwareStage style="margin:10px;width: 800px;"></SoftwareStage>
        </div>
        <div style="display: flex;justify-content: left;">
            <ProductTesting style="margin:10px;width: 800px;"></ProductTesting>
            <ProductStage style="margin:10px;width: 800px;"></ProductStage>
        </div>
        <div style="display: flex;justify-content: left;">
            <OverstockMonth style="margin:10px;width: 800px;"></OverstockMonth>
            <EolTable style="margin:10px;width: 800px;"></EolTable>
        </div>


        <ProjectDesc style="margin:10px;width: 900px;"></ProjectDesc>
        <CardComponent :width="'500px'"></CardComponent>

    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CrayonClock from '@/components/crayonClock/index.vue'
import AreaClock from '@/view/screen/components/AreaClock/index.vue'
import AvgTicket from '@/view/screen/components/AvgTicket/index.vue'
import UnsolvedTicket from '@/view/screen/components/UnsolvedTicket/index.vue'
import UrgentNotice from '@/view/screen/components/UrgentNotices/index.vue'
import ExtNews from '@/view/screen/components/ExtNews/index.vue'
import KeyNews from '@/view/screen/components/KeyNews/index.vue'
import AwardsIfr from '@/view/screen/components/AwardsIfr/index.vue'
import NationalHoliday from '@/view/screen/components/NationalHolidays/index.vue'
import ProductReturn from '@/view/screen/components/ProductReturn/index.vue'
import SoftwareStage from '@/view/screen/components/SoftwareStage/index.vue'
import ProductTesting from '@/view/screen/components/ProductTesting/index.vue'
import ProductStage from '@/view/screen/components/ProductStage/index.vue'
import OverstockMonth from '@/view/screen/components/OverstockMonth/index.vue'
import EolTable from '@/view/screen/components/EolTable/index.vue'
import ProjectDesc from '@/view/screen/components/projectDesc/index.vue'
import CardComponent from '@/view/screen/components/AreaClock/card.vue'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        AreaClock, AvgTicket, UnsolvedTicket, UrgentNotice,
        ExtNews, KeyNews, AwardsIfr, NationalHoliday, ProductReturn,
        SoftwareStage, ProductTesting, ProductStage, OverstockMonth,
        EolTable, CrayonClock,ProjectDesc,CardComponent
    },
    name: 'test1-index',
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
            value: true
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {

    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

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
.part1 {
    border-bottom: 1px solid #eee;
    padding: 20px 20px 20px 40px;
}

.test1 {
    width: 100%;
    height: 200%;
    background: #17113C;
    color: #EEE;
    font-family: Arial, Helvetica, sans-serif;
    overflow: auto;
}
.clock-group {
        background-color: #272956;
        border-radius: 8px;
        height: 70px;
        margin: 10px 0 10px 0.3rem;
      }
</style>
