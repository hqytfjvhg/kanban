<template>
    <div>
        <pageHeader :title="$route.meta.title" :describe="'产品上线前的各阶段时间节点，提供了可视化数据展示'" 
        style="margin-bottom: 10px;"></pageHeader>
        <div id="myChart" :style="{ width: '1200px', height: '400px' }"></div>
        <div id="myChart2" :style="{ width: '1000px', height: '400px' }"></div>
    </div>
</template>
   
<script>
import { getStages } from '@/api/stage';
import pageHeader from '@/components/pageHeader/index.vue'
export default {
    name: "Pc2FbEcharts",
    components:{
        pageHeader
    },
    data() {
        return {
            stages: [],
            options1: {
                legend: {
                    data:[]
                    //data: ['zen1.0', 'blue4.0']
                },
                yAxis: {
                    type: 'category',
                    //boundaryGap: false,
                    data: ['pp', 'mp', 'bates', 'despatch', 'pr', 'launch']
                },
                xAxis: {
                    type: 'time'
                },
                series :[],
                // series: [
                //     {
                //         name: 'zen1.0',
                //         data: [new Date('2022-12-12'), new Date('2023-01-17'), new Date('2023-02-12'), new Date('2023-02-28'), new Date('2023-03-12'), new Date('2023-03-30')],
                //         type: 'line',
                //         label: {
                //             show: true,
                //             position: 'top',
                //             formatter: function (param) {
                //                 console.log(param)
                //                 return param.data.getMonth() + 1 + '/' + param.data.getDate();
                //             }
                //         },
                //     },
                //     {
                //         name: 'blue4.0',
                //         data: [new Date('2022-11-10'), new Date('2023-01-01'), new Date('2023-02-15'), new Date('2023-04-28'), new Date('2023-07-12'), new Date('2023-08-30')],
                //         type: 'line',
                //         //stack: 'Total',
                //         label: {
                //             show: true,
                //             position: 'bottom',
                //             formatter: function (param) {
                //                 return param.data.getMonth() + 1 + '/' + param.data.getDate();
                //             }
                //         },
                //     }
                // ]
            }
        };
    },

    mounted() {
        
        this.drawLine2();
        this.getStages1().then(
            
            () =>{ this.setOptions1()}
        ).then(
            () =>{
                //console.log(this.options1)
                this.drawLine();
            }
        );    
    },

    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption(this.options1);
        },
        drawLine2() {
            let myChart = this.$echarts.init(document.getElementById("myChart2"));
            myChart.setOption({
                title: {
                    text: 'Stacked Area Chart'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Direct',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Search Engine',
                        type: 'line',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });

        },
        async getStages1() {
            const { data: res } = await getStages()
            if (res.code == 200) {
                this.stages = res.data
            }
           // console.log(res.data)
        },
        setOptions1() {
            //console.log(this.stages)
            for (let index = 0; index < this.stages.length; index++) {
                const element = this.stages[index];
                const serie = {
                    type: 'line',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (param) {
                            console.log(param)
                            return param.name + '(' + (param.data.getMonth() + 1) + '/' + param.data.getDate() + ')';
                        }
                    }
                }
                serie.name = element.product
                this.options1.legend.data.push(element.product)
                const data  = []
                //'pp', 'mp', 'bates', 'despatch', 'pr', 'launch'
                data.push(new Date(element.pp))
                data.push(new Date(element.mp))
                data.push(new Date(element.bates))
                data.push(new Date(element.despatch))
                data.push(new Date(element.pr))
                data.push(new Date(element.launch))
                serie.data = data
                this.options1.series.push(serie)
            }
        }
    },
};
</script>