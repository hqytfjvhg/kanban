(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e00e0480"],{"0af4":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-container",attrs:{id:"add"}},[a("div",{staticClass:"addForm"},[a("el-form",{attrs:{model:t.form,"label-width":"90px"}},[a("el-row",[a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"product"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch,placeholder:"请输入内容"},model:{value:t.form.product,callback:function(e){t.$set(t.form,"product",e)},expression:"form.product"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"ifi"}},[a("el-input",{model:{value:t.form.saleIfi,callback:function(e){t.$set(t.form,"saleIfi",e)},expression:"form.saleIfi"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"distrib"}},[a("el-input",{model:{value:t.form.saleDistrib,callback:function(e){t.$set(t.form,"saleDistrib",e)},expression:"form.saleDistrib"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"total"}},[a("el-input",{model:{value:t.form.total,callback:function(e){t.$set(t.form,"total",e)},expression:"form.total"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("ADD")])],1)],1)],1)],1)],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"http://localhost:8081/info_screen/sale/excel/handler",multiple:"",limit:1,"on-success":t.handleSuccess,headers:t.headers}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传excel")])],1)],1),t.tableVisable?a("div",{staticClass:"table"},[a("el-card",{staticClass:"table-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("excel data")]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"primary"},on:{click:t.submitToBatch}},[t._v("确认批量操作")])],1),a("el-table",{staticClass:"table-content",attrs:{data:t.excelData}},[a("el-table-column",{attrs:{prop:"product",label:"product",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"saleIfi",label:"ifi",width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"saleDistrib",label:"distrib",width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"total",label:"total",width:"100",align:"center"}})],1)],1)],1):t._e()])},s=[],o=a("4360"),r=a("c4c3"),n={name:"sale-add",data(){return{base_api:"https://api.board.ifi-cloud.com",form:{},tableVisable:!1,excelData:[],products:[],headers:{token:o["a"].getters.token}}},created(){},computed:{},components:{},methods:{submit(){console.log(this.form)},async submitToBatch(){console.log(this.excelData);const{data:t}=Object(r["a"])(this.excelData);console.log(t)},handleSuccess(t){console.log(t),200==t.code&&(this.excelData=t.data,this.tableVisable=!0)},querySearch(t,e){console.log(t),e(this.products)},async getProducts(){const{data:t}=await Object(r["c"])();200==t.code&&(this.products=t.data)}},mounted(){this.getProducts()},watch:{}},c=n,i=(a("d5c9"),a("2877")),d=Object(i["a"])(c,l,s,!1,null,"1aa90056",null);e["default"]=d.exports},"1eed":function(t,e,a){},c4c3:function(t,e,a){"use strict";a.d(e,"d",(function(){return o})),a.d(e,"b",(function(){return r})),a.d(e,"f",(function(){return n})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return i})),a.d(e,"e",(function(){return d}));var l=a("751a"),s=a("4360");function o(t){return Object(l["a"])({url:"/info_screen/sale/add",method:"post",data:t,headers:{token:s["a"].getters.token}})}function r(t){return Object(l["a"])({url:"/info_screen/sale/delete/"+t,method:"delete",headers:{token:s["a"].getters.token}})}function n(t){return Object(l["a"])({url:"/info_screen/sale/update",method:"post",data:t,headers:{token:s["a"].getters.token}})}function c(){return Object(l["a"])({url:"/info_screen/sale/products",method:"get",headers:{token:s["a"].getters.token}})}function i(t){return Object(l["a"])({url:"/info_screen/sale/batch",data:t,method:"post",headers:{token:s["a"].getters.token}})}function d(t){return Object(l["a"])({url:"/info_screen/sale/list/paged",method:"post",data:t,headers:{token:s["a"].getters.token}})}},d5c9:function(t,e,a){"use strict";a("1eed")}}]);