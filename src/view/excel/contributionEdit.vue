<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<!-- 使用LuckySheet开源组件实现在线编辑Excel，并且显示当前Excel表格参与用户列表, 这个组件主要用于财务模块 -->
<template>
    <div class='main-div' id="main-div">

        <!-- 顶部右侧 当前Excel 编辑者和查看者列表 -->
        <div class="main-users">
            <el-popover placement="bottom" title="标题" width="300" trigger="hover" content="如出现数据无法实时保存,请手动保存。">
                <el-link slot="reference" @click="saveExcel()" style="margin-right: 15px;">手动保存Excel</el-link>
            </el-popover>

            <el-link @click="exportExcel()" style="margin-right: 20px;">导出Excel</el-link>
            <el-popover placement="right" width="400" trigger="click">
                <li v-for="item in groupUserList" :key="item.uid">{{ item.uid }}<span
                        style="margin-left: 15px;font-size: 13px;color: #a39e9e;">{{ item.time }}</span></li>
                <el-link slot="reference" href="#">
                    查看当前表格协同用户({{ groupUserList.length }})
                </el-link>
            </el-popover>
        </div>
        <!-- Excel编辑容器 -->
        <div id="luckysheet" class="main-luckysheet" :style="{ 'width': clientWidth, 'height': clientHeight }" />
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// const exportExcelUtil = require('@/utils/exportExcel')
import download from '@/utils/download';
import { saveExcelWorkData } from '@/api/excelWorkApi'
export default {
    //组件名称
    name: 'EditContributionEdit',
    //父组件传递值
    props: {
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            clientWidth: '',
            clientHeight: '800px',
            baseApiUrl: process.env.VUE_APP_BASE_API,
            baseSocketUrl: process.env.VUE_APP_WEBSOCKET_URL,
            socketJoinUrl: '', //加入表格Socket连接url
            gridKey: null,
            title: '',
            groupUserList: [],
            excelLoadUrl: process.env.VUE_APP_BASE_API + '/info_screen/excelWork/loadUrl'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 导出Excel
        async exportExcel() {
            /*
            // eslint-disable-next-line no-undef
            console.info(luckysheet.getluckysheetfile())
            // eslint-disable-next-line no-undef
            const buffer = await exportExcelUtil.exportExcel(luckysheet.getluckysheetfile())
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `${new Date().getTime()}.xlsx`; // 下载的文件名
            downloadLink.click();
            console.info('导出', buffer)
            */
            // 不使用 LuckySheet工具导出，使用后端解析导出
            download.downFile(`/info_screen/excelWork/exportExcel/${this.gridKey}`, new Date().getTime() + '-Excel-Export.xlsx').then((res) => {
                if (res) {
                    this.$message.success('导出成功')
                }

            })
        },
        /**
         * 手动调用Api保存整个Excel
         */
        async saveExcel() {
            // eslint-disable-next-line no-undef
            const toJson = JSON.stringify(luckysheet.toJson())

            const params = {
                'gridKey': this.gridKey,
                'data': toJson
            }

            saveExcelWorkData(params).then(() => {
                this.$message({
                    message: '手动保存成功！',
                    type: 'success'
                });
            })
        },
        openWebSocket() {

            const app = this
            // 创建 WebSocket加入Excel表格协同编辑

            const wsUrl = app.baseSocketUrl + app.socketJoinUrl

            // Create WebSocket connection.
            const socket = new WebSocket(wsUrl);


            // 连接成功后的回调函数
            socket.addEventListener("open", function () {

                // socket.send(JSON.stringify({ "excel_type": 1, "excel_cmd": gridKey }));
                console.info('[表格群组] WebSocket服务连接成功')

                setInterval(() => {
                    // 每隔60秒发送一次消息，防止被异常断开
                    socket.send('1');
                }, 600000);


            });

            // 监听接收消息事件,主要监听服务端的用户列表变动消息
            socket.addEventListener("message", function (event) {
                const data = JSON.parse(event.data)
                if (data.code === 2502) {
                    app.groupUserList = data.data
                }
                console.log("[表格群组] 接收到消息 ", data);
            });

            // 连接关闭后的回调函数
            socket.onclose = function () {

                console.log("[表格群组] WebSocket服务关闭.");

            };

            // 连接失败后的回调函数
            socket.addEventListener("error", function (event) {

                console.log("加入 [表格群组] 异常 : ", event);
            });

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.clientWidth = (document.getElementById('main-div').clientWidth - 30) + 'px'
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() {
        const query = this.$route.query
        if (query.gridKey !== undefined && query.gridKey !== '') {

            this.gridKey = query.gridKey

            this.title = query.title

            this.socketJoinUrl = `excel/exit?g=${this.gridKey}&u=${localStorage.getItem('username')}&ly=2`

            // 打开WebSocket
            this.openWebSocket()

            // 使用LuckySheet配置模式创建
            const options = {
                container: 'luckysheet', // 设定DOM容器的id
                gridKey: query.gridKey, // 表格唯一标识符
                title: query.title, // 设定表格名称
                lang: 'zh', // 设定表格语言
                loadUrl: this.excelLoadUrl, // LuckySheet数据加载地址
                allowUpdate: true, //LuckySheet数据允许更新, 如果需要测试手动保存，请关闭这个选项
                updateUrl: `${this.baseSocketUrl}excel/exit?u=${localStorage.getItem('username')}&ly=1`, // LuckySheet数据更新地址
                allowEdit: true, // 是否可以编辑
                showtoolbarConfig: { // 顶部菜单
                    undoRedo: false, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
                    paintFormat: false, //格式刷
                    currencyFormat: false, //货币格式
                    percentageFormat: false, //百分比格式
                    numberDecrease: false, // '减少小数位数'
                    numberIncrease: false, // '增加小数位数
                    moreFormats: false, // '更多格式'
                    font: true, // '字体'
                    fontSize: true, // '字号大小'
                    bold: true, // '粗体 (Ctrl+B)'
                    italic: true, // '斜体 (Ctrl+I)'
                    strikethrough: true, // '删除线 (Alt+Shift+5)'
                    underline: false, // '下划线 (Alt+Shift+6)'
                    textColor: false, // '文本颜色'
                    fillColor: false, // '单元格颜色'
                    border: false, // '边框'
                    mergeCell: false, // '合并单元格'
                    horizontalAlignMode: true, // '水平对齐方式'
                    verticalAlignMode: false, // '垂直对齐方式'
                    textWrapMode: false, // '换行方式'
                    textRotateMode: false, // '文本旋转方式'
                    image: false, // '插入图片'
                    link: false, // '插入链接'
                    chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
                    postil: false, //'批注'
                    pivotTable: false,  //'数据透视表'
                    function: true, // '公式'
                    frozenMode: false, // '冻结方式'
                    sortAndFilter: false, // '排序和筛选'
                    conditionalFormat: false, // '条件格式'
                    dataVerification: false, // '数据验证'
                    splitColumn: false, // '分列'
                    screenshot: false, // '截图'
                    findAndReplace: false, // '查找替换'
                    protection: false, // '工作表保护'
                    print: false, // '打印'
                },
                cellRightClickConfig: {  // 单元格右键菜单
                    copy: false, // 复制
                    copyAs: false, // 复制为
                    paste: false, // 粘贴
                    insertRow: false, // 插入行
                    insertColumn: false, // 插入列
                    deleteRow: false, // 删除选中行
                    deleteColumn: false, // 删除选中列
                    deleteCell: false, // 删除单元格
                    hideRow: false, // 隐藏选中行和显示选中行
                    hideColumn: false, // 隐藏选中列和显示选中列
                    rowHeight: false, // 行高
                    columnWidth: false, // 列宽
                    clear: false, // 清除内容
                    matrix: false, // 矩阵操作选区
                    sort: false, // 排序选区
                    filter: false, // 筛选选区
                    chart: false, // 图表生成
                    image: false, // 插入图片
                    link: false, // 插入链接
                    data: false, // 数据验证
                    cellFormat: false // 设置单元格格式
                },
                forceCalculation: true, // 默认情况下，为提高加载性能，表格初始化的时候，含有公式的单元格会默认直接取得v和m作为数据结果，而不做实时计算,需要开启，不然会导致公式异常
                sheetFormulaBar: true,
                showsheetbar: false // 不显示底部Sheet菜单，不允许操作多个Sheet
            }

            // 初始化表格
            // eslint-disable-next-line no-undef
            luckysheet.create(options)
        }
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
/**scoped 表示样式只在当前组件有效*/
//@import url(); 引入公共css类

.main-div {
    padding: 10px;
    height: 820px;
    position: relative;
}

/**
 LuckySheet组件
*/
.main-luckysheet {
    margin: 0px;
    padding: 0px;
    position: absolute;
    top: 40px;
}

/**
顶部右侧按钮组
*/
.main-users {
    position: absolute;
    right: 22px;
    text-align: right;
    width: 500px;
    /* 防止文字换行 */
    white-space: nowrap;
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 显示省略号来表示被截断的文本 */
    text-overflow: ellipsis;
}
</style>