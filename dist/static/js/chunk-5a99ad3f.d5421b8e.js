(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a99ad3f"],{"0ac4":function(t,e,o){},"0e71":function(t,e,o){},"2a7e":function(t,e,o){"use strict";o("e4e1")},"3e54":function(t,e,o){"use strict";o("9cc8")},"3ea6":function(t,e,o){"use strict";o("0ac4")},"52c2":function(t,e,o){"use strict";o("0e71")},6711:function(t,e,o){"use strict";o.d(e,"a",(function(){return r})),o.d(e,"w",(function(){return a})),o.d(e,"y",(function(){return s})),o.d(e,"v",(function(){return i})),o.d(e,"z",(function(){return c})),o.d(e,"d",(function(){return l})),o.d(e,"e",(function(){return d})),o.d(e,"x",(function(){return m})),o.d(e,"c",(function(){return u})),o.d(e,"b",(function(){return h})),o.d(e,"h",(function(){return p})),o.d(e,"k",(function(){return f})),o.d(e,"g",(function(){return g})),o.d(e,"m",(function(){return b})),o.d(e,"p",(function(){return v})),o.d(e,"t",(function(){return k})),o.d(e,"q",(function(){return y})),o.d(e,"j",(function(){return O})),o.d(e,"s",(function(){return $})),o.d(e,"n",(function(){return _})),o.d(e,"o",(function(){return w})),o.d(e,"i",(function(){return x})),o.d(e,"u",(function(){return T})),o.d(e,"f",(function(){return S})),o.d(e,"A",(function(){return M})),o.d(e,"r",(function(){return C})),o.d(e,"C",(function(){return D})),o.d(e,"l",(function(){return j})),o.d(e,"B",(function(){return z}));var n=o("751a");function r(){return Object(n["a"])({url:"/info_screen/board/finance/all",method:"get"})}function a(t){return Object(n["a"])({url:"/info_screen/board/finance/outcomes/"+t,method:"get"})}function s(t){return Object(n["a"])({url:"/info_screen/board/finance/saleMonth/"+t,method:"get"})}function i(t){return Object(n["a"])({url:"/info_screen/board/finance/incomes/"+t,method:"get"})}function c(){return Object(n["a"])({url:"/info_screen/board/finance/sale/rate",method:"get"})}function l(t){return Object(n["a"])({url:"/info_screen/board/dept/all/"+t,method:"get"})}function d(t){return Object(n["a"])({url:"/info_screen/board/dept/month/"+t,method:"get"})}function m(t){return Object(n["a"])({url:"/info_screen/board/purchase/"+t,method:"get"})}function u(t){return Object(n["a"])({url:"/info_screen/board/cash/"+t,method:"get"})}function h(t){return Object(n["a"])({url:"/info_screen/board/balance/"+t,method:"get"})}function p(t){return Object(n["a"])({url:"/info_screen/board/clock/"+t,method:"get"})}function f(t){return Object(n["a"])({url:"/info_screen/board/member/"+t,method:"get"})}function g(t){return Object(n["a"])({url:"/info_screen/board/award/true/"+t,method:"get"})}function b(t){return Object(n["a"])({url:"/info_screen/board/unexpired/notices/"+t,method:"get"})}function v(){return Object(n["a"])({url:"/info_screen/board/productTesting/list",method:"get"})}function k(){return Object(n["a"])({url:"/info_screen/board/software/list",method:"get"})}function y(){return Object(n["a"])({url:"/info_screen/board/project/list",method:"get"})}function O(){return Object(n["a"])({url:"/info_screen/board/eol/list",method:"get"})}function $(){return Object(n["a"])({url:"/info_screen/board/return/list",method:"get"})}function _(){return Object(n["a"])({url:"/info_screen/board/monthOverstock/list",method:"get"})}function w(){return Object(n["a"])({url:"/info_screen/board/productStage/list",method:"get"})}function x(){return Object(n["a"])({url:"/info_screen/board/complaint/list",method:"get"})}function T(){return Object(n["a"])({url:"/info_screen/board/complaintUnsolved/list",method:"get"})}function S(){return Object(n["a"])({url:"/info_screen/board/avgDays",method:"get"})}function M(t){return Object(n["a"])({url:"/info_screen/board/avgDays/"+t,method:"get"})}function C(){return Object(n["a"])({url:"/info_screen/board/returnDays",method:"get"})}function D(t){return Object(n["a"])({url:"/info_screen/board/returnDays/"+t,method:"get"})}function j(){return Object(n["a"])({url:"/info_screen/board/monthOverstock/type",method:"get"})}function z(t){return Object(n["a"])({url:"/info_screen/board/monthOverstock/type/"+t,method:"get"})}},"6a83":function(t,e,o){},"6e33":function(t,e,o){"use strict";o("6a83")},8419:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"monthOverstock"},[o("pageHeader",{attrs:{title:t.$t("monthOverstock.pageTitle"),describe:t.$t("monthOverstock.pageDesc")}}),o("div",{staticStyle:{"margin-left":"1rem"}},[o("el-form",{staticClass:"form-box",attrs:{inline:!0,model:t.form,size:"mini"}},[o("el-form-item",{attrs:{label:t.$t("monthOverstock.name"),span:1}},[o("el-input",{staticStyle:{width:"220px"},attrs:{clearable:"",placeholder:t.$t("return.productPlaceholder")},model:{value:t.page.queryCondition.name,callback:function(e){t.$set(t.page.queryCondition,"name",e)},expression:"page.queryCondition.name"}})],1),o("el-form-item",{attrs:{label:t.$t("return.startTime"),span:1}},[o("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"datetime",placeholder:t.$t("return.startTimePlaceholder"),"value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.page.queryCondition.startTime,callback:function(e){t.$set(t.page.queryCondition,"startTime",e)},expression:"page.queryCondition.startTime"}})],1),o("el-form-item",{attrs:{label:t.$t("return.endTime"),span:1}},[o("el-date-picker",{staticStyle:{width:"250px"},attrs:{type:"datetime",placeholder:t.$t("return.endTimePlaceholder"),"value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.page.queryCondition.endTime,callback:function(e){t.$set(t.page.queryCondition,"endTime",e)},expression:"page.queryCondition.endTime"}})],1),o("el-form-item",{attrs:{span:1}},[o("el-button",{attrs:{icon:"el-icon-search",type:"primary"},on:{click:t.submitToQuery}},[t._v(t._s(t.$t("return.query")))])],1)],1)],1),o("div",{staticClass:"new-create",staticStyle:{"margin-left":"1rem"}},[o("el-button",{staticClass:"create-button",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.openDialog(1)}}},[o("i",{staticClass:"el-icon-plus"}),t._v(t._s(t.$t("monthOverstock.add")))]),o("el-upload",{ref:"uploadRef",attrs:{action:t.base_api+"/info_screen/monthOverstock/excel/handler",multiple:"",limit:1,"on-success":t.handleSuccess,headers:t.headers,"before-upload":t.beforeUpload,"show-file-list":!1}},[o("el-button",{attrs:{size:"mini",type:"primary"}},[o("i",{staticClass:"el-icon-upload2"}),t._v(t._s(t.$t("monthOverstock.batchAdd")))])],1),o("el-button",{staticClass:"create-button",staticStyle:{"margin-left":"15px"},attrs:{type:"success",size:"mini"},on:{click:t.changeMonthOverstockType}},[1==t.monthOverstockType?o("span",[t._v(t._s(t.$t("monthOverstock.btnTitle1")))]):t._e(),2==t.monthOverstockType?o("span",[t._v(t._s(t.$t("monthOverstock.btnTitle2")))]):t._e()]),o("el-button",{staticStyle:{"margin-left":"0"},attrs:{type:"warning",size:"mini"},on:{click:function(e){t.visible1=!0}}},[o("i",{staticClass:"el-icon-view"}),t._v(" "+t._s(t.$t("int.view"))+" ")]),o("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"primary",size:"mini"}},[o("i",{staticClass:"el-icon-download"}),o("a",{staticStyle:{margin:"0.3rem 0.5rem 0.3rem 0",color:"#fff"},attrs:{href:t.base_api+"/template/Monthly_Overstock.xlsx"}},[t._v(t._s(t.$t("excelTemplate.downloadTemplate")))])])],1),o("el-dialog",{attrs:{title:t.$t("monthOverstock.excelDialogTitle"),visible:t.visible},on:{close:function(e){t.visible=!1}}},[o("MonthOverstockTable",{attrs:{data:t.excelData},on:{fatherMethod:t.closeMonthStockTable}})],1),o("el-dialog",{attrs:{title:t.dialogTitle,visible:t.addFormVisible,width:"35%"}},[o("el-form",{attrs:{model:t.formData,"label-width":"120px"}},[o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.name")}},[o("el-input",{attrs:{type:"text",placeholder:t.$t("monthOverstock.namePlaceholder")},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),o("el-form-item",{staticStyle:{width:"15rem"},attrs:{label:t.$t("monthOverstock.month")}},[o("el-date-picker",{attrs:{type:"month",placeholder:t.$t("monthOverstock.monthPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:t.formData.month,callback:function(e){t.$set(t.formData,"month",e)},expression:"formData.month"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.number")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.numberPlaceholder")},model:{value:t.formData.num,callback:function(e){t.$set(t.formData,"num",e)},expression:"formData.num"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.price")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.pricePlaceholder")},model:{value:t.formData.price,callback:function(e){t.$set(t.formData,"price",e)},expression:"formData.price"}})],1),o("div",{staticStyle:{display:"flex","justify-content":"center"}},[o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini"},on:{click:function(e){t.addFormVisible=!1}}},[t._v(t._s(t.$t("int.cancel")))]),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.submit("formData")}}},[t._v(t._s(t.$t("monthOverstock.confirm")))])],1)])],1)],1),o("el-dialog",{attrs:{title:t.$t("monthOverstock.updateDialogTitle"),visible:t.updateFormVisible},on:{close:function(e){t.updateFormVisible=!1}}},[o("UpdateForm",{attrs:{form:t.updateForm},on:{fatherMethod:t.closeUpdateForm}})],1),o("el-dialog",{attrs:{title:t.$t("monthOverstock.dialogTitle1"),visible:t.changeMonthOverstockTypeVisible},on:{close:function(e){t.changeMonthOverstockTypeVisible=!1}}},[o("div",[o("el-select",{staticStyle:{width:"30rem"},attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"please select type"},model:{value:t.monthOverstockType,callback:function(e){t.monthOverstockType=e},expression:"monthOverstockType"}},t._l(t.options,(function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),o("el-button",{staticStyle:{margin:"30px"},attrs:{type:"primary",size:"mini"},on:{click:t.setMonthOverstockType}},[t._v(t._s(t.$t("monthOverstock.confirm")))])],1),o("el-table",{staticClass:"table-content",staticStyle:{margin:"0 auto"},attrs:{data:t.newMonthOverstocks,border:!0,stripe:""}},[o("el-table-column",{attrs:{prop:"name",label:t.$t("monthOverstock.name"),align:"center"}}),o("el-table-column",{attrs:{prop:"month",label:t.$t("monthOverstock.month"),align:"center",formatter:t.formatTime}}),o("el-table-column",{attrs:{prop:"num",label:t.$t("monthOverstock.number"),align:"center"}}),o("el-table-column",{attrs:{prop:"price",label:t.$t("monthOverstock.price"),align:"center"}}),o("el-table-column",{attrs:{prop:"total",label:t.$t("monthOverstock.total"),align:"center"}}),o("el-table-column",{attrs:{label:t.$t("monthOverstock.operation"),align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("div",{staticStyle:{display:"flex","justify-content":"center",cursor:"pointer"}},[o("div",{staticStyle:{color:"#409eff"},on:{click:function(o){return t.update(e.row)}}},[o("span",[t._v(t._s(t.$t("monthOverstock.update")))])]),o("div",{staticStyle:{color:"#409eff","margin-left":"10px"},on:{click:function(o){return t.deleteMonthStock(e.row.id)}}},[o("span",[t._v(t._s(t.$t("monthOverstock.delete")))])])])]}}])})],1),o("div",{staticClass:"block",staticStyle:{margin:"20px auto"}},[o("el-pagination",{staticStyle:{float:"right","margin-bottom":"20px"},attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.page.pageNum,total:t.page.total,"page-size":t.page.pageSize},on:{"update:currentPage":function(e){return t.$set(t.page,"pageNum",e)},"update:current-page":function(e){return t.$set(t.page,"pageNum",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),o("el-dialog",{attrs:{title:"Monthly Overstock",visible:t.visible1,width:"55%"},on:{"update:visible":function(e){t.visible1=e}}},[o("OverstockMonth",{staticStyle:{margin:"0 0.5rem"},attrs:{overstocks:t.overstocks,type:t.monthOverstockType}})],1)],1)},r=[],a=o("e965"),s=o("4360"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"monthOverstockTable"},[o("el-table",{staticClass:"table-content",staticStyle:{margin:"0 auto"},attrs:{data:t.data,border:!0,stripe:""}},[o("el-table-column",{attrs:{prop:"name",label:t.$t("monthOverstock.name"),align:"center"}}),o("el-table-column",{attrs:{prop:"month",label:t.$t("monthOverstock.month"),align:"center"}}),o("el-table-column",{attrs:{prop:"num",label:t.$t("monthOverstock.number"),align:"center"}}),o("el-table-column",{attrs:{prop:"price",label:t.$t("monthOverstock.price"),align:"center"}})],1),o("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[o("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v(" "+t._s(t.$t("monthOverstock.confirm"))+" ")]),o("el-button",{attrs:{type:"warning"},on:{click:t.cancel}},[t._v(" "+t._s(t.$t("monthOverstock.cancel"))+" ")])],1)],1)},c=[],l=o("751a");function d(t){return Object(l["a"])({url:"/info_screen/monthOverstock/add",method:"post",data:t,headers:{token:s["a"].getters.token}})}function m(t){return Object(l["a"])({url:"/info_screen/monthOverstock/batchAdd",method:"post",data:t,headers:{token:s["a"].getters.token}})}function u(t){return Object(l["a"])({url:"/info_screen/monthOverstock/delete/"+t,method:"delete",headers:{token:s["a"].getters.token}})}function h(t){return Object(l["a"])({url:"/info_screen/monthOverstock/update",method:"put",data:t,headers:{token:s["a"].getters.token}})}function p(){return Object(l["a"])({url:"/info_screen/monthOverstock/list",method:"get",headers:{token:s["a"].getters.token}})}function f(t){return Object(l["a"])({url:"/info_screen/monthOverstock/list/paged",method:"post",data:t,headers:{token:s["a"].getters.token}})}var g={components:{},name:"monthOverstockTable",props:{data:{type:Array,required:!0,default:function(){return[]}}},data(){return{}},computed:{},watch:{},methods:{async confirm(){console.log(this.data);const{data:t}=await m(this.data);200==t.code?(this.$message({type:"success",message:"batchAdd successfully!"}),this.$emit("fatherMethod")):this.$message({type:"warning",message:t.msg})},cancel(){this.$emit("fatherMethod")}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},b=g,v=(o("52c2"),o("2877")),k=Object(v["a"])(b,i,c,!1,null,"38da8a63",null),y=k.exports,O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"addForm"},[o("el-form",{attrs:{model:t.form,"label-width":"120px"}},[o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.name")}},[o("el-input",{attrs:{type:"text",placeholder:t.$t("monthOverstock.namePlaceholder")},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),o("el-form-item",{staticStyle:{width:"15rem"},attrs:{label:t.$t("monthOverstock.month")}},[o("el-date-picker",{attrs:{type:"month",placeholder:t.$t("monthOverstock.monthPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:t.form.month,callback:function(e){t.$set(t.form,"month",e)},expression:"form.month"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.number")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.numberPlaceholder")},model:{value:t.form.num,callback:function(e){t.$set(t.form,"num",e)},expression:"form.num"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.price")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.pricePlaceholder")},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.submit}},[t._v(t._s(t.$t("monthOverstock.confirm")))])],1)],1)],1)},$=[],_={components:{},name:"addForm",data(){return{form:{}}},computed:{},watch:{},methods:{async submit(){console.log(this.form);const{data:t}=await d(this.form);200==t.code?(this.$message({type:"success",message:"add successfully!"}),this.form={},this.$emit("fatherMethod")):this.$message({type:"warning",message:t.msg})}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},w=_,x=(o("3ea6"),Object(v["a"])(w,O,$,!1,null,"7006ba8e",null)),T=x.exports,S=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"updateForm"},[o("el-form",{attrs:{model:t.form,"label-width":"120px"}},[o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.name")}},[o("el-input",{attrs:{type:"text",placeholder:t.$t("monthOverstock.namePlaceholder")},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),o("el-form-item",{staticStyle:{width:"15rem"},attrs:{label:t.$t("monthOverstock.month")}},[o("el-date-picker",{attrs:{type:"month",placeholder:t.$t("monthOverstock.monthPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:t.form.month,callback:function(e){t.$set(t.form,"month",e)},expression:"form.month"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.number")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.numberPlaceholder")},model:{value:t.form.num,callback:function(e){t.$set(t.form,"num",e)},expression:"form.num"}})],1),o("el-form-item",{staticStyle:{width:"25rem"},attrs:{label:t.$t("monthOverstock.price")}},[o("el-input",{attrs:{type:"number",placeholder:t.$t("monthOverstock.pricePlaceholder")},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.submit}},[t._v(t._s(t.$t("monthOverstock.confirm")))])],1)],1)],1)},M=[],C={components:{},name:"updateForm",props:{form:{type:Object,required:!0,default:function(){return{}}}},data(){return{updateForm:this.form}},computed:{},watch:{form(){this.updateForm=this.form}},methods:{async submit(){console.log(this.updateForm);const{data:t}=await h(this.updateForm);200==t.code?(this.$message({type:"success",message:"update successfully!"}),this.updateForm={},this.$emit("fatherMethod")):this.$message({type:"warning",message:t.msg})}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},D=C,j=(o("2a7e"),Object(v["a"])(D,S,M,!1,null,"6a8c6f00",null)),z=j.exports,F=o("6711"),H=o("cdcb"),V={components:{MonthOverstockTable:y,AddForm:T,UpdateForm:z,OverstockMonth:H["a"],pageHeader:a["a"]},name:"monthOverstock",data(){return{base_api:"https://api.board.ifi-cloud.com",headers:{token:s["a"].getters.token},excelData:[],visible:!1,title:"",updateFormVisible:!1,addFormVisible:!1,options:[{value:1,label:this.$t("monthOverstock.value1")},{value:2,label:this.$t("monthOverstock.value2")}],monthOverstocks:[],newMonthOverstocks:[],updateForm:{},monthOverstockType:1,changeMonthOverstockTypeVisible:!1,visible1:!1,overstocks:!1,page:{pageSize:10,pageNum:1,total:1e3,queryCondition:{name:"",area:"",startTime:"",endTime:""}},formData:{},dialogTitle:""}},computed:{},watch:{},methods:{handleSuccess(t){200==t.code?(this.excelData=t.data,this.visible=!0,this.title="EOL Excel Data"):this.$message({type:"warning",message:t.msg})},beforeUpload(t){const e=t.name,o="Monthly_Overstock.xlsx";if(e!==o)return this.$confirm("请上传Monthly_Overstock.xlsx",this.$t("eol.tips"),{confirmButtonText:this.$t("eol.confirm"),cancelButtonText:this.$t("eol.cancel"),type:"warning"}),!1},update(t){this.formData=JSON.parse(JSON.stringify(t)),this.dialogTitle=this.$t("monthOverstock.updateDialogTitle"),this.addFormVisible=!0},openDialog(t){this.dialogTitle=this.$t("monthOverstock.addDialogTitle"),this.addFormVisible=!0;for(let e in this.formData)this.formData[e]=""},submit(t){this.dialogTitle==this.$t("monthOverstock.addDialogTitle")?d(this.formData).then(t=>{200==t.data.code&&this.$message({type:"success",message:this.$t("clock.operationOK")})}):h(this.formData).then(t=>{200==t.data.code&&this.$message({type:"success",message:this.$t("clock.operationOK")})});for(let e in this.formData)this.formData[e]="";this.addFormVisible=!1,this.getRecords()},closeMonthStockTable(){this.$refs.uploadRef.clearFiles(),this.visible=!1,this.getRecords()},closeAddForm(){this.addFormVisible=!1,this.getRecords(),this.getMonthOverstockType(),this.getOverstocks()},closeUpdateForm(){this.getRecords(),this.getMonthOverstockType(),this.getOverstocks(),this.updateFormVisible=!1},async getMonthOverstocks(){const{data:t}=await p();200==t.code?(this.monthOverstocks=t.data,this.$message({type:"success",message:this.$t("clock.operationOK")})):this.$message({type:"warning",message:t.msg})},deleteMonthStock(t){this.$confirm(this.$t("eol.deleteTips"),this.$t("eol.tips"),{confirmButtonText:this.$t("eol.confirm"),cancelButtonText:this.$t("eol.cancel"),type:"warning"}).then(async()=>{const{data:e}=await u(t);200==e.code?(this.getRecords(),this.getMonthOverstockType(),this.getOverstocks(),this.$message({type:"success",message:this.$t("clock.operationOK")})):this.$message({type:"warning",message:e.msg})}).catch(t=>{this.$message({type:"info",message:this.$t("clock.cancelTooltip")})})},async getMonthOverstockType(){const{data:t}=await Object(F["l"])();200==t.code?this.monthOverstockType=t.data:this.$message({type:"warning",message:t.msg})},async setMonthOverstockType(){const{data:t}=await Object(F["B"])(this.monthOverstockType);200==t.code?(this.getMonthOverstockType(),this.getOverstocks(),this.$message({type:"success",message:"change MonthOverstockType successfully!"}),this.changeMonthOverstockTypeVisible=!1):this.$message({type:"warning",message:t.msg})},changeMonthOverstockType(){this.changeMonthOverstockTypeVisible=!0},formatTime(t,e){if(e.label===this.$t("monthOverstock.month")){const e=new Date(t.month),o=e.getMonth()+1,n=e.getFullYear();return n+"/"+o}},async getOverstocks(){const{data:t}=await Object(F["n"])();200==t.code?this.overstocks=t.data:this.$message({type:"warning",message:t.msg})},submitToQuery(){this.page.pageNum=1,this.getRecords(),console.log(this.page)},handleCurrentChange(t){this.page.pageNum=t,this.getRecords()},handleSizeChange(t){this.page.pageSize=t,this.getRecords()},async getRecords(){const{data:t}=await f(this.page);200==t.code?(this.newMonthOverstocks=t.data.data,this.page.total=t.data.total):this.$message({type:"warning",message:t.msg})}},created(){},mounted(){this.getRecords(),this.getMonthOverstockType(),this.getOverstocks()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},P=V,q=(o("8c1c"),Object(v["a"])(P,n,r,!1,null,"798435df",null));e["default"]=q.exports},"8c1c":function(t,e,o){"use strict";o("8d48")},"8d48":function(t,e,o){},"9cc8":function(t,e,o){},cdcb:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"OverstockMonth"},[o("div",{staticClass:"ticket-box",style:"height:"+t.height,attrs:{id:"ticket-box"}},[o("div",{staticClass:"ticket-title",attrs:{id:"ticket-title"}},[t._v(" Overstock "),1==t.type?o("span",[t._v("(Order By Quantity)")]):t._e(),2==t.type?o("span",[t._v("(Order By $)")]):t._e()]),o("el-table",{ref:"unsolvedTicket",staticClass:"table-style",attrs:{data:t.overstocks,height:"380","cell-style":t.cellStyle,"header-cell-style":t.headerCellStyle,"header-row-style":t.headerRowStyle}},[o("el-table-column",{attrs:{align:"center",type:"index",width:"30"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.$index+1==1?o("span",{staticStyle:{color:"gold","font-weight":"800"}},[t._v("1")]):e.$index+1==2?o("span",{staticStyle:{color:"red","font-weight":"800"}},[t._v("2")]):e.$index+1==3?o("span",{staticStyle:{color:"green","font-weight":"800"}},[t._v("3")]):e.$index+1==4?o("span",{staticStyle:{color:"#ccc"}},[t._v("4")]):o("span",{staticStyle:{color:"#ccc"}},[t._v(t._s(e.$index+1))])]}}])}),o("el-table-column",{attrs:{align:"center",label:"Name",prop:"name"}}),o("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex-2+12)%12],prop:"num1"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null==e.row.num1?"-":e.row.num1)+" ")]}}])}),o("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex-1+12)%12],prop:"num2"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null==e.row.num2?"-":e.row.num2)+" ")]}}])}),o("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex+12)%12],prop:"num3"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(null==e.row.num3?"-":e.row.num3)+" ")]}}])})],1)],1)])},r=[],a={components:{},name:"OverstockMonth",props:{tableHeight:{type:String,default:"100"},height:{type:String,default:"320px"},rem:{type:String,default:""},overstocks:{type:Array,default:function(){return[]}},type:{type:Number,default:1}},data(){return{data:[{name:"Zen Dac V2",overstock1:15e3,overstock2:12300,overstock3:10040},{name:"Zen Kan V2",overstock1:15e3,overstock2:12300,overstock3:10040},{name:"Zen Dac V3",overstock1:15e3,overstock2:12300,overstock3:10040},{name:"Zen Dac V3",overstock1:15e3,overstock2:12300,overstock3:10040},{name:"Zen Dac V3",overstock1:15e3,overstock2:12300,overstock3:10040}],ticketTableCellHeight:"",months:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."],monthIndex:0}},computed:{},watch:{rem:{handler:function(){document.documentElement.style.fontSize=this.rem,console.log("CardComponent change document rem"+this.rem)},immediate:!0}},methods:{cellStyle({rowIndex:t,columnIndex:e}){const o=this.height.split("p",2);return this.ticketTableCellHeight=Math.ceil(Number(o[0])/7),t%2==0&&0==e?"font-size: 1rem;background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800;height: "+this.ticketTableCellHeight+"px":t%2==0&&2==e?"font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==0&&4==e?"font-size: 1rem; background: #15184d;font-weight: 800; border: none; padding: 0; height: "+this.ticketTableCellHeight+"px":t%2==0?"font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==1&&0==e?"font-size: 1rem;background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==1&&2==e?"font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==1&&4==e?"font-size: 1rem; background: #252963; border: none; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":"font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px"},headerCellStyle({columnIndex:t}){return 2==t?"font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":4==t?"font-weight: 600;background: #0f0938; white-space:nowrap; border: none; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":"font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;"},headerRowStyle(){return"height: 2.5rem;"},getMonthIndex(){this.monthIndex=(new Date).getMonth()}},created(){},mounted(){this.getMonthIndex()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},s=a,i=(o("6e33"),o("2877")),c=Object(i["a"])(s,n,r,!1,null,"056f265c",null);e["a"]=c.exports},e4e1:function(t,e,o){},e965:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container",staticStyle:{background:"#fff",height:"100px",padding:"10px 0"}},[o("div",{staticClass:"title",staticStyle:{"font-size":"30px",padding:"10px"}},[t._v(t._s(t.title))]),o("div",{staticClass:"content",staticStyle:{"font-size":"15px",padding:"10px",color:"#888"}},[t._v(t._s(t.describe)+" ")])])},r=[],a={components:{},name:"pageHeader",props:{title:{type:String,default:null},describe:{type:String,default:null}},data(){return{}},computed:{},watch:{},methods:{},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},s=a,i=(o("3e54"),o("2877")),c=Object(i["a"])(s,n,r,!1,null,"32773f74",null);e["a"]=c.exports}}]);