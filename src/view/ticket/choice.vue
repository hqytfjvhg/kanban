<template>
        <div class="container" :style="height">
                <div class="top-box">
                        <div class="logo">
                                <img src="@/assets/logo1.png" alt="">
                        </div>
                        <div class="title">选择哪几队评选</div>
                </div>
                <div class="ticket-bottom">
                        <div style="width: 93%;  border-radius: 2px; padding-top: 20px;">
                                <div class="ticket-box">

                                        <!-- 5个 -->
                                        <div class="ticket-content">
                                                <div class="ticket-item">
                                                        <img src="@/assets/1.jpg" alt="" @click="changeOne(1)">
                                                        <el-checkbox v-model="checkeds[0].checked"
                                                                :disabled="checkeds[0].disabled"
                                                                @change="handleCheckAllChange(1)">时尚芭莎夜 ：{{ recode[0]
                                                                }}票</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/2.jpg" alt="" @click="changeOne(2)">
                                                        <el-checkbox v-model="checkeds[1].checked"
                                                                :disabled="checkeds[1].disabled"
                                                                @change="handleCheckAllChange(2)">春茗·凯韵 ：{{ recode[1]
                                                                }}票</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/3.jpg" alt="" @click="changeOne(3)">
                                                        <el-checkbox v-model="checkeds[2].checked"
                                                                :disabled="checkeds[2].disabled"
                                                                @change="handleCheckAllChange(3)">十年 ：{{ recode[2]
                                                                }}票</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/4.jpg" alt="" @click="changeOne(4)">
                                                        <el-checkbox v-model="checkeds[3].checked"
                                                                :disabled="checkeds[3].disabled"
                                                                @change="handleCheckAllChange(4)">白蛇传 ：{{ recode[3]
                                                                }}票</el-checkbox>
                                                </div>
                                                <div class="ticket-item">
                                                        <img src="@/assets/5.jpg" alt="" @click="changeOne(5)">
                                                        <el-checkbox v-model="checkeds[4].checked"
                                                                :disabled="checkeds[4].disabled"
                                                                @change="handleCheckAllChange(5)">野狼Disco ：{{ recode[4]
                                                                }}票</el-checkbox>
                                                </div>
                                        </div>
                                        <div class="bottom-button">
                                                <el-button type="primary" :disabled="disabled"
                                                        @click="confirmResult">立即提交</el-button>
                                        </div>
                                        <div style="color: white; margin-top: 13px;" v-if="choices">当前选择的是{{ choices }}
                                        </div>
                                        <div class="bottom-button" v-if="choices">
                                                <el-button type="primary" :disabled="disabled"
                                                        @click="toTick">前往投票</el-button>
                                        </div>
                                </div>
                        </div>
                </div>

        </div>
</template>

<script>
import { setTeamId, getTicketResult, reBoot } from '@/api/ticket'
export default {
        name: 'TicketChoice',
        data() {
                return {
                        active: 1,
                        disabled: false,
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
                        a: 0,
                        b: 0,
                        c: 0,
                        choices: '',
                        firstLabel: ['时尚芭莎夜', '春茗·凯韵', '十年', '白蛇传', '野狼Disco'],
                        recode: []
                }
        },
        created() {
                document.title = '春茗节目投票'
                this.height = 'height:' + window.innerHeight + 'px'
                this.getResult()
        },
        methods: {

                // 获取名次
                getPlace(score) {
                        let min = score.reduce((a, b) => a < b ? b : a)
                        console.log("score", score)
                        console.log("min", score.indexOf(min))
                },
                async getResult() {
                        let { data: res } = await getTicketResult()
                        if (res.code == 200) {
                                let data = []
                                data[0] = res.data.result1
                                data[1] = res.data.result2
                                data[2] = res.data.result3
                                data[3] = res.data.result4
                                data[4] = res.data.result5
                                this.recode = data
                                this.getPlace(data)
                        }
                },
                async toTick() {
                        var that = this
                        await reBoot().then(res => {
                                if (res.data.code == 200) {
                                        if (that.c > 0) {
                                                that.$router.push({ path: '/info_screen/screen/ticket_result3' })
                                        } else if (that.b > 0) {
                                                that.$router.push({ path: '/info_screen/screen/ticket_result2' })
                                        }
                                }
                                console.log("res", res.data.code)
                        })
                },
                changeOne(what) {
                        this.checkeds[what - 1].checked = !this.checkeds[what - 1].checked
                },
                handleCheckAllChange() { },
                confirmResult() {
                        var that = this
                        let d = 0
                        that.a = 0, that.b = 0, that.c = 0
                        for (let a = 0; a < 5; a++) {
                                if (that.checkeds[a].checked) {
                                        if (d == 0) {
                                                that.a = a + 1
                                                d++
                                        } else if (d == 1) {
                                                that.b = a + 1
                                                d++
                                        } else {
                                                that.c = a + 1
                                                d++
                                                break
                                        }
                                }
                        }
                        setTeamId(that.a, that.b, that.c).then(res => {
                                if (res.data.code == 200) {
                                        that.choices = that.c ?
                                                that.a + '-' + that.firstLabel[that.a - 1] + ', ' + that.b + '-' + that.firstLabel[that.b - 1]
                                                + ', ' + that.c + '-' + that.firstLabel[that.c - 1]
                                                : that.a + '-' + that.firstLabel[that.a - 1] + ', ' + that.b + '-' + that.firstLabel[that.b - 1]
                                        this.$message({
                                                type: "success",
                                                message: "选择成功！"
                                        })
                                }
                        })
                }
        }
}
</script>

<style lang="scss" scoped>
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
                                        width: 15%;
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
                padding: 2px 3px;

                img {
                        width: 60px;
                }
        }

        .title {
                font-size: 2rem;
                font-weight: bold;
                color: #f9e2af;
                font-family: 'Franklin Gothic Medium';
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

        .bottom-button {
                margin-top: 50px;
        }
}
</style>