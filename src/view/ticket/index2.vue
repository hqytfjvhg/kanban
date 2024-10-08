<template>
        <div class="container" :style="height">
                <div class="top-box">
                        <div class="logo">
                                <img src="@/assets/logo1.png" alt="">
                        </div>
                        <div class="title">春茗节目评选</div>
                </div>
                <div class="ticket-bottom">
                        <div style="width: 93%;  border-radius: 2px; padding-top: 20px;">
                                <div class="ticket-box">
                                        <!-- 2个 -->
                                        <div class="ticket-content">
                                                <div class="ticket-item">
                                                        <img :src="src1" alt="" @click="changeOne(1)">
                                                        <el-checkbox v-model="checkeds[0].checked" :disabled="checkeds[0].disabled" @change="handleCheckAllChange(1)" >
                                                                {{ title1 }}</el-checkbox>  
                                                </div>
                                                <div class="ticket-item">
                                                        <img :src="src2" alt="" @click="changeOne(2)">
                                                        <el-checkbox v-model="checkeds[1].checked" :disabled="checkeds[1].disabled" @change="handleCheckAllChange(2)">
                                                                {{ title2 }}</el-checkbox>
                                                </div>
                                                <!-- <div class="ticket-item">
                                                        <img src="@/assets/3.jpg" alt="" @click="changeOne(3)">
                                                        <el-checkbox v-model="checkeds[2].checked" :disabled="checkeds[2].disabled" @change="handleCheckAllChange(3)">
                                                                十年</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/4.jpg" alt="" @click="changeOne(4)">
                                                        <el-checkbox v-model="checkeds[3].checked" :disabled="checkeds[3].disabled" @change="handleCheckAllChange(4)">
                                                                白蛇传</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/5.jpg" alt="" @click="changeOne(5)">
                                                        <el-checkbox v-model="checkeds[4].checked" :disabled="checkeds[4].disabled" @change="handleCheckAllChange(5)">
                                                                野狼Disco</el-checkbox> -->
                                                <!-- </div> -->
                                        </div>
                                        <div class="bottom-button">
                                                <el-button type="primary" :disabled="disabled" @click="confirmResult">立即提交</el-button>
                                        </div>
                                        <!-- 2个 -->
                                        <!-- <div class="ticket-tip">只能选择一个节目</div> -->
                                        <!-- 5个 -->
                                        <!-- <div class="ticket-tip">必选3个节目才可提交</div> -->
                                </div>
                        </div>
                </div>
                        
        </div>
</template>

<script>
        import {toTicket, getTeamId, getStoId} from '@/api/ticket'
export default {
        name: 'TicketIndex2',
                data() {
                        return {
                                active: 1,
                                disabled: true,
                                checkeds: [
                                        {
                                                checked: false,
                                                disabled: false
                                        },
                                        {
                                                checked: false,
                                                disabled: false  
                                        },
                                        {
                                                checked: false,
                                                disabled: false  
                                        },
                                        {
                                                checked: false,
                                                disabled: false  
                                        },
                                        {
                                                checked: false,
                                                disabled: false  
                                        }
                                ],
                                count: 0,
                                height: 0,
                                title1: '',
                                title2: '',
                                src1: '',
                                src2: '',
                                firstLabel: ['时尚芭莎夜', '春茗·凯韵', '十年', '白蛇传', '野狼Disco'],
                                first1: null,
                                first2: null,
                                stoId: null

                        }
                },
                created() {
                        document.title = '春茗节目投票'
                        this.height = 'height:' + (window.innerHeight + 50)    + 'px'
                        this.getUuid()
                },
                mounted() { // 页面进入时加载内容
                        this.getId()
                }, 
                methods: {
                        getUuid() {
                                getStoId().then( res => {
                                        this.stoId = 'a' + res.data.data
                                })
                        },
                        getId() {
                                var that = this
                                getTeamId().then(res => {
                                        let data = res.data.data
                                        that.title1 = that.firstLabel[data.a-1]
                                        that.title2 = that.firstLabel[data.b-1]
                                        that.first1 = 'a' + data.a + '_' + data.b
                                        that.src1 = 'https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/' + data.a + '.jpg'
                                        that.src2 = 'https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/' + data.b + '.jpg'
                                        console.log(that.src1)
                                }) 
                        },
                        changeOne(what) {
                                if (!this.disabled && this.checkeds[what - 1].disabled) {
                                        return
                                }
                                this.checkeds[what - 1].checked = !this.checkeds[what - 1].checked
                                this.count = 0

                                // 2个
                                for (let a = 0; a < 2; a ++) {
                                        if (this.checkeds[a].checked) {
                                                this.count ++;
                                        }
                                }
                                if (this.count >= 1) {
                                        for (let a = 0; a < 2; a ++) {
                                                if (!this.checkeds[a].checked) {
                                                        this.checkeds[a].disabled = true
                                                }
                                        }
                                        this.disabled = false  
                                } else {
                                        for (let a = 0; a < 2; a ++) {
                                                this.checkeds[a].disabled = false
                                        }
                                        this.disabled = true
                                }
                        },
                        handleCheckAllChange(val) {
                                this.count = 0

                                // 2个
                                for (let a = 0; a < 2; a ++) {
                                        if (this.checkeds[a].checked) {
                                                this.count ++;
                                        }
                                }
                                if (this.count >= 1) {
                                        for (let a = 0; a < 2; a ++) {
                                                if (!this.checkeds[a].checked) {
                                                        this.checkeds[a].disabled = true
                                                }
                                        }
                                        this.disabled = false  
                                } else {
                                        for (let a = 0; a < 2; a ++) {
                                                this.checkeds[a].disabled = false
                                        }
                                        this.disabled = true
                                }
                        },
                        confirmResult() {
                                var that = this
                                // 2个的时候需要更改
                                let a = localStorage.getItem(that.stoId)
                                if(!a) {
                                        localStorage.setItem(that.stoId, "fff")
                                } else {
                                        this.$message({
                                                type: "error",
                                                message: "每个用户每轮只能投一次，提交失败"
                                        })
                                        return
                                }
                                let data = {
                                        "item1": this.checkeds[0].checked ? 1 : 0,
                                        "item2": this.checkeds[1].checked ? 1 : 0,
                                        "item3": this.checkeds[2].checked ? 1 : 0,
                                        "item4": this.checkeds[3].checked ? 1 : 0,
                                        "item5": this.checkeds[4].checked ? 1 : 0  
                                }
                                toTicket(data).then( res => {
                                        if (res.data.code == 200) {
                                                this.$message({
                                                        type: "success",
                                                        message: "投票成功，感谢您的参与！"
                                                }) 
                                        }
                                })
                        }
                }
        }
</script>

<style lang="scss" scoped>

        ::v-deep.el-message-box__wrapper {
                border: 1px solid gold !important;
        }
        .container {
                font-family: '微软雅黑';
                background: #272f3e;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 20px 0;

                .ticket-bottom {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 2px;
                        padding: 1rem 0 0;
                        width: 100%;

                        .ticket-box {
                                
                                display: flex;
                                flex-direction: column;
                                align-items: center;

                                .ticket-content {
                                        width: 100%;
                                        display: flex;
                                        justify-content: space-around;
                                        margin-bottom: 20px;

                                        .ticket-item {
                                                width: 46%;
                                                display: flex;
                                                flex-direction: column;
                                                
                                                img {
                                                        width: 100%;
                                                        margin-bottom: 5px;
                                                        border-radius: 8px;
                                                }

                                                .el-checkbox {
                                                color: white;
                                                }
                                        }
                                        
                                }

                                .ticket-tip {
                                        color: white;
                                        font-weight: bold;
                                        font-size: 1rem;
                                        margin: 10px 0 20px;
                                }
                        }
                }
                   

                .top-box {
                        display: flex;
                        align-items: center;
                        margin-top: 0.5rem;
                }

                .logo {
                        margin-right: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 2px 3px ;

                        img {
                                width: 60px;
                        }
                }

                .title {
                        font-size: 2rem;
                        font-weight: bold;
                        color: #f9e2af;
                        font-family:'Franklin Gothic Medium';
                }

                .tip-box {
                        display: flex;
                        align-items: center;
                        margin-top: 1.2rem;

                        .line {
                                background-color: #ffe3b4;
                                height: 1px;
                                width: 3rem;
                        }

                        .tip-content {
                                color: #ffe3b4;
                                font-weight: bold;
                                margin: 0 1rem;
                                font-size: 1.2rem;
                                font-family: 'Courier New', Courier, monospace;
                        }
                }
        }
</style>