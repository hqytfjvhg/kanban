(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9501d1ca"],{"1b60":function(t,e,n){"use strict";n("bc67")},"24d2":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return l})),n.d(e,"e",(function(){return s}));var r=n("4360"),o=n("751a");function a(t){return Object(o["a"])({url:"/info_screen/project/batch",method:"post",data:t,headers:{token:r["a"].getters.token}})}function i(t){return Object(o["a"])({url:"/info_screen/project/item/list",method:"post",data:t,headers:{token:r["a"].getters.token}})}function c(t){return Object(o["a"])({url:"/info_screen/project/item/insert",method:"post",data:t,headers:{token:r["a"].getters.token}})}function l(t){return Object(o["a"])({url:"/info_screen/project/item/delete/"+t,method:"delete",headers:{token:r["a"].getters.token}})}function s(t){return Object(o["a"])({url:"/info_screen/project/item/update",method:"put",data:t,headers:{token:r["a"].getters.token}})}},"3e54":function(t,e,n){"use strict";n("9cc8")},6711:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"w",(function(){return a})),n.d(e,"y",(function(){return i})),n.d(e,"v",(function(){return c})),n.d(e,"z",(function(){return l})),n.d(e,"d",(function(){return s})),n.d(e,"e",(function(){return d})),n.d(e,"x",(function(){return u})),n.d(e,"c",(function(){return p})),n.d(e,"b",(function(){return h})),n.d(e,"h",(function(){return b})),n.d(e,"k",(function(){return m})),n.d(e,"g",(function(){return f})),n.d(e,"m",(function(){return g})),n.d(e,"p",(function(){return j})),n.d(e,"t",(function(){return y})),n.d(e,"q",(function(){return v})),n.d(e,"j",(function(){return k})),n.d(e,"s",(function(){return _})),n.d(e,"n",(function(){return x})),n.d(e,"o",(function(){return w})),n.d(e,"i",(function(){return $})),n.d(e,"u",(function(){return O})),n.d(e,"f",(function(){return C})),n.d(e,"A",(function(){return S})),n.d(e,"r",(function(){return P})),n.d(e,"C",(function(){return D})),n.d(e,"l",(function(){return T})),n.d(e,"B",(function(){return F}));var r=n("751a");function o(){return Object(r["a"])({url:"/info_screen/board/finance/all",method:"get"})}function a(t){return Object(r["a"])({url:"/info_screen/board/finance/outcomes/"+t,method:"get"})}function i(t){return Object(r["a"])({url:"/info_screen/board/finance/saleMonth/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/info_screen/board/finance/incomes/"+t,method:"get"})}function l(){return Object(r["a"])({url:"/info_screen/board/finance/sale/rate",method:"get"})}function s(t){return Object(r["a"])({url:"/info_screen/board/dept/all/"+t,method:"get"})}function d(t){return Object(r["a"])({url:"/info_screen/board/dept/month/"+t,method:"get"})}function u(t){return Object(r["a"])({url:"/info_screen/board/purchase/"+t,method:"get"})}function p(t){return Object(r["a"])({url:"/info_screen/board/cash/"+t,method:"get"})}function h(t){return Object(r["a"])({url:"/info_screen/board/balance/"+t,method:"get"})}function b(t){return Object(r["a"])({url:"/info_screen/board/clock/"+t,method:"get"})}function m(t){return Object(r["a"])({url:"/info_screen/board/member/"+t,method:"get"})}function f(t){return Object(r["a"])({url:"/info_screen/board/award/true/"+t,method:"get"})}function g(t){return Object(r["a"])({url:"/info_screen/board/unexpired/notices/"+t,method:"get"})}function j(){return Object(r["a"])({url:"/info_screen/board/productTesting/list",method:"get"})}function y(){return Object(r["a"])({url:"/info_screen/board/software/list",method:"get"})}function v(){return Object(r["a"])({url:"/info_screen/board/project/list",method:"get"})}function k(){return Object(r["a"])({url:"/info_screen/board/eol/list",method:"get"})}function _(){return Object(r["a"])({url:"/info_screen/board/return/list",method:"get"})}function x(){return Object(r["a"])({url:"/info_screen/board/monthOverstock/list",method:"get"})}function w(){return Object(r["a"])({url:"/info_screen/board/productStage/list",method:"get"})}function $(){return Object(r["a"])({url:"/info_screen/board/complaint/list",method:"get"})}function O(){return Object(r["a"])({url:"/info_screen/board/complaintUnsolved/list",method:"get"})}function C(){return Object(r["a"])({url:"/info_screen/board/avgDays",method:"get"})}function S(t){return Object(r["a"])({url:"/info_screen/board/avgDays/"+t,method:"get"})}function P(){return Object(r["a"])({url:"/info_screen/board/returnDays",method:"get"})}function D(t){return Object(r["a"])({url:"/info_screen/board/returnDays/"+t,method:"get"})}function T(){return Object(r["a"])({url:"/info_screen/board/monthOverstock/type",method:"get"})}function F(t){return Object(r["a"])({url:"/info_screen/board/monthOverstock/type/"+t,method:"get"})}},"8ac4":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ProjectDesc"},[n("div",{staticClass:"ticket-box",style:"height:"+t.height,attrs:{id:"ticket-box"}},[n("div",{staticClass:"ticket-title",attrs:{id:"ticket-title"}},[t._v("Project Calendar")]),n("el-table",{ref:"stage",staticClass:"table-style",attrs:{data:t.projectDescs,height:280,size:"mini","cell-style":t.cellStyle,"header-cell-style":t.headerCellStyle,"header-row-style":t.headerRowStyle}},[n("el-table-column",{attrs:{align:"center",prop:"subject"}},[n("template",{slot:"header"},[t._v("Project Title")])],2),n("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex+12)%12],prop:"month1"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticStyle:{"word-break":"keep-all"}},[t._v(" "+t._s(e.row.month1)+" ")])]}}])}),n("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex+1+12)%12],prop:"month2"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticStyle:{"word-break":"keep-all"}},[t._v(" "+t._s(e.row.month2)+" ")])]}}])}),n("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex+2+12)%12],prop:"month3"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticStyle:{"word-break":"keep-all"}},[t._v(" "+t._s(e.row.month3)+" ")])]}}])}),n("el-table-column",{attrs:{align:"center",label:t.months[(t.monthIndex+3+12)%12],prop:"month4"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticStyle:{"word-break":"keep-all"}},[t._v(" "+t._s(e.row.month4)+" ")])]}}])})],1)],1)])},o=[],a={components:{},name:"ProjectDesc",props:{height:{type:String,default:"460px"},projectDescs:{type:Array,default:function(){return[]}}},data(){return{ticketTableCellHeight:"",months:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."],monthIndex:0}},computed:{},watch:{},methods:{cellStyle({rowIndex:t,columnIndex:e}){return this.ticketTableCellHeight=Math.ceil((this.height-5-3.8*this.rem)/6),t%2==0&&0==e?"font-size: 1.1rem;background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==0&&2==e?"font-size: 1.1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==0&&4==e?"font-size: 1.1rem; background: #15184d; border: none; padding: 0;font-weight: 800;height: "+this.ticketTableCellHeight+"px":t%2==0?"font-size: 1.1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==1&&0==e?"font-size: 1.1rem;background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800;height: "+this.ticketTableCellHeight+"px":t%2==1&&2==e?"font-size: 1.1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":t%2==1&&4==e?"font-size: 1.1rem; background: #252963; border: none; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":"font-size: 1.1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px"},headerCellStyle({columnIndex:t}){return 2==t?"font-weight: 800;font-size: 1rem;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":4==t?"font-weight: 800;font-size: 1rem;background: #0f0938; white-space:nowrap; border: none; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":"font-weight: 800;font-size: 1rem;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;"},headerRowStyle(){return"height: 2.5rem;"},tableScroll(t,e){const n=t.bodyWrapper;setInterval(()=>{n.scrollHeight-n.clientHeight>10&&n.clientHeight+n.scrollTop<n.scrollHeight-1&&(n.scrollTop+=1,n.clientHeight+n.scrollTop>=n.scrollHeight-1&&setTimeout(()=>{n.scrollTop=0},3e3))},e)},getMonthIndex(){this.monthIndex=(new Date).getMonth()}},created(){},mounted(){const t=this.$refs.stage;this.tableScroll(t,50),this.getMonthIndex()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},i=a,c=(n("1b60"),n("2877")),l=Object(c["a"])(i,r,o,!1,null,"2db9f3ba",null);e["a"]=l.exports},"9cc8":function(t,e,n){},bc67:function(t,e,n){},da92:function(t,e,n){},e965:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",staticStyle:{background:"#fff",height:"100px",padding:"10px 0"}},[n("div",{staticClass:"title",staticStyle:{"font-size":"30px",padding:"10px"}},[t._v(t._s(t.title))]),n("div",{staticClass:"content",staticStyle:{"font-size":"15px",padding:"10px",color:"#888"}},[t._v(t._s(t.describe)+" ")])])},o=[],a={components:{},name:"pageHeader",props:{title:{type:String,default:null},describe:{type:String,default:null}},data(){return{}},computed:{},watch:{},methods:{},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},i=a,c=(n("3e54"),n("2877")),l=Object(c["a"])(i,r,o,!1,null,"32773f74",null);e["a"]=l.exports},f473:function(t,e,n){"use strict";n("da92")},ff90:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"project-container",attrs:{id:"project"}},[n("pageHeader",{attrs:{title:t.$t("project.pageTitle"),describe:t.$t("project.pageDesc")}}),n("div",{staticStyle:{"margin-left":"1rem"}},[n("el-form",{staticClass:"form-box",staticStyle:{display:"flex",width:"100%"},attrs:{inline:!0,size:"mini"}},[n("el-form-item",{attrs:{label:t.$t("project.subject")}},[n("el-select",{attrs:{placeholder:t.$t("project.subjectPlaceholder"),clearable:!0},model:{value:t.page.queryCondition.subject,callback:function(e){t.$set(t.page.queryCondition,"subject",e)},expression:"page.queryCondition.subject"}},t._l(t.subjects,(function(t){return n("el-option",{key:t.value,attrs:{label:t.value,value:t.value}})})),1)],1),n("el-form-item",{attrs:{label:t.$t("project.month")}},[n("el-date-picker",{attrs:{placeholder:t.$t("project.monthPlaceholder"),type:"month","value-format":"yyyy/M"},model:{value:t.page.queryCondition.month,callback:function(e){t.$set(t.page.queryCondition,"month",e)},expression:"page.queryCondition.month"}})],1),n("el-form-item",{staticStyle:{"margin-right":"10px"}},[n("el-button",{attrs:{icon:"el-icon-search",type:"primary"},on:{click:t.getProjects}},[t._v(t._s(t.$t("project.query")))])],1)],1)],1),n("div",{staticClass:"new-create",staticStyle:{"margin-left":"1rem"}},[n("el-button",{staticClass:"create-button",attrs:{type:"primary",size:"mini"},on:{click:t.openDialog}},[n("i",{staticClass:"el-icon-plus"}),t._v(t._s(t.$t("project.add")))]),n("el-button",{staticStyle:{"margin-left":"0"},attrs:{type:"warning",size:"mini"},on:{click:function(e){t.visible1=!0}}},[n("i",{staticClass:"el-icon-view"}),t._v(" "+t._s(t.$t("int.view"))+" ")])],1),n("el-table",{attrs:{data:t.pageVo.data,stripe:"",border:""}},[n("el-table-column",{attrs:{type:"index",label:t.$t("project.index"),width:"60",align:"center"}}),n("el-table-column",{attrs:{prop:"subject",label:t.$t("project.subject"),align:"center"}}),n("el-table-column",{attrs:{prop:"month",label:t.$t("project.month"),align:"center",formatter:t.formatTime,sortable:""}}),n("el-table-column",{attrs:{prop:"content",label:t.$t("project.content"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.itemId==t.currentUpdateId?n("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.updateForm.content,callback:function(e){t.$set(t.updateForm,"content",e)},expression:"updateForm.content"}}):n("div",[t._v(t._s(e.row.content))])]}}])}),n("el-table-column",{attrs:{label:t.$t("project.operation"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.itemId==t.currentUpdateId?n("div",{staticStyle:{display:"flex","justify-content":"center",cursor:"pointer"}},[n("div",{staticStyle:{color:"#409eff"},on:{click:t.confireUpdate}},[n("span",[t._v(t._s(t.$t("project.confirm")))])]),n("div",{staticStyle:{color:"#409eff","margin-left":"10px"},on:{click:t.cancelUpdate}},[n("span",[t._v(t._s(t.$t("project.cancel")))])])]):n("div",{staticStyle:{display:"flex","justify-content":"center",cursor:"pointer"}},[n("div",{staticStyle:{color:"#409eff"},on:{click:function(n){return t.update(e.row)}}},[n("span",[t._v(t._s(t.$t("project.update")))])]),n("div",{staticStyle:{color:"#409eff","margin-left":"10px"},on:{click:function(n){return t.deleteProject(e.row.itemId)}}},[n("span",[t._v(t._s(t.$t("project.delete")))])])])]}}])})],1),n("div",{staticClass:"block",staticStyle:{margin:"20px auto"}},[n("el-pagination",{staticStyle:{float:"right","margin-bottom":"20px"},attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.page.pageNum,total:t.pageVo.total,"page-size":t.page.pageSize},on:{"update:currentPage":function(e){return t.$set(t.page,"pageNum",e)},"update:current-page":function(e){return t.$set(t.page,"pageNum",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t.tableVisable?n("div",{staticClass:"table"},[n("el-card",{staticClass:"table-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("excel data")]),n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"primary"},on:{click:t.submitToBatch}},[t._v("confirm Batch operations")])],1),n("el-table",{staticClass:"table-content",attrs:{data:t.excelData}},[n("el-table-column",{attrs:{prop:"title",label:"title",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"current",label:"current",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"month1",label:"month1",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"month2",label:"month2",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"month3",label:"month3",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"month4",label:"month4",width:"180",align:"center"}}),n("el-table-column",{attrs:{prop:"month5",label:"month5",width:"180",align:"center"}})],1)],1)],1):t._e(),n("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"35%"},on:{"update:visible":function(e){t.visible=e}}},[n("el-form",{ref:"addForm",attrs:{model:t.addForm,"label-width":"120px",rules:t.rules}},[n("el-form-item",{attrs:{label:t.$t("project.subject"),prop:"subject"}},[n("el-select",{attrs:{placeholder:t.$t("project.subjectPlaceholder")},model:{value:t.addForm.subject,callback:function(e){t.$set(t.addForm,"subject",e)},expression:"addForm.subject"}},t._l(t.subjects,(function(t){return n("el-option",{key:t.value,attrs:{label:t.value,value:t.value}})})),1)],1),n("el-form-item",{attrs:{label:t.$t("project.month"),prop:"month"}},[n("el-date-picker",{attrs:{type:"month",placeholder:t.$t("project.monthPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:t.addForm.month,callback:function(e){t.$set(t.addForm,"month",e)},expression:"addForm.month"}})],1),n("el-form-item",{attrs:{label:t.$t("project.content"),prop:"content"}},[n("el-input",{staticClass:"inline-input",attrs:{placeholder:t.$t("project.contentPlaceholder"),type:"textarea",rows:5},model:{value:t.addForm.content,callback:function(e){t.$set(t.addForm,"content",e)},expression:"addForm.content"}})],1),n("div",{staticStyle:{display:"flex","justify-content":"center"}},[n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v(t._s(t.$t("int.cancel")))]),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.submit("addForm")}}},[t._v(t._s(t.$t("project.confirm")))])],1)])],1)],1),n("el-dialog",{attrs:{title:"Project Calendar",visible:t.visible1,width:"55%"},on:{"update:visible":function(e){t.visible1=e}}},[n("ProjectDesc",{staticStyle:{"padding-top":"0rem","margin-left":"0.6rem","margin-right":"0.3rem"},attrs:{projectDescs:t.projectDescs}})],1)],1)},o=[],a=n("e965"),i=n("24d2"),c=n("6711"),l=n("8ac4"),s=n("4360"),d={name:"data-project",components:{ProjectDesc:l["a"],pageHeader:a["a"]},data(){return{base_api:"https://api.board.ifi-cloud.com",pageVo:{},currentUpdateId:0,updateForm:{},addForm:{subject:"",content:"",month:""},excelData:[],tableVisable:!1,headers:{token:s["a"].getters.token},page:{pageSize:10,pageNum:1,queryCondition:{subject:"",year:null,month:null}},title:"",visible:!1,form:"",subjects:[{value:"LAUNCHES",label:"LAUNCHES"},{value:"SPM/RPM",label:"SPM/RPM"},{value:"PROMOTIONS",label:"PROMOTIONS"}],visible1:!1,projectDescs:[]}},computed:{rules(){return{content:[{required:!0,message:this.$t("project.contentPlaceholder"),trigger:"blur"}],month:[{required:!0,message:this.$t("project.monthPlaceholder"),trigger:"blur"}],subject:[{required:!0,message:this.$t("project.subjectPlaceholder"),trigger:"blur"}]}}},created(){this.getProjects(),this.getProjectDescs()},methods:{openDialog(){this.title=this.$t("project.addDialogTitle"),this.visible=!0;for(let t in this.addForm)this.addForm[t]="";this.$nextTick(()=>{this.$refs.addForm.clearValidate()})},async getProjects(){const{data:t}=await Object(i["d"])(this.page);200==t.code&&(this.pageVo=t.data)},update(t){console.log(t.itemId),this.currentUpdateId=t.itemId,this.updateForm=t},async deleteProject(t){this.$confirm(this.$t("project.deleteTips"),this.$t("project.tips"),{confirmButtonText:this.$t("project.confirm"),cancelButtonText:this.$t("project.cancel"),type:"warning"}).then(async()=>{const{data:e}=await Object(i["b"])(t);200==e.code?(this.$message({type:"success",message:this.$t("clock.operationOK")}),this.getProjects(),this.getProjectDescs()):this.$message({type:"warning",message:this.$t("clock.operationError")})}).catch(t=>{this.$message({type:"info",message:this.$t("clock.cancelTooltip")})})},cancelUpdate(){this.getProjects(),this.currentUpdateId=0,this.updateForm={}},async confireUpdate(){console.log(this.updateForm);const{data:t}=await Object(i["e"])(this.updateForm);200==t.code?(this.$message({type:"success",message:this.$t("clock.operationOK")}),this.getProjects(),this.getProjectDescs(),this.currentUpdateId=0,this.updateForm={}):this.$message({type:"warning",message:this.$t("clock.operationError")})},async submit(t){this.$refs[t].validate(t=>{if(!t)return!1;Object(i["c"])(this.addForm).then(t=>{if(200==t.data.code){this.$message({type:"success",message:this.$t("clock.operationOK")});for(let t in this.addForm)this.addForm[t]="";this.visible=!1,this.getProjects(),this.getProjectDescs()}})})},handleSuccess(t){200==t.code&&(this.excelData=t.data,this.tableVisable=!0)},async submitToBatch(){console.log(this.excelData);const{data:t}=await Object(i["a"])(this.excelData);200==t.code&&this.$message({type:"success",message:this.$t("clock.operationOK")})},handleCurrentChange(t){this.page.pageNum=t,this.getProjects()},handleSizeChange(t){this.page.pageSize=t,this.getProjects()},formatTime(t,e){if(e.label===this.$t("project.month")){const e=new Date(t.month),n=e.getMonth()+1,r=e.getFullYear();return r+"/"+n}},async getProjectDescs(){const{data:t}=await Object(c["q"])();console.log("打印project desc",t),200==t.code&&(this.projectDescs=t.data)}},mounted(){},watch:{}},u=d,p=(n("f473"),n("2877")),h=Object(p["a"])(u,r,o,!1,null,"16db4606",null);e["default"]=h.exports}}]);