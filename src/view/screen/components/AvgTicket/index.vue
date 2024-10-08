<!--  -->
<template>
    <div class="AvgTicket">
        <div class="ticket-box" :style="'height:' + height">
            <!-- <div class="ticket-title" id="ticket-title">Seven-day Avg. ticket(R=Row, C=CN)</div> -->
            <!-- ref="avgTable"  :height="ticketTableHeight" :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle" -->
            <el-table class="table-style" :data="complaints" :height="tableHeight" :cell-style="cellStyle" ref="avgTable"
                :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle" :span-method="arraySpanMethod"
                style="margin:0.1rem 0">
                <el-table-column type="index" width="30">
                    <template slot-scope="scope">
                        <span v-if="scope.$index + 1 == 1" style="color: gold; font-weight: 800;">1</span>
                        <span v-else-if="scope.$index + 1 == 2" style="color: red; font-weight: 800;">2</span>
                        <span v-else-if="scope.$index + 1 == 3" style="color: green; font-weight: 800;">3</span>
                        <span v-else-if="scope.$index + 1 == 4" style="color: #ccc;">4</span>
                        <span v-else style="color: #ccc;">5</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Row">
                    <el-table-column align="center" label="Product" prop="rowProduct"  width="160">
                        <template slot-scope="scope">{{ scope.row.rowProduct == null ? '-' : scope.row.rowProduct
                        }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="No.Tick." prop="rowTotal" :width="Math.ceil(8 * rem)">
                        <template slot-scope="scope">
                            <!-- Math.ceil(scope.row.rowTotal/7) -->
                            {{ scope.row.rowTotal == null ? '-' : scope.row.rowTotal  }}
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="China">
                    <el-table-column align="center" label="Product" prop="chinaProduct"  width="160">
                        <template slot-scope="scope">
                            {{ scope.row.chinaProduct == null ? '-' : scope.row.chinaProduct }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="No.Tick." prop="chinaTotal" :width="Math.ceil(8 * rem)">
                        <template slot-scope="scope">
                            <!-- Math.ceil(scope.row.chinaTotal/7) -->
                            {{ scope.row.chinaTotal == null ? '-' : scope.row.chinaTotal }}
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getAvgTicket } from '@/api/sts';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'AvgTicket',
    props: {
        tableHeight: {
            type: String,
            //required: true,
            default: '20'
        },
        weight: {
            type: String,
            //required: true,
            default: '100'
        },
        height: {
            type: String,
            default: '320px'
        },
        rem: {
            type: String,
            default: ''
        },
        complaints: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            data: [],
            ticketTableCellHeight: ''
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async getAvgTickets() {
            //getAvgTicket
            const { data: res } = await getAvgTicket()
            if (res.code == 200) {
                this.data = res.data
            }
        },
        cellStyle({ rowIndex, columnIndex }) {
            const strArray = this.height.split('p', 2)
            this.ticketTableCellHeight = Math.ceil(Number(strArray[0]) / 7)
            if (rowIndex % 2 == 0 && columnIndex == 0) {
                return 'background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0 && columnIndex == 2) {
                return 'font-size: 0.9rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0 && columnIndex == 4) {
                return 'font-size: 0.9rem; background: #15184d; border: none; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 0) {
                return 'font-size: 0.9rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 0) {
                return 'background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 2) {
                return 'font-size: 0.9rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else if (rowIndex % 2 == 1 && columnIndex == 4) {
                return 'font-size: 0.9rem; background: #252963; border: none; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            } else {
                return 'font-size: 0.9rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 800; height: ' + this.ticketTableCellHeight + 'px'
            }
        },
        headerCellStyle({ columnIndex }) {
            if (columnIndex == 0 || columnIndex == 1) {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border-bottom: 1px solid #333; border-right: 1px solid #555; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            } else if (columnIndex == 4) {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            } else {
                return "font-weight: 600;background: #0f0938; white-space:nowrap; border-bottom: 1px solid #333; border-right: 1px solid #333; padding: 0; height:" + this.ticketTableCellHeight + 'px; color: white;'
            }
        },
        headerRowStyle() {
            return 'height: 2.5rem;'
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (row == 1) {
                if (0 < colum < 2) {
                    return {
                        rowspan: row,
                        colspan: column
                    }
                }
            }
        }


    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // this.getAvgTickets().then(() => {
        //     this.data.unshift({
        //         rowProduct: 'row',
        //         rowNum: 23,
        //         chinaProduct: 'china',
        //         chinaNum: 23
        //     })
        //     this.data.unshift({
        //         rowProduct: 'row',
        //         rowNum: 23,
        //         chinaProduct: 'china',
        //         chinaNum: 23
        //     })
        //     this.data.unshift({
        //         rowProduct: 'row',
        //         rowNum: 23,
        //         chinaProduct: 'china',
        //         chinaNum: 23
        //     })
        //     this.data.unshift({
        //         rowProduct: 'row',
        //         rowNum: 23,
        //         chinaProduct: 'china',
        //         chinaNum: 23
        //     })
        //     this.data.unshift({
        //         rowProduct: 'row',
        //         rowNum: 23,
        //         chinaProduct: 'china',
        //         chinaNum: 23
        //     })
        // })
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
    //flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    background-color: #272956;
    border-radius: 8px;
    height: 320px;
    // border: 0.1rem solid #578AEF;

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
