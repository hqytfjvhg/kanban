(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bc7f5df"],{"2fc2":function(t,e,i){},4241:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));const a="US$m"},6711:function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"w",(function(){return n})),i.d(e,"y",(function(){return o})),i.d(e,"v",(function(){return r})),i.d(e,"z",(function(){return l})),i.d(e,"d",(function(){return c})),i.d(e,"e",(function(){return h})),i.d(e,"x",(function(){return d})),i.d(e,"c",(function(){return f})),i.d(e,"b",(function(){return u})),i.d(e,"h",(function(){return p})),i.d(e,"k",(function(){return m})),i.d(e,"g",(function(){return b})),i.d(e,"m",(function(){return g})),i.d(e,"p",(function(){return x})),i.d(e,"t",(function(){return O})),i.d(e,"q",(function(){return y})),i.d(e,"j",(function(){return v})),i.d(e,"s",(function(){return S})),i.d(e,"n",(function(){return C})),i.d(e,"o",(function(){return w})),i.d(e,"i",(function(){return L})),i.d(e,"u",(function(){return _})),i.d(e,"f",(function(){return W})),i.d(e,"A",(function(){return $})),i.d(e,"r",(function(){return z})),i.d(e,"C",(function(){return H})),i.d(e,"l",(function(){return j})),i.d(e,"B",(function(){return A}));var a=i("751a");function s(){return Object(a["a"])({url:"/info_screen/board/finance/all",method:"get"})}function n(t){return Object(a["a"])({url:"/info_screen/board/finance/outcomes/"+t,method:"get"})}function o(t){return Object(a["a"])({url:"/info_screen/board/finance/saleMonth/"+t,method:"get"})}function r(t){return Object(a["a"])({url:"/info_screen/board/finance/incomes/"+t,method:"get"})}function l(){return Object(a["a"])({url:"/info_screen/board/finance/sale/rate",method:"get"})}function c(t){return Object(a["a"])({url:"/info_screen/board/dept/all/"+t,method:"get"})}function h(t){return Object(a["a"])({url:"/info_screen/board/dept/month/"+t,method:"get"})}function d(t){return Object(a["a"])({url:"/info_screen/board/purchase/"+t,method:"get"})}function f(t){return Object(a["a"])({url:"/info_screen/board/cash/"+t,method:"get"})}function u(t){return Object(a["a"])({url:"/info_screen/board/balance/"+t,method:"get"})}function p(t){return Object(a["a"])({url:"/info_screen/board/clock/"+t,method:"get"})}function m(t){return Object(a["a"])({url:"/info_screen/board/member/"+t,method:"get"})}function b(t){return Object(a["a"])({url:"/info_screen/board/award/true/"+t,method:"get"})}function g(t){return Object(a["a"])({url:"/info_screen/board/unexpired/notices/"+t,method:"get"})}function x(){return Object(a["a"])({url:"/info_screen/board/productTesting/list",method:"get"})}function O(){return Object(a["a"])({url:"/info_screen/board/software/list",method:"get"})}function y(){return Object(a["a"])({url:"/info_screen/board/project/list",method:"get"})}function v(){return Object(a["a"])({url:"/info_screen/board/eol/list",method:"get"})}function S(){return Object(a["a"])({url:"/info_screen/board/return/list",method:"get"})}function C(){return Object(a["a"])({url:"/info_screen/board/monthOverstock/list",method:"get"})}function w(){return Object(a["a"])({url:"/info_screen/board/productStage/list",method:"get"})}function L(){return Object(a["a"])({url:"/info_screen/board/complaint/list",method:"get"})}function _(){return Object(a["a"])({url:"/info_screen/board/complaintUnsolved/list",method:"get"})}function W(){return Object(a["a"])({url:"/info_screen/board/avgDays",method:"get"})}function $(t){return Object(a["a"])({url:"/info_screen/board/avgDays/"+t,method:"get"})}function z(){return Object(a["a"])({url:"/info_screen/board/returnDays",method:"get"})}function H(t){return Object(a["a"])({url:"/info_screen/board/returnDays/"+t,method:"get"})}function j(){return Object(a["a"])({url:"/info_screen/board/monthOverstock/type",method:"get"})}function A(t){return Object(a["a"])({url:"/info_screen/board/monthOverstock/type/"+t,method:"get"})}},a57d:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cost-container",attrs:{id:"cost-container"}},[i("ChangeLan",{staticClass:"change-lan"}),i("div",{staticClass:"first-row top-left-parent",style:"height:"+this.firstHeight+"px;"},[i("div",{staticClass:"top-left-text"},[t._v(t._s(t.topLeftCornerOfTheFinancialBoard_))]),i("div",{staticClass:"cost-table"},[i("el-table",{staticClass:"table",staticStyle:{margin:"auto 1.4.5rem",width:"100%",padding:"5px"},attrs:{data:t.cost,height:this.tableHeight-40+"px","cell-style":t.cellStyle}},[i("el-table-column",{attrs:{type:"index",width:"40"}}),"ch"===t.$i18n.locale?i("el-table-column",{attrs:{align:"center",label:t.$t("cost.department"),prop:"name"}}):i("el-table-column",{attrs:{align:"center",label:t.$t("cost.department"),prop:"enName"}}),i("el-table-column",{attrs:{align:"center",label:t.$t("cost.expense"),prop:"cost"}}),i("el-table-column",{attrs:{align:"center",label:t.$t("cost.forecast"),prop:"budget"}}),i("el-table-column",{attrs:{align:"center",label:t.$t("cost.difference"),prop:"rate",formatter:t.formatRate},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.rate>0?i("span",{staticStyle:{color:"red"}},[t._v(t._s(e.row.rate)+"%")]):i("span",[t._v(t._s(e.row.rate)+"%")])]}}])})],1)],1),i("div",{staticClass:"chart-group top-left-parent"},[i("div",{staticClass:"top-left-text"},[t._v(t._s(t.topLeftCornerOfTheFinancialBoard_))]),i("div",{staticClass:"charts1",staticStyle:{display:"flex"}},[i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle1"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle2"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle3"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle4"}})]),i("div",{staticClass:"charts2",staticStyle:{display:"flex"}},[i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle5"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle6"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle7"}}),i("div",{staticStyle:{flex:"1"},style:"height:"+(this.circleChartHeight-10)+"px;width:"+(this.circleChartWidth-20)+"px;",attrs:{id:"circle8"}})])])]),i("div",{staticClass:"second-row",style:"height:"+this.secondHeight+"px;"},[i("div",{staticClass:"cost-count top-left-parent",staticStyle:{"text-align":"center"}},[i("div",{staticClass:"top-left-text",staticStyle:{margin:"20px"}},[t._v(" "+t._s(t.topLeftCornerOfTheFinancialBoard_)+" ")]),i("div",{staticClass:"sale-volumn",staticStyle:{height:"50%",margin:"1rem 2rem"}},[i("div",{staticClass:"title",staticStyle:{"font-size":"3rem",color:"aquamarine","margin-bottom":"15px"}},[t._v(" "+t._s(t.$t("cost.totalExpense"))+" ")]),i("div",{staticClass:"content",staticStyle:{"font-size":"4.5rem",color:"aquamarine"}},[t._v(" "+t._s(t.total.volume)+" ")])]),i("div",{staticClass:"sale-budget",staticStyle:{height:"40%",margin:"1rem 2rem"}},[i("div",{staticClass:"title",staticStyle:{"font-size":"3rem",color:"aquamarine","margin-bottom":"15px"}},[t._v(" "+t._s(t.$t("cost.torecastExpense"))+" ")]),i("div",{staticClass:"content",staticStyle:{"font-size":"4.5rem",color:"aquamarine"}},[t._v(" "+t._s(t.total.budget)+" ")])])]),i("div",{staticClass:"top-left-parent"},[i("div",{staticClass:"top-left-text",staticStyle:{margin:"20px"}},[t._v(t._s(t.topLeftCornerOfTheFinancialBoard_))]),i("div",{staticClass:"line-chart",style:{width:t.lineChartWidth+"px",height:t.lineChartHeight+"px"},attrs:{id:"lineChart"}})]),i("div",{staticClass:"top-left-parent"},[i("div",{staticClass:"top-left-text",staticStyle:{margin:"20px"}},[t._v(" "+t._s(t.topLeftCornerOfTheFinancialBoard_)+" ")]),i("div",{staticClass:"bar-chart",style:{width:t.barChartWidth+"px",height:t.barChartHeight+"px"},attrs:{id:"barChart"}})])])],1)},s=[],n=(i("14d9"),i("4241")),o=i("6711"),r=i("f1c9"),l={components:{ChangeLan:r["a"]},name:"cost-screen",data(){return{topLeftCornerOfTheFinancialBoard_:n["a"],loading:null,firstHeight:0,secondHeight:0,circleChartHeight:0,circleChartWidth:0,tableHeight:0,tableWidth:0,lineChartWidth:0,lineChartHeight:0,barChartWidth:0,barChartHeight:0,cost:[],total:{volume:"",budget:""},circleOptions1:{title:{text:"UK办事处",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"UK办事处",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions2:{title:{text:"USA办事处",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"USA办事处",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions3:{title:{text:"HK办事处",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"HK办事处",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions4:{title:{text:"研发部",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"研发部",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions5:{title:{text:"供应链",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"供应链",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions6:{title:{text:"行政费用",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"行政费用",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions7:{title:{text:"市场部",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"市场部",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},circleOptions8:{title:{text:"财务部",left:"center",textStyle:{fontSize:20,color:"#eee"}},tooltip:{trigger:"item"},legend:{show:!1,left:"left",bottom:"5%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},series:[{name:"财务部",type:"pie",radius:["40%","70%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{fontSize:16,position:"inner",fontWeight:"bold",color:"#eee",formatter:"{b|{b}} {c|{c}}",rich:{b:{fontSize:14}}},emphasis:{label:{show:!0,fontSize:40,fontWeight:"bold"}},labelLine:{show:!1},data:[{value:2876346,name:"费用"},{value:2640553,name:"预算"}]}]},lineOptions:{title:{text:"费用月度趋势图",left:"center",textStyle:{fontSize:20,color:"#eee"}},grid:{top:"15%",left:"2%",right:"5%",bottom:"5%",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},toolbox:{feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}},iconStyle:{borderColor:"#7fffd4"}},legend:{data:["费用","费用预算"],left:"right",top:"8%",right:"3%",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},xAxis:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],axisPointer:{type:"shadow"}}],yAxis:[{type:"value",name:"",min:0,max:1251,splitNumber:4,axisLabel:{formatter:function(t){var e=[];return t>=1e4?e.push(Math.floor(t/1e3)):e.push(t),e}},splitLine:{show:!0,lineStyle:{color:"rgba(238,238,238,0.5)",type:"dashed"}}}],series:[{name:"费用",type:"bar",color:"#5e8aae",tooltip:{valueFormatter:function(t){return"$ "+t}},data:[895,108,895,108,895,108,895,108,895,108,895,108]},{name:"费用预算",type:"bar",color:"#2feea2",tooltip:{valueFormatter:function(t){return"$ "+t}},data:[1251,573,1251,573,1251,573,1251,573,1251,573,1251,573]}]},barOptions:{title:{text:"部门费用图",left:"center",textStyle:{fontSize:20,color:"#eee"}},grid:{top:"16%",left:"2%",right:"5%",bottom:"10%",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},toolbox:{feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}},iconStyle:{borderColor:"#7fffd4"}},legend:{data:["费用","预算","预算完成率"],left:"right",top:"8%",left:"middle",itemWidth:24,itemHeight:14,itemGap:5,textStyle:{color:"#fff",fontWeight:"400",fontFamily:"Source Han Sans CN",fontSize:12}},xAxis:[{type:"category",data:["UK办事处","USA办事处","研发部","供应链","行政费用","市场部","财务部","人力部","信息部"],axisPointer:{type:"shadow"}}],yAxis:[{show:!0,axisTick:{show:!0},axisLine:{show:!0},axisLabel:{show:!0},splitLine:{show:!1},type:"value",name:"",min:0,max:0,splitNumber:7},{show:!0,axisTick:{show:!0},axisLine:{show:!0},axisLabel:{show:!0,formatter:"{value}%"},splitLine:{show:!1},type:"value",name:"Rates",min:0,max:120,splitNumber:7}],series:[{name:"费用",type:"bar",color:"#73c0de",tooltip:{valueFormatter:function(t){return"$ "+t}},data:[2876345,1495994.77,709901.38,725656.83,268101.98,297032.16,135166.1,162095.46,116113]},{name:"预算",type:"bar",color:"#fc8452",tooltip:{valueFormatter:function(t){return"$ "+t}},data:[2640553,116113,1210583.5,832610.4,251146.8,443210.6,166952.5,163460.6,116295.3]},{name:"预算完成率",type:"line",yAxisIndex:1,tooltip:{valueFormatter:function(t){return t+" %"}},data:[109,72,59,87,107,67,81,99,100]}]}}},computed:{},watch:{"$i18n.locale":{handler(){this.getDeptAll().then(()=>{this.getDeptMonth().then(()=>{this.destroyAllCharts(),this.drawLine()})})}}},methods:{Loading(){this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},getHeight(){var t=document.getElementById("cost-container"),e=t.clientWidth;this.rem=Math.ceil(e/115),document.documentElement.style.fontSize=this.rem+"px";let i=window.innerHeight;this.firstHeight=Math.ceil(.5*i),this.secondHeight=Math.ceil(.5*i),this.circleChartHeight=Math.round(.5*i*.5),this.circleChartWidth=Math.round(.67*e*.25),this.tableHeight=Math.round(.5*i),this.tableWidth=Math.round(.33*e),this.lineChartHeight=Math.round(.5*i),this.lineChartWidth=Math.round(.33*e),this.barChartHeight=Math.round(.5*i),this.barChartWidth=Math.round(.33*e),this.loading.close()},drawLine(){this.saleLine1=this.$echarts.init(document.getElementById("circle1")),this.saleLine2=this.$echarts.init(document.getElementById("circle2")),this.saleLine3=this.$echarts.init(document.getElementById("circle3")),this.saleLine4=this.$echarts.init(document.getElementById("circle4")),this.saleLine5=this.$echarts.init(document.getElementById("circle5")),this.saleLine6=this.$echarts.init(document.getElementById("circle6")),this.saleLine7=this.$echarts.init(document.getElementById("circle7")),this.saleLine8=this.$echarts.init(document.getElementById("circle8")),this.lineChart=this.$echarts.init(document.getElementById("lineChart")),this.barChart=this.$echarts.init(document.getElementById("barChart")),this.barOptions.title.text=this.$t("cost.departmentalExpense");const t=[];t[0]=this.$t("cost.expense"),t[1]=this.$t("cost.forecast"),t[2]=this.$t("cost.difference"),this.barOptions.legend.data=t,this.barOptions.series[0].name=this.$t("cost.expense"),this.barOptions.series[1].name=this.$t("cost.forecast"),this.barOptions.series[2].name=this.$t("cost.difference"),this.lineOptions.legend.data=t,this.lineOptions.series[0].name=this.$t("cost.expense"),this.lineOptions.series[1].name=this.$t("cost.forecast"),this.circleOptions1.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions1.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions2.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions2.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions3.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions3.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions4.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions4.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions5.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions5.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions6.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions6.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions7.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions7.series[0].data[1].name=this.$t("cost.forecast"),this.circleOptions8.series[0].data[0].name=this.$t("cost.expense"),this.circleOptions8.series[0].data[1].name=this.$t("cost.forecast"),this.lineOptions.title.text=this.$t("cost.monthlyTrendOfExpense"),this.saleLine1.setOption(this.circleOptions1),this.saleLine2.setOption(this.circleOptions2),this.saleLine3.setOption(this.circleOptions3),this.saleLine4.setOption(this.circleOptions4),this.saleLine5.setOption(this.circleOptions5),this.saleLine6.setOption(this.circleOptions6),this.saleLine7.setOption(this.circleOptions7),this.saleLine8.setOption(this.circleOptions8),this.lineChart.setOption(this.lineOptions),this.barChart.setOption(this.barOptions)},destroyAllCharts(){this.saleLine1.dispose(),this.saleLine2.dispose(),this.saleLine3.dispose(),this.saleLine4.dispose(),this.saleLine5.dispose(),this.saleLine6.dispose(),this.saleLine7.dispose(),this.saleLine8.dispose(),this.lineChart.dispose(),this.barChart.dispose()},cellStyle({rowIndex:t}){return t%2==0?"background: #15184d;padding:0.4.5rem 0rem":t%2==1?"background: #252963;padding:0.4.5rem 0rem":void 0},formatRate(t,e,i){return i+"%"},async getDeptAll(){const{data:t}=await Object(o["d"])(this.$i18n.locale);console.log(t),200==t.code&&(this.cost=t.data.table,this.barOptions.xAxis[0].data=t.data.xData,this.barOptions.series[0].data=t.data.costs,this.barOptions.series[1].data=t.data.budgets,this.barOptions.series[2].data=t.data.rates,this.barOptions.yAxis[0].min=t.data.minValue1,this.barOptions.yAxis[0].max=t.data.maxValue1,this.barOptions.yAxis[1].min=t.data.minValue2,this.barOptions.yAxis[1].max=t.data.maxValue2,"ch"==this.$i18n.locale?(this.circleOptions1.title.text=t.data.table[0].name,this.circleOptions2.title.text=t.data.table[1].name,this.circleOptions3.title.text=t.data.table[2].name,this.circleOptions4.title.text=t.data.table[3].name,this.circleOptions5.title.text=t.data.table[4].name,this.circleOptions6.title.text=t.data.table[5].name,this.circleOptions7.title.text=t.data.table[6].name,this.circleOptions8.title.text=t.data.table[7].name):(this.circleOptions1.title.text=t.data.table[0].enName,this.circleOptions2.title.text=t.data.table[1].enName,this.circleOptions3.title.text=t.data.table[2].enName,this.circleOptions4.title.text=t.data.table[3].enName,this.circleOptions5.title.text=t.data.table[4].enName,this.circleOptions6.title.text=t.data.table[5].enName,this.circleOptions7.title.text=t.data.table[6].enName,this.circleOptions8.title.text=t.data.table[7].enName),this.circleOptions1.series[0].data[0].value=t.data.table[0].cost,this.circleOptions1.series[0].data[1].value=t.data.table[0].budget,this.circleOptions2.series[0].data[0].value=t.data.table[1].cost,this.circleOptions2.series[0].data[1].value=t.data.table[1].budget,this.circleOptions3.series[0].data[0].value=t.data.table[2].cost,this.circleOptions3.series[0].data[1].value=t.data.table[2].budget,this.circleOptions4.series[0].data[0].value=t.data.table[3].cost,this.circleOptions4.series[0].data[1].value=t.data.table[3].budget,this.circleOptions5.series[0].data[0].value=t.data.table[4].cost,this.circleOptions5.series[0].data[1].value=t.data.table[4].budget,this.circleOptions6.series[0].data[0].value=t.data.table[5].cost,this.circleOptions6.series[0].data[1].value=t.data.table[5].budget,this.circleOptions7.series[0].data[0].value=t.data.table[6].cost,this.circleOptions7.series[0].data[1].value=t.data.table[6].budget,this.circleOptions8.series[0].data[0].value=t.data.table[7].cost,this.circleOptions8.series[0].data[1].value=t.data.table[7].budget,this.total.volume=t.data.volume,this.total.budget=t.data.budget)},async getDeptMonth(){const{data:t}=await Object(o["e"])(this.$i18n.locale);if(200==t.code){this.lineOptions.legend.data=t.data.legendData,this.lineOptions.series[0].name=t.data.series[0].name,this.lineOptions.series[0].data=t.data.series[0].data,this.lineOptions.series[1].name=t.data.series[1].name,this.lineOptions.series[1].data=t.data.series[1].data,this.lineOptions.xAxis[0].data=t.data.xData,this.lineOptions.yAxis[0].min=t.data.minValue,this.lineOptions.yAxis[0].max=t.data.maxValue;let e=[];t.data.series[0].data.forEach(t=>{0===t&&(t=null),e.push(t)}),this.lineOptions.series[0].data=e;let i=[];t.data.series[1].data.forEach(t=>{0===t&&(t=null),i.push(t)}),this.lineOptions.series[1].data=i}}},created(){},mounted(){document.title="Department Financial Dashboard",this.getDeptAll(),this.getDeptMonth(),this.Loading();const t=this;window.onresize=()=>(()=>{t.getHeight(),t.destroyAllCharts(),setTimeout(()=>{t.drawLine()},200)})(),setTimeout(()=>{this.getHeight()},200),setTimeout(()=>{this.drawLine()},200)},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},c=l,h=(i("ac24"),i("ca74"),i("2877")),d=Object(h["a"])(c,a,s,!1,null,"7d4aec12",null);e["default"]=d.exports},ab74:function(t,e,i){},ac24:function(t,e,i){"use strict";i("2fc2")},ca74:function(t,e,i){"use strict";i("ab74")}}]);