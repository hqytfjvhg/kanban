(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27e94450"],{"18f0":function(t,e,n){"use strict";n("1c4d")},"1c4d":function(t,e,n){},"59ce":function(t,e,n){"use strict";n.d(e,"e",(function(){return a})),n.d(e,"l",(function(){return c})),n.d(e,"f",(function(){return r})),n.d(e,"i",(function(){return d})),n.d(e,"m",(function(){return s})),n.d(e,"g",(function(){return u})),n.d(e,"a",(function(){return l})),n.d(e,"c",(function(){return h})),n.d(e,"j",(function(){return f})),n.d(e,"d",(function(){return p})),n.d(e,"b",(function(){return k})),n.d(e,"k",(function(){return m})),n.d(e,"h",(function(){return g}));var o=n("751a"),i=n("4360");function a(){return Object(o["a"])({url:"/ifi/vote/getUUID",method:"get"})}function c(t,e,n){return Object(o["a"])({url:"/ifi/vote/set/"+t+"/"+e+"/"+n,method:"get"})}function r(){return Object(o["a"])({url:"/ifi/vote/get",method:"get"})}function d(t){return Object(o["a"])({url:"/ifi/vote/reset",method:"get",data:t})}function s(t){return Object(o["a"])({url:"/ifi/vote/add",method:"post",data:t})}function u(){return Object(o["a"])({url:"/ifi/vote/result",method:"get"})}function l(t){return console.log(t),Object(o["a"])({url:"/info_screen/ticket/add",method:"post",data:t,headers:{token:i["a"].getters.token}})}function h(t){return Object(o["a"])({url:"/info_screen/ticket/delete/"+t,method:"delete",headers:{token:i["a"].getters.token}})}function f(t){return Object(o["a"])({url:"/info_screen/ticket/resolve",method:"post",data:t,headers:{token:i["a"].getters.token}})}function p(){return Object(o["a"])({url:"/info_screen/ticket/products",method:"get",headers:{token:i["a"].getters.token}})}function k(t){return Object(o["a"])({url:"/info_screen/ticket/adds",method:"post",data:t,headers:{token:i["a"].getters.token}})}function m(t){return Object(o["a"])({url:"/info_screen/ticket/list/paged",method:"post",data:t,headers:{token:i["a"].getters.token}})}function g(t,e,n,a){return Object(o["a"])({url:"/info_screen/ticket/sum/"+t+"/"+e+"/"+n+"/"+a,method:"get",headers:{token:i["a"].getters.token}})}},ced1:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view-container"},[n("el-card",{staticStyle:{display:"flex"}},[n("div",{staticStyle:{margin:"2rem 0 0 1rem"},style:{width:"500px",height:"300px"},attrs:{id:"myChart"}})])],1)},i=[],a=(n("14d9"),n("59ce")),c={name:"ticket-view",data(){return{totalTicketSum:[],solvedTicketSum:[],unsolvedTicketSum:[],condition1:{area:"all",product:"all",type:"total",days:7},condition2:{area:"all",product:"all",type:"solved",days:7},condition3:{area:"all",product:"all",type:"unsolved",days:7},options1:{title:{text:"7天内新增票数",subtext:"Fake Data"},legend:{data:["Row","China"]},xAxis:{type:"category",boundaryGap:[0,.01],data:["bule","zen1.0","stream1.0","go bar","product"]},yAxis:{type:"value"},series:[{name:"Row",data:[15,210,170,50,70],type:"bar",label:{show:!0,position:"top",formatter:function(t){return console.log(t),t.data}}},{name:"China",data:[120,200,150,80,70],type:"bar",label:{show:!0,position:"top",formatter:function(t){return console.log(t),t.data}}}]}}},methods:{drawLine(){let t=this.$echarts.init(document.getElementById("myChart"));t.setOption(this.options1)},setOption(t){let e=[];for(let n=0;n<t.length;n++){let o=t[n],i=o.product;e.includes(i)||e.push(i)}},async getAddTicketSum(t,e,n,o){const{data:i}=await Object(a["h"])(t,e,n,o);200==i.code&&(this.totalTicketSum=i.data),console.log(this.totalTicketSum)},async getSolvedTicket(t,e,n,o){const{data:i}=await Object(a["h"])(t,e,n,o);200==i.code&&(this.solvedTicketSum=i.data),console.log(this.solvedTicketSum)},async getUnsolvedTicket(t,e,n,o){const{data:i}=await Object(a["h"])(t,e,n,o);200==i.code&&(this.unsolvedTicketSum=i.data),console.log(this.unsolvedTicketSum)}},mounted(){this.getAddTicketSum(this.condition1.area,this.condition1.product,this.condition1.type,this.condition1.days),this.getSolvedTicket(this.condition2.area,this.condition2.product,this.condition2.type,this.condition2.days),this.getUnsolvedTicket(this.condition3.area,this.condition3.product,this.condition3.type,this.condition3.days),this.drawLine(),console.log(this.$route)},watch:{}},r=c,d=(n("18f0"),n("2877")),s=Object(d["a"])(r,o,i,!1,null,"26c85b4b",null);e["default"]=s.exports}}]);