(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f2260c0"],{"10ac":function(t,e,a){"use strict";a("14c5")},"14c5":function(t,e,a){},"1e5c":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"outer",style:{height:t.height},on:{mouseover:t.stopScroll,mouseleave:t.startScroll}},[a("div",{ref:"inner1"},[t._t("default")],2),a("div",{ref:"inner2"})])},n=[],i={name:"AutoScroll",props:{speed:{type:Number,default:90},height:{type:String,default:"0px"}},mounted(){this.getDomRef(),this.tryScroll()},updated(){this.tryScroll()},methods:{getDomRef(){this.outer=this.$el,this.inner1=this.$refs.inner1,this.inner2=this.$refs.inner2},tryScroll(){this.inner1.clientHeight>this.outer.clientHeight?(this.inner2.innerHTML=this.inner1.innerHTML,this.startScroll()):(this.inner2.innerHTML="",this.stopScroll())},startScroll(){this.autoScrollInterval||(this.autoScrollInterval=setInterval(()=>{this.outer.scrollTop>=this.inner1.offsetHeight?(this.outer.scrollTop=0,this.$emit("complete")):(this.outer.scrollTop+=1,this.outer.scrollTop===Math.ceil(this.inner1.offsetHeight/2)&&this.$emit("half"))},this.speed))},stopScroll(){clearInterval(this.autoScrollInterval),this.autoScrollInterval=null}}},s=i,o=(a("5b51"),a("2877")),l=Object(o["a"])(s,r,n,!1,null,"614ad447",null),c=l.exports;e["a"]=c},"2a00":function(t,e,a){},"3e54":function(t,e,a){"use strict";a("9cc8")},"5b51":function(t,e,a){"use strict";a("2a00")},"61e6":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"awards-container"},[a("pageHeader",{attrs:{title:t.$t("award.pageTitle"),describe:t.$t("award.pageDesc")}}),a("div",{staticClass:"new-create",staticStyle:{"margin-left":"1rem"}},[a("el-button",{staticClass:"create-button",attrs:{type:"success",size:"mini"},on:{click:t.openDialog}},[a("i",{staticClass:"el-icon-download"}),t._v(t._s(t.$t("award.generateImage")))]),a("el-upload",{ref:"uploadRef",attrs:{action:t.base_api+"/info_screen/awards/excel/handler",multiple:"",limit:1,"on-success":t.handleSuccess,headers:t.headers,"before-upload":t.beforeUpload,"show-file-list":!1}},[a("el-button",{attrs:{size:"mini",type:"primary"}},[a("i",{staticClass:"el-icon-upload2"}),t._v(t._s(t.$t("award.batchAdd")))])],1),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"warning",size:"mini"},on:{click:function(e){t.visible1=!0}}},[a("i",{staticClass:"el-icon-view"}),t._v(" "+t._s(t.$t("int.view"))+" ")]),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"primary",size:"mini"}},[a("i",{staticClass:"el-icon-download"}),a("a",{staticStyle:{margin:"0.3rem 0.5rem 0.3rem 0",color:"#fff"},attrs:{href:t.base_api+"/template/Media_Links.xlsx"}},[t._v(t._s(t.$t("excelTemplate.downloadTemplate")))])])],1),a("div",{staticClass:"table"},[a("el-table",{staticClass:"table-content",staticStyle:{width:"100%"},attrs:{data:t.awards,border:!0,stripe:""}},[a("el-table-column",{attrs:{type:"index",label:t.$t("award.index"),width:"100",align:"center"}}),a("el-table-column",{attrs:{prop:"type",label:t.$t("award.type"),width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.type?a("div",[t._v("So/Me")]):a("div",[t._v("awards")])]}}])}),a("el-table-column",{attrs:{prop:"title",label:t.$t("award.title"),width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.title))])]}}])}),a("el-table-column",{attrs:{prop:"originUrl",label:t.$t("award.originUrl"),width:"330",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.originUrl))])]}}])}),a("el-table-column",{attrs:{prop:"imageUrl",label:t.$t("award.imageUrl"),width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[null!==e.row.imageUrl?a("el-link",{attrs:{href:t.base_api+"\\"+e.row.imageUrl,target:"_blank",type:"primary"}},[t._v(t._s(t.$t("award.seePicture")))]):a("span",{staticStyle:{color:"red"}},[t._v("unavailable")])]}}])}),a("el-table-column",{attrs:{prop:"state",label:t.$t("award.state"),width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(a){return t.changeState(e.row.id)}},model:{value:e.row.state,callback:function(a){t.$set(e.row,"state",a)},expression:"scope.row.state"}})]}}])}),a("el-table-column",{attrs:{prop:"result",label:t.$t("award.result"),width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.result?a("span",[t._v("generating")]):t._e(),1===e.row.result?a("span",[t._v("success")]):t._e(),-1===e.row.result?a("span",[t._v("fail")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"gmtCreateString",label:t.$t("award.gmtCreate"),width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"gmtModifiedString",label:t.$t("award.lastModified"),width:"200",align:"center"}}),a("el-table-column",{attrs:{label:t.$t("award.operation"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{display:"flex","justify-content":"center",cursor:"pointer"}},[a("div",{staticStyle:{color:"#409eff","margin-left":"10px"},on:{click:function(a){return t.deleteAward(e.row.id)}}},[a("span",[t._v(t._s(t.$t("award.delete")))])])])]}}])})],1)],1),a("el-dialog",{staticClass:"table",attrs:{title:"excel parsing data",visible:t.tableVisable1,"destroy-on-close":!0},on:{"update:visible":function(e){t.tableVisable1=e}}},[a("el-table",{staticClass:"table-content",staticStyle:{width:"80%",margin:"0 auto"},attrs:{data:t.excelData,border:!0,stripe:""}},[a("el-table-column",{attrs:{prop:"title",label:"title",width:"300",align:"center"}}),a("el-table-column",{attrs:{prop:"url",label:"url",align:"center"}})],1),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.submitToBatch}},[t._v(" confirm ")]),a("el-button",{attrs:{type:"warning"},on:{click:t.cancle}},[t._v(" cancel ")])],1)],1),a("el-dialog",{attrs:{title:t.$t("award.generateDialogTitle"),visible:t.dialog.visible,width:"35%","destroy-on-close":!0},on:{"update:visible":function(e){return t.$set(t.dialog,"visible",e)}}},[a("el-form",{attrs:{model:t.addForm,"label-width":"120px"}},[a("el-form-item",{attrs:{label:t.$t("award.type")}},[a("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:t.$t("award.typePlaceholder")},model:{value:t.addForm.type,callback:function(e){t.$set(t.addForm,"type",e)},expression:"addForm.type"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("award.title")}},[a("el-input",{attrs:{placeholder:t.$t("award.titlePlaceholder")},model:{value:t.addForm.title,callback:function(e){t.$set(t.addForm,"title",e)},expression:"addForm.title"}})],1),a("el-form-item",{attrs:{label:t.$t("award.originUrl")}},[a("el-input",{attrs:{placeholder:t.$t("award.urlPlaceholder")},model:{value:t.addForm.url,callback:function(e){t.$set(t.addForm,"url",e)},expression:"addForm.url"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.submitAddForm}},[t._v(t._s(t.$t("award.confirm")))]),a("vue-element-loading",{attrs:{active:t.show,spinner:"bar-fade-scale",color:"#FF6700"}})],1)],1)],1),a("el-dialog",{attrs:{title:"Media News",visible:t.visible1,width:"60%"},on:{"update:visible":function(e){t.visible1=e}}},[a("div",{staticStyle:{display:"flex",background:"#17113c",padding:"1rem 1rem 0 1rem"}},[a("div",{staticStyle:{margin:"0.5rem",width:"50%"}},[a("AwardsIfr",{attrs:{awards:t.intAwards,height:"30rem"}}),a("div",{staticStyle:{margin:"0.1rem auto","text-align":"center","font-size":"2rem",color:"#fff"}},[t._v(" So/Me ")])],1),a("div",{staticStyle:{margin:"0.5rem",width:"50%"}},[a("AwardsIfr",{attrs:{awards:t.extAwards,height:"30rem"}}),a("div",{staticStyle:{margin:"0.1rem auto","text-align":"center","font-size":"2rem",color:"#fff"}},[t._v(" Awards ")])],1)])])],1)},n=[],i=a("67c4"),s=a("4360"),o=a("e965"),l=a("9a77"),c=a("6711"),d={name:"awards-index",components:{pageHeader:o["a"],AwardsIfr:l["a"]},data(){return{base_api:"https://api.board.ifi-cloud.com",addForm:{},tableVisable1:!1,excelData:[],headers:{token:s["a"].getters.token},p2iObjects:[],show:!1,show1:!1,awards:[],dialog:{visible:!1},options:[{value:1,label:"So/Me"},{value:0,label:"Awards"}],visible1:!1,intAwards:[],extAwards:[]}},methods:{openDialog(){this.dialog.visible=!0;for(let t in this.addForm)this.addForm[t]=""},async submitAddForm(){console.log(this.addForm);const{data:t}=await Object(i["c"])(this.addForm);200==t.code?(this.getAll(),this.getIntAwards(),this.getExtAwards(),this.dialog.visible=!1):this.$message({type:"warning",message:t.msg}),console.log(t.data)},async submitToBatch(){const{data:t}=await Object(i["d"])(this.excelData);200==t.code?(this.tableVisable1=!1,this.$refs.uploadRef.clearFiles(),this.getAll(),this.getIntAwards(),this.getExtAwards()):this.$message({type:"warning",message:t.msg})},handleSuccess(t){200==t.code?(this.excelData=t.data,this.tableVisable1=!0):this.$message({type:"warning",message:t.msg})},cancle(){this.excelData=[],this.tableVisable1=!1,this.$refs.uploadRef.clearFiles()},async batchSave(){const{data:t}=await this.p2iObjects;200==t.code?(this.getIntAwards(),this.getExtAwards(),this.getAll(),this.tableVisable2=!1):this.$message({type:"warning",message:t.msg}),console.log(t)},async getAll(){const{data:t}=await Object(i["e"])();200==t.code?this.awards=t.data:this.$message({type:"warning",message:t.msg}),console.log(t.data)},async changeState(t){const{data:e}=await Object(i["a"])(t);200==e.code?(this.$message({type:"success",message:"update statu successfully!"}),this.getAll(),this.getIntAwards(),this.getExtAwards()):this.$message({type:"warning",message:e.msg})},deleteAward(t){this.$confirm(this.$t("award.deleteTips"),this.$t("award.tips"),{confirmButtonText:this.$t("award.confirm"),cancelButtonText:this.$t("award.cancel"),type:"warning"}).then(async()=>{const{data:e}=await Object(i["b"])(t);200==e.code?(this.$message({type:"success",message:"delete award successfully!"}),this.getAll(),this.getIntAwards(),this.getExtAwards()):this.$message({type:"warning",message:"delete award fail!"})}).catch(t=>{})},async getIntAwards(){const{data:t}=await Object(c["g"])(1);200==t.code?this.intAwards=t.data:this.$message({type:"warning",message:t.msg})},async getExtAwards(){const{data:t}=await Object(c["g"])(0);200==t.code?this.extAwards=t.data:this.$message({type:"warning",message:t.msg})},beforeUpload(t){const e=t.name,a="Media_Links.xlsx";if(e!==a)return this.$confirm("请上传Media_Links.xlsx",this.$t("eol.tips"),{confirmButtonText:this.$t("eol.confirm"),cancelButtonText:this.$t("eol.cancel"),type:"warning"}),!1}},created(){},mounted(){this.getAll(),this.getIntAwards(),this.getExtAwards()}},u=d,f=(a("7b9e"),a("2877")),m=Object(f["a"])(u,r,n,!1,null,null,null);e["default"]=m.exports},6711:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"w",(function(){return i})),a.d(e,"y",(function(){return s})),a.d(e,"v",(function(){return o})),a.d(e,"z",(function(){return l})),a.d(e,"d",(function(){return c})),a.d(e,"e",(function(){return d})),a.d(e,"x",(function(){return u})),a.d(e,"c",(function(){return f})),a.d(e,"b",(function(){return m})),a.d(e,"h",(function(){return h})),a.d(e,"k",(function(){return g})),a.d(e,"g",(function(){return b})),a.d(e,"m",(function(){return p})),a.d(e,"p",(function(){return w})),a.d(e,"t",(function(){return v})),a.d(e,"q",(function(){return y})),a.d(e,"j",(function(){return _})),a.d(e,"s",(function(){return $})),a.d(e,"n",(function(){return x})),a.d(e,"o",(function(){return S})),a.d(e,"i",(function(){return O})),a.d(e,"u",(function(){return j})),a.d(e,"f",(function(){return k})),a.d(e,"A",(function(){return A})),a.d(e,"r",(function(){return C})),a.d(e,"C",(function(){return F})),a.d(e,"l",(function(){return T})),a.d(e,"B",(function(){return I}));var r=a("751a");function n(){return Object(r["a"])({url:"/info_screen/board/finance/all",method:"get"})}function i(t){return Object(r["a"])({url:"/info_screen/board/finance/outcomes/"+t,method:"get"})}function s(t){return Object(r["a"])({url:"/info_screen/board/finance/saleMonth/"+t,method:"get"})}function o(t){return Object(r["a"])({url:"/info_screen/board/finance/incomes/"+t,method:"get"})}function l(){return Object(r["a"])({url:"/info_screen/board/finance/sale/rate",method:"get"})}function c(t){return Object(r["a"])({url:"/info_screen/board/dept/all/"+t,method:"get"})}function d(t){return Object(r["a"])({url:"/info_screen/board/dept/month/"+t,method:"get"})}function u(t){return Object(r["a"])({url:"/info_screen/board/purchase/"+t,method:"get"})}function f(t){return Object(r["a"])({url:"/info_screen/board/cash/"+t,method:"get"})}function m(t){return Object(r["a"])({url:"/info_screen/board/balance/"+t,method:"get"})}function h(t){return Object(r["a"])({url:"/info_screen/board/clock/"+t,method:"get"})}function g(t){return Object(r["a"])({url:"/info_screen/board/member/"+t,method:"get"})}function b(t){return Object(r["a"])({url:"/info_screen/board/award/true/"+t,method:"get"})}function p(t){return Object(r["a"])({url:"/info_screen/board/unexpired/notices/"+t,method:"get"})}function w(){return Object(r["a"])({url:"/info_screen/board/productTesting/list",method:"get"})}function v(){return Object(r["a"])({url:"/info_screen/board/software/list",method:"get"})}function y(){return Object(r["a"])({url:"/info_screen/board/project/list",method:"get"})}function _(){return Object(r["a"])({url:"/info_screen/board/eol/list",method:"get"})}function $(){return Object(r["a"])({url:"/info_screen/board/return/list",method:"get"})}function x(){return Object(r["a"])({url:"/info_screen/board/monthOverstock/list",method:"get"})}function S(){return Object(r["a"])({url:"/info_screen/board/productStage/list",method:"get"})}function O(){return Object(r["a"])({url:"/info_screen/board/complaint/list",method:"get"})}function j(){return Object(r["a"])({url:"/info_screen/board/complaintUnsolved/list",method:"get"})}function k(){return Object(r["a"])({url:"/info_screen/board/avgDays",method:"get"})}function A(t){return Object(r["a"])({url:"/info_screen/board/avgDays/"+t,method:"get"})}function C(){return Object(r["a"])({url:"/info_screen/board/returnDays",method:"get"})}function F(t){return Object(r["a"])({url:"/info_screen/board/returnDays/"+t,method:"get"})}function T(){return Object(r["a"])({url:"/info_screen/board/monthOverstock/type",method:"get"})}function I(t){return Object(r["a"])({url:"/info_screen/board/monthOverstock/type/"+t,method:"get"})}},"67c4":function(t,e,a){"use strict";a.d(e,"c",(function(){return i})),a.d(e,"d",(function(){return s})),a.d(e,"e",(function(){return o})),a.d(e,"f",(function(){return l})),a.d(e,"b",(function(){return c})),a.d(e,"a",(function(){return d}));var r=a("751a"),n=a("4360");function i(t){return Object(r["a"])({url:"/info_screen/awards//generator/image",method:"post",headers:{token:n["a"].getters.token},data:t,timeout:1e5})}function s(t){return Object(r["a"])({url:"/info_screen/awards//generator/images",method:"post",headers:{token:n["a"].getters.token},data:t,timeout:2e5})}function o(){return Object(r["a"])({url:"/info_screen/awards/all",method:"get",headers:{token:n["a"].getters.token}})}function l(t){return Object(r["a"])({url:"/info_screen/awards/state/true/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/info_screen/awards/delete/"+t,method:"delete",headers:{token:n["a"].getters.token}})}function d(t){return Object(r["a"])({url:"/info_screen/awards/state/"+t,method:"put",headers:{token:n["a"].getters.token}})}},"7b9e":function(t,e,a){"use strict";a("9c33")},"9a77":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"AwardsIfr"},[a("div",{staticClass:"award-news"},[0!==t.awards.length?a("autoscroll",{staticClass:"award-box",attrs:{height:t.height,speed:20}},t._l(t.awards,(function(e){return a("div",{key:e.id},[a("img",{staticStyle:{display:"block",width:"100%"},attrs:{src:t.base_api+"/"+e.imageUrl,mode:"widthFix"}})])})),0):a("div",{staticStyle:{padding:"5rem","font-size":"3rem"}},[t._v("NO DATA !")])],1)])},n=[],i=a("67c4"),s=a("1e5c"),o={components:{autoscroll:s["a"]},name:"index",props:{height:{type:String,default:"15.5rem"},rem:{type:String,default:""},awards:{type:Array,default:function(){return[]}}},data(){return{data:[],base_api:"https://api.board.ifi-cloud.com"}},computed:{},watch:{rem:{handler:function(){document.documentElement.style.fontSize=this.rem,console.log("AwardsIfr change document rem"+this.rem)},immediate:!0}},methods:{async selectAwards(){const{data:t}=await Object(i["f"])(1);200==t.code&&(this.data=t.data)}},created(){},mounted(){this.selectAwards()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},l=o,c=(a("10ac"),a("2877")),d=Object(c["a"])(l,r,n,!1,null,"6b1fc1c2",null);e["a"]=d.exports},"9c33":function(t,e,a){},"9cc8":function(t,e,a){},e965:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",staticStyle:{background:"#fff",height:"100px",padding:"10px 0"}},[a("div",{staticClass:"title",staticStyle:{"font-size":"30px",padding:"10px"}},[t._v(t._s(t.title))]),a("div",{staticClass:"content",staticStyle:{"font-size":"15px",padding:"10px",color:"#888"}},[t._v(t._s(t.describe)+" ")])])},n=[],i={components:{},name:"pageHeader",props:{title:{type:String,default:null},describe:{type:String,default:null}},data(){return{}},computed:{},watch:{},methods:{},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},s=i,o=(a("3e54"),a("2877")),l=Object(o["a"])(s,r,n,!1,null,"32773f74",null);e["a"]=l.exports}}]);