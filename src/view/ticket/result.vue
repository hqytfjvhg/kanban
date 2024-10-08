<template>
        <div class="container">
                <li class="el-icon-picture-outline" @click="bigImg" />
                <div class="logo">
                        <img src="@/assets/logo1.png" @click="reSet">
                        <div class="title" @click="toElse">2023春茗节目投票</div>
                </div>
                <div class="echart-box">
                        <div id="myChart" :style="{ width: '90%', height: '850px' }" style="margin:2rem 0 0 1rem"></div>
                </div>
                <div class="canvas" v-show="qrCodeShow" @click="closeQrcImg">
                        <canvas id="canvas"></canvas>
                </div>
        </div>
</template>

<script>
        import * as echarts from 'echarts';
        import {getTicketResult, reBoot} from '@/api/ticket'
        import QRCode from 'qrcode'
export default {
        name: 'TicketResult',
                data() {
                        return {
                                options: {
                                        xAxis: {
                                                max: 'dataMax',
                                                show: false
                                        },
                                        // 5个
                                        yAxis: {
                                                type: 'category',
                                                data: ['时尚芭莎夜', '春茗·凯韵', '十年', '白蛇传', '野狼Disco'],
                                                inverse: true,
                                                axisLine: {
                                                        show: false
                                                },
                                                axisTick: {
                                                        show: false
                                                },
                                                animationDuration: 300,
                                                animationDurationUpdate: 300,
                                                max: 4, // only the largest 3 bars will be displayed
                                                axisLabel: {
                                                        inside: false,
                                                        textStyle: {
                                                                fontSize:'50',
                                                                color: '#ffffff',
                                                                fontWeight: 'bold'
                                                        },
                                                        margin: 20,
                                                }
                                        },
                                        color: [
                                                '#f6cb91', '#ff0000', '#f6cb91', '#ff0000', '#8e84b8'
                                        ],
                                        textStyle: {
                                                fontSize: 18
                                        },
                                        grid: {
                                                left: '18% '
                                        },
                                        series: [
                                        {
                                                realtimeSort: true,
                                                name: '',
                                                type: 'bar',
                                                barWidth: 100,
                                                // 5个
                                                data: [0, 0, 0, 0, 0],
                                                label: {
                                                        show: true,
                                                        position: 'right',
                                                        valueAnimation: true,
                                                        color: '#ffffff',
                                                        fontSize: 80,
                                                        distance: 25,
                                                        offset: [0, 10]
                                                },
                                                itemStyle: {
                                                        normal: {
                                                                color: function(params) {
                                                                        let colorList = [
                                                                                '#FF7F00 ', 
                                                                                '#ffff00', 
                                                                                '#66CCFF', 
                                                                                '#99cc33', 
                                                                                '#8e84b8'
                                                                        ]
                                                                        return colorList[params.dataIndex]
                                                                }
                                                        }
                                                }
                                        }],
                                        animationDuration: 0,
                                        animationDurationUpdate: 2000,
                                        animationEasing: 'linear',
                                        animationEasingUpdate: 'linear',
                                },
                                qrCodeShow: false,
                                data: [],
                                firstLabel: ['时尚芭莎夜', '春茗·凯韵', '十年', '白蛇传', '野狼Disco'],
                                Interval: null
                        }
                },
                methods: {
                        qrCode() {
                                var canvas = document.getElementById("canvas");    
                                // 调用函数去生成二维码，参数依次为：二维码的容器、要生成的内容、回调函数    
                                QRCode.toCanvas(canvas, "http://kykj.ifi-audio.com.cn/#/info_screen/screen/ticket", {margin: 2, height: 200, width: 500}, function(error){        
                                        if(error){
                                                console.error(error);        
                                        }else{         
                                                console.log("success!");        
                                        }    
                                });
                        },
                        bigImg() {
                                this.qrCodeShow = true
                                this.qrCode()
                        },
                        closeQrcImg() {
                                this.qrCodeShow = false
                        },
                        toElse() {
                                clearTimeout(this.Interval)
                                this.Interval = null;
                                this.$router.push({path: '/info_screen/screen/choice'})
                        },
                        drawLine() {
                                var that = this
                                // 基于准备好的dom，初始化echarts实例
                                let myChart = that.$echarts.init(document.getElementById("myChart"));
                                
                                // 绘制图表
                                function run() {
                                        that.getResult().then(res => {
                                                that.options.series[0].data =  res
                                                myChart.setOption({
                                                        series: [
                                                        {
                                                                type: 'bar',
                                                                data: that.options.series[0].data
                                                        }]
                                                });
                                        })
                                        
                                }
                                setTimeout(function () {
                                        run();
                                }, 0);
                                this.Interval = setInterval(function () {
                                        run();
                                }, 1000);
                                myChart.setOption(that.options);
                        },
                        async getResult() {
                                let {data: res} = await getTicketResult()
                                if (res.code == 200) {
                                        let data = []
                                        data[0] = res.data.result1
                                        data[1] = res.data.result2
                                        data[2] = res.data.result3
                                        data[3] = res.data.result4
                                        data[4] = res.data.result5
                                        this.data = data
                                        return data
                                }
                        },
                        reSet() {
                                reBoot()
                        }

                },
                mounted() { // 页面进入时加载内容
                        document.title = '春茗节目投票'
                        this.drawLine()
                        this.getResult()
                }
        }
</script>

<style lang="scss" scoped>
        .el-icon-picture-outline {
                position: fixed;
                font-size: 31px;
                color: white;
                right: 20px;
                top: 20px;
        }
        .container {
                widows: 100vw;
                height: 100vh;
                background: #272f3e;
                position: relative;

                .canvas {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        z-index: 999;
                        top: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                }
                

                .echart-box {
                        display: flex;
                        justify-content: center;
                        margin-top: -50px;
                }

                .logo {
                        padding: 30px 0 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                                width: 90px;
                                height: 50px;
                                margin-right: 15px;
                        }
                }

                .title {
                        text-align: center;
                        font-weight: bold;
                        font-size: 60px;
                        background-image: linear-gradient(to bottom,  #fae4b5, #fae4b5, #f6cb91);
                        background-clip: text;
                        -webkit-background-clip: text;
                        color: transparent;
                }
        }
</style>