<!--  -->
<template>
    <div class="EolTable">
        <div class="ticket-box" id="ticket-box" :style="'height:' + height">
            <div class="ticket-title" id="ticket-title">EOL</div>
            <el-table class="table-style" :data="eols" ref="stage" :height="tableHeight" :cell-style="cellStyle"
                :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle">
                <!-- width="180" -->
                <el-table-column align="center" label="Name" prop="name">
                </el-table-column>
                <el-table-column align="center" label="2 M.QTY" prop="mqty">
                </el-table-column>
                <el-table-column align="center" label="Last M.QTY" prop="lastMQty">
                </el-table-column>
                <el-table-column align="center" label="This M.QTY" prop="thisMQty">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'EolTable',
    props: {
        width: {
            type: String,
            //required: true,
            default: '600px'
        },
        height: {
            type: String,
            default: '320px'
        },
        tableHeight: {
            type: String,
            default: '200'
        },
        eols: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            data: [
                {
                    name: 'xxxx',
                    item1: '5000',
                    item2: '2560',
                    item3: '1260'
                },
                {
                    name: 'yyyy',
                    item1: '3000',
                    item2: '1800',
                    item3: '168'
                },
                {
                    name: 'zzzz',
                    item1: '999',
                    item2: '598',
                    item3: '88'
                },
                {
                    name: 'bbbb',
                    item1: '90',
                    item2: '60',
                    item3: '15'
                },
                {
                    name: 'cccc',
                    item1: '90',
                    item2: '60',
                    item3: '15'
                },
                {
                    name: 'dddd',
                    item1: '90',
                    item2: '60',
                    item3: '15'
                },
                {
                    name: 'eeee',
                    item1: '90',
                    item2: '60',
                    item3: '15'
                },
            ],
            ticketTableCellHeight: ''
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {
        rem: {
            handler: function () {
                document.documentElement.style.fontSize = this.rem
                console.log(`CardComponent change document rem` + this.rem)
            },
            immediate: true
        },
    },
    // 方法集合
    methods: {
        cellStyle({ rowIndex, columnIndex }) {
            const strArray = this.height.split('p', 2)
            this.ticketTableCellHeight = Math.ceil(Number(strArray[0]) / 7)
            if (rowIndex % 2 == 0 && columnIndex == 0) {
                return 'font-size: 1rem;background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0 && columnIndex == 2) {
                return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0 && columnIndex == 4) {
                return 'font-size: 1rem; background: #15184d; border: none; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0) {
                return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 0) {
                return 'font-size: 1rem;background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 2) {
                return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 4) {
                return 'font-size: 1rem; background: #252963; border: none; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else {
                return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            }
        },
        headerCellStyle({ columnIndex }) {
            if (columnIndex == 2) {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            } else if (columnIndex == 4) {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            } else {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            }
        },
        headerRowStyle() {
            return 'height: 2.5rem;'
        },
        tableScroll(table, speed) {
            // 拿到表格挂载后的真实DOM
            const divData = table.bodyWrapper
            setInterval(() => {
                if (divData.scrollHeight - divData.clientHeight > 10) {
                    if (divData.clientHeight + divData.scrollTop < divData.scrollHeight - 1) {
                        divData.scrollTop += 1// 元素自增距离顶部1像素
                        // console.log(`scrollHeight`, divData.scrollHeight)
                        // console.log('clientHeight', divData.clientHeight)
                        // console.log('scrollTop', divData.scrollTop)
                        if (divData.clientHeight + divData.scrollTop >= divData.scrollHeight - 1) {
                            setTimeout(() => {
                                divData.scrollTop = 0// 重置table距离顶部距离
                            }, 3000);
                        }
                    }
                }
            }, speed)
        },
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        const stage = this.$refs.stage
        this.tableScroll(stage, 50)
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
.ticket-box {
    // border: 0.1rem solid #578AEF;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-table,
.el-table__expanded-cell {
    background-color: transparent;
}


::v-deep.el-carousel {
    display: flex;
}

::v-deep.el-carousel__container {
    width: 100%;
    height: 22vh;
}





.ticket-box {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    background-color: #272956;
    border-radius: 8px;
    height: 320px;

    ::v-deep .el-table .cell {
        line-height: 1.8rem;
        padding: 0.5rem 0.5rem;
        text-align: center;
    }

    .table-style {
        color: #ffffffdd;
        background-color: transparent;
        font-size: 1rem;
    }

    .ticket-title {
        font-weight: bold;
        font-size: 1.3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: #EEE;
    }
}




::v-deep .el-table tr {
    background-color: transparent;
}

//重写el-table样式，背景透明度
.unsolved-ticket,
.stage,
.product-return,
.product-ticket {

    background-color: rgba($color: #ddd, $alpha: 0.05);
    background-color: #272956;
    border-radius: 10px;

    ::v-deep .el-table,
    .el-table_expanded-cell {
        background-color: transparent;
    }

    ::v-deep .el-table th {
        background-color: transparent !important;
        ;
    }

    ::v-deep .el-table tr {
        background-color: transparent !important;
    }

    ::v-deep .el-table--enable-row-transition .el-table_body td,
    .el-table .cell {
        background-color: transparent;
    }
}

.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}

//el-table 隐藏滚动条
.stage,
.unsolved-ticket,
.product-return,
.product-ticket {
    ::v-deep .is-scrolling-none {
        overflow: hidden;
        overflow-y: auto;
        overflow-x: scroll;
    }

    ::v-deep .is-scrolling-none::-webkit-scrollbar {
        display: none;
    }

    ::v-deep .el-table--scrollable-y ::-webkit-scrollbar {
        display: none;
    }

    ::v-deep .el-table--scrollable-x ::-webkit-scrollbar {
        display: none;
    }
}

//去除表格线
.stage ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
}

.product-return ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
}

.unsolved-ticket ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
}

.product-ticket ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
}

.stage ::v-deep .el-table th.is-leaf {
    /* 去除上边框 */
    border: none;
}

.product-return ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
}

.unsolved-ticket ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
}



.product-ticket ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
}



.stage ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
}

.product-ticket ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
}

.unsolved-ticket ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
}

.product-return ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
}

.el-table--border,
.el-table--group {
    /*去除多级表头，左上边框 */
    border: none;
}

.el-table--border::after,
.el-table--group::after {
    top: 0;
    right: 0;
    width: 0px;
    height: 100%;
}

//表格斜线样式
.left {
    text-align: left;
    position: relative;
    padding-left: 10px;
}

.left::after {
    content: '';
    width: 100%;
    height: 0px;
    position: absolute;
    top: 0;
    left: 0;
}

.right {
    text-align: right;
    padding-right: 10px;
}

.demo-table-expand {
    font-size: 0;
    //margin: 10px 60px
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;

}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
