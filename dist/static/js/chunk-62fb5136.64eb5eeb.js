(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62fb5136"],{"14b7":function(e,t,a){"use strict";a("ca91")},"25fc":function(e,t,a){},3493:function(e,t,a){"use strict";a("25fc")},"3e54":function(e,t,a){"use strict";a("9cc8")},"465f":function(e,t,a){"use strict";a("b747")},"698e":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ProductTesting"},[a("div",{staticClass:"ticket-box",style:"height:"+e.height,attrs:{id:"ticket-box"}},[a("div",{staticClass:"ticket-title",attrs:{id:"ticket-title"}},[e._v("Product Testing Stage")]),a("el-table",{ref:"stage",staticClass:"table-style",attrs:{data:e.data,height:280,size:"mini","cell-style":e.cellStyle,"header-cell-style":e.headerCellStyle,"header-row-style":e.headerRowStyle}},[a("el-table-column",{attrs:{type:"index",width:"30"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.$index+1==1?a("span",{staticStyle:{color:"gold","font-weight":"800"}},[e._v("1")]):t.$index+1==2?a("span",{staticStyle:{color:"red","font-weight":"800"}},[e._v("2")]):t.$index+1==3?a("span",{staticStyle:{color:"green","font-weight":"800"}},[e._v("3")]):t.$index+1==4?a("span",{staticStyle:{color:"#ccc"}},[e._v("4")]):a("span",{staticStyle:{color:"#ccc"}},[e._v(e._s(t.$index+1))])]}}])}),a("el-table-column",{attrs:{align:"center",label:"Product",prop:"product"}}),a("el-table-column",{attrs:{align:"center",label:"Eng Sample testing",prop:"engSample",formatter:e.formatTime,width:"185px"}}),a("el-table-column",{attrs:{align:"center",label:"PP Testing",prop:"pp",formatter:e.formatTime,width:"160px"}}),a("el-table-column",{attrs:{align:"center",label:"MP",prop:"mp",formatter:e.formatTime,width:"160px"}}),a("el-table-column",{attrs:{align:"center",label:"Launch",prop:"launch",formatter:e.formatTime,width:"160px"}})],1)],1)])},o=[],l={components:{},name:"ProductTesting",props:{height:{type:String,default:"300px"},rem:{type:String,default:""},data:{type:Array,default:function(){return[]}}},data(){return{productTestings:[{product:"product1",engSample:"11-Mar-23",pp:"11-Jun-23",mp:"11-Jun-23",launch:"11-Jun-23"},{product:"product2",engSample:"11-Mar-23",pp:"29-Mar-23",mp:"11-Jun-23",launch:"11-Jun-23"},{product:"product3",engSample:"11-Mar-23",pp:"29-Mar-23",mp:"11-Jun-23",launch:"11-Jun-23"},{product:"product4",engSample:"11-Mar-23",pp:"29-Mar-23",mp:"11-Jun-23",launch:"11-Jun-23"},{product:"product5",engSample:"11-Mar-23",pp:"29-Mar-23",mp:"11-Jun-23",launch:"11-Jun-23"},{product:"product6",engSample:"11-Mar-23",pp:"29-Mar-23",mp:"11-Jun-23",launch:"11-Jun-23"}],ticketTableCellHeight:""}},computed:{},watch:{},methods:{cellStyle({rowIndex:e,columnIndex:t}){const a=this.height.split("p",2);return this.ticketTableCellHeight=Math.ceil(Number(a[0])/7),e%2==0&&0==t?"background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==0&&2==t?"font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==0&&4==t?"font-size: 1rem; background: #15184d; border: none;border-right: 1px solid #dddddd88;padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==0?"font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==1&&0==t?"background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==1&&2==t?"font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":e%2==1&&4==t?"font-size: 1rem; background: #252963; border: none;border-right: 1px solid #171717; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px":"font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 800; height: "+this.ticketTableCellHeight+"px"},headerCellStyle({columnIndex:e}){return 2==e?"font-size: 1rem;font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":4==e?"font-size: 1rem;font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555;padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;":"font-size: 1rem;font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:"+this.ticketTableCellHeight+"px; color: white;"},headerRowStyle(){return"height: 2.5rem;"},tableScroll(e,t){const a=e.bodyWrapper;setInterval(()=>{a.scrollHeight-a.clientHeight>10&&a.clientHeight+a.scrollTop<a.scrollHeight-1&&(a.scrollTop+=1,a.clientHeight+a.scrollTop>=a.scrollHeight-1&&setTimeout(()=>{a.scrollTop=0},3e3))},t)},formatTime(e,t){const a=["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec."];if("Eng Sample testing"===t.label){if(null==e.engSample)return"/";const t=new Date(e.engSample),r=t.getDate().toString(),o=t.getMonth(),l=t.getFullYear()-2e3;return r+"-"+a[o]+"-"+l}if("PP Testing"===t.label){if(null==e.pp)return"/";const t=new Date(e.pp),r=t.getDate().toString(),o=t.getMonth(),l=t.getFullYear()-2e3;return r+"-"+a[o]+"-"+l}if("MP"===t.label){if(null==e.mp)return"/";const t=new Date(e.mp),r=t.getDate().toString(),o=t.getMonth(),l=t.getFullYear()-2e3;return r+"-"+a[o]+"-"+l}if("Launch"===t.label){if(null==e.launch)return"/";const t=new Date(e.launch),r=t.getDate().toString(),o=t.getMonth(),l=t.getFullYear()-2e3;return r+"-"+a[o]+"-"+l}return"format"}},created(){},mounted(){const e=this.$refs.stage;this.tableScroll(e,50)},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},n=l,i=(a("465f"),a("2877")),s=Object(i["a"])(n,r,o,!1,null,"64bce6f7",null);t["a"]=s.exports},"8eaa":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"productTesting"},[a("pageHeader",{attrs:{title:e.$t("productTesting.pageTitle"),describe:e.$t("productTesting.pageDesc")}}),a("div",{staticClass:"new-create",staticStyle:{"margin-left":"1rem"}},[a("el-button",{staticClass:"create-button",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.openDialog(1)}}},[a("i",{staticClass:"el-icon-plus"}),e._v(e._s(e.$t("productTesting.add")))]),a("el-upload",{ref:"uploadRef",attrs:{action:e.base_api+"/info_screen/productTesting/excel/handler",multiple:"",limit:1,"on-success":e.handleSuccess,headers:e.headers,"before-upload":e.beforeUpload,"show-file-list":!1}},[a("el-button",{attrs:{size:"mini",type:"primary"}},[a("i",{staticClass:"el-icon-upload2"}),e._v(e._s(e.$t("productTesting.batchAdd")))])],1),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"warning",size:"mini"},on:{click:function(t){e.visible1=!0}}},[e._v(" view ")]),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"primary",size:"mini"}},[a("i",{staticClass:"el-icon-download"}),a("a",{staticStyle:{margin:"0.3rem 0.5rem 0.3rem 0",color:"#fff"},attrs:{href:e.base_api+"/template/Product_Testing_Stage.xlsx"}},[e._v(e._s(e.$t("excelTemplate.downloadTemplate")))])])],1),a("el-dialog",{attrs:{title:e.$t("productTesting.excelDialogTitle"),visible:e.visible},on:{close:function(t){e.visible=!1}}},[a("ProductTestingTable",{attrs:{data:e.excelData},on:{fatherMethod:e.closeTable}})],1),a("el-dialog",{attrs:{title:e.$t("productTesting.addDialogTitle"),visible:e.addFormVisible},on:{close:function(t){e.addFormVisible=!1}}},[a("AddForm",{on:{fatherMethod:e.closeAddForm}})],1),a("el-dialog",{attrs:{title:e.$t("productTesting.updateDialogTitle"),visible:e.updateFormVisible},on:{close:function(t){e.updateFormVisible=!1}}},[a("UpdateForm",{attrs:{form:e.updateForm},on:{fatherMethod:e.closeUpdateForm}})],1),a("el-table",{staticClass:"table-content",staticStyle:{margin:"0 auto"},attrs:{data:e.productTestings,border:!0,stripe:""}},[a("el-table-column",{attrs:{prop:"product",label:"product",align:"center"}}),a("el-table-column",{attrs:{prop:"engSample",label:"engSample",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.engSample?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.engSample))])]}}])}),a("el-table-column",{attrs:{prop:"pp",label:"pp",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.pp?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.pp))])]}}])}),a("el-table-column",{attrs:{prop:"mp",label:"mp",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.mp?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.mp))])]}}])}),a("el-table-column",{attrs:{prop:"launch",label:"launch",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.launch?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.launch))])]}}])}),a("el-table-column",{attrs:{label:"operation",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{display:"flex","justify-content":"center",cursor:"pointer"}},[a("div",{staticStyle:{color:"#409eff"},on:{click:function(a){return e.update(t.row)}}},[a("span",[e._v(e._s(e.$t("productTesting.update")))])]),a("div",{staticStyle:{color:"#409eff","margin-left":"10px"},on:{click:function(a){return e.deleteProductTesting(t.row.id)}}},[a("span",[e._v(e._s(e.$t("productTesting.delete")))])])])]}}])})],1),a("el-dialog",{attrs:{title:"Product Testing Stage",visible:e.visible1,width:"55%"},on:{"update:visible":function(t){e.visible1=t}}},[a("ProductTesting",{attrs:{data:e.productTestings}})],1)],1)},o=[],l=a("e965"),n=a("751a"),i=a("4360");function s(e){return Object(n["a"])({url:"/info_screen/productTesting/batchAdd",method:"post",data:e,headers:{token:i["a"].getters.token}})}function c(e){return Object(n["a"])({url:"/info_screen/productTesting/add",method:"post",data:e,headers:{token:i["a"].getters.token}})}function d(){return Object(n["a"])({url:"/info_screen/productTesting/list",method:"get",headers:{token:i["a"].getters.token}})}function p(e){return Object(n["a"])({url:"/info_screen/productTesting/update",method:"put",data:e,headers:{token:i["a"].getters.token}})}function u(e){return Object(n["a"])({url:"/info_screen/productTesting/delete/"+e,method:"delete",headers:{token:i["a"].getters.token}})}var m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"productTestingTable"},[a("el-table",{staticClass:"table-content",staticStyle:{margin:"0 auto"},attrs:{data:e.data,border:!0,stripe:""}},[a("el-table-column",{attrs:{prop:"product",label:"product",align:"center"}}),a("el-table-column",{attrs:{prop:"engSample",label:"engSample",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.engSample?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.engSample))])]}}])}),a("el-table-column",{attrs:{prop:"pp",label:"pp",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.pp?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.pp))])]}}])}),a("el-table-column",{attrs:{prop:"mp",label:"mp",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.mp?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.mp))])]}}])}),a("el-table-column",{attrs:{prop:"launch",label:"launch",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[null==t.row.launch?a("span",[e._v("/")]):a("span",[e._v(e._s(t.row.launch))])]}}])})],1),a("div",{staticStyle:{"text-align":"center",margin:"20px 0"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v(" "+e._s(e.$t("productTesting.confirm"))+" ")]),a("el-button",{attrs:{type:"warning"},on:{click:e.cancle}},[e._v(" "+e._s(e.$t("productTesting.cancel"))+" ")])],1)],1)},g=[],f={components:{},name:"productTestingTable",props:{data:{type:Array,required:!0,default:function(){return[]}}},data(){return{}},computed:{},watch:{},methods:{async confirm(){const{data:e}=await s(this.data);200==e.code?(this.$message({type:"success",message:"batchAdd successfully!"}),this.$emit("fatherMethod")):this.$message({type:"warning",message:e.msg})},cancle(){this.$emit("fatherMethod")}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},h=f,b=(a("9d7e9"),a("2877")),y=Object(b["a"])(h,m,g,!1,null,"1b12f328",null),T=y.exports,v=a("698e"),_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"UpdateForm"},[a("el-form",{attrs:{model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"product:"}},[a("el-input",{attrs:{type:"text",placeholder:e.$t("productTesting.productPlaceholder")},model:{value:e.form.product,callback:function(t){e.$set(e.form,"product",t)},expression:"form.product"}})],1),a("el-form-item",{attrs:{label:"engSample:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.engSamplePlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.engSample,callback:function(t){e.$set(e.form,"engSample",t)},expression:"form.engSample"}})],1),a("el-form-item",{attrs:{label:"pp:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.ppPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.pp,callback:function(t){e.$set(e.form,"pp",t)},expression:"form.pp"}})],1),a("el-form-item",{attrs:{label:"mp:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.mpPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.mp,callback:function(t){e.$set(e.form,"mp",t)},expression:"form.mp"}})],1),a("el-form-item",{attrs:{label:"launch:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.launchPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.launch,callback:function(t){e.$set(e.form,"launch",t)},expression:"form.launch"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v(e._s(e.$t("productTesting.confirm")))])],1)],1)],1)},w=[],x={components:{},name:"UpdateForm",props:{form:{type:Object,required:!0,default:function(){return{}}}},data(){return{updateForm:this.form}},computed:{},watch:{form(){this.updateForm=this.form}},methods:{async submit(){console.log(this.updateForm);const{data:e}=await p(this.updateForm);200==e.code?(this.$message({type:"success",message:"update successfully!"}),this.updateForm={},this.$emit("fatherMethod")):this.$message({type:"warning",message:e.msg})}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},S=x,k=(a("3493"),Object(b["a"])(S,_,w,!1,null,"07fefd9c",null)),$=k.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addForm"},[a("el-form",{attrs:{model:e.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"product:"}},[a("el-input",{attrs:{type:"text",placeholder:e.$t("productTesting.productPlaceholder")},model:{value:e.form.product,callback:function(t){e.$set(e.form,"product",t)},expression:"form.product"}})],1),a("el-form-item",{attrs:{label:"engSample:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.engSamplePlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.engSample,callback:function(t){e.$set(e.form,"engSample",t)},expression:"form.engSample"}})],1),a("el-form-item",{attrs:{label:"pp:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.ppPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.pp,callback:function(t){e.$set(e.form,"pp",t)},expression:"form.pp"}})],1),a("el-form-item",{attrs:{label:"mp:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.mpPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.mp,callback:function(t){e.$set(e.form,"mp",t)},expression:"form.mp"}})],1),a("el-form-item",{attrs:{label:"launch:"}},[a("el-date-picker",{attrs:{type:"date",placeholder:e.$t("productTesting.launchPlaceholder"),"value-format":"yyyy-MM-dd"},model:{value:e.form.launch,callback:function(t){e.$set(e.form,"launch",t)},expression:"form.launch"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v(e._s(e.$t("productTesting.confirm")))])],1)],1)],1)},C=[],P={components:{},name:"addForm",data(){return{form:{}}},computed:{},watch:{},methods:{async submit(){console.log(this.form);const{data:e}=await c(this.form);200==e.code?(this.$message({type:"success",message:"add successfully!"}),this.form={},this.$emit("fatherMethod")):this.$message({type:"warning",message:e.msg})}},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},F=P,D=(a("14b7"),Object(b["a"])(F,M,C,!1,null,"dec66d64",null)),H=D.exports,z={components:{ProductTestingTable:T,AddForm:H,UpdateForm:$,ProductTesting:v["a"],pageHeader:l["a"]},name:"productTesting",data(){return{base_api:"https://api.board.ifi-cloud.com",headers:{token:i["a"].getters.token},excelData:[],visible:!1,title:"",addFormVisible:!1,productTestings:[],updateFormVisible:!1,updateForm:{},visible1:!1}},computed:{},watch:{},methods:{handleSuccess(e){console.log(e.data),200==e.code?(this.excelData=e.data,this.visible=!0,this.title="Product Testing Stage Excel Data"):this.$message({type:"warning",message:e.msg})},beforeUpload(e){const t=e.name,a="Product_Testing_Stage.xlsx";if(t!==a)return this.$confirm("请上传Product_Testing_Stage.xlsx",this.$t("eol.tips"),{confirmButtonText:this.$t("eol.confirm"),cancelButtonText:this.$t("eol.cancel"),type:"warning"}),!1},openDialog(e){1==e&&(this.title="填写ProductTesting表单",this.addFormVisible=!0),2==e&&(this.title="更新表单",this.updateFormVisible=!0)},async getProductTestings(){const{data:e}=await d();200==e.code?this.productTestings=e.data:this.$message({type:"warning",message:e.msg})},update(e){this.updateForm=e,this.openDialog(2)},deleteProductTesting(e){this.$confirm(this.$t("productTesting.deleteTips"),this.$t("productTesting.tips"),{confirmButtonText:this.$t("productTesting.confirm"),cancelButtonText:this.$t("productTesting.cancel"),type:"warning"}).then(async()=>{const{data:t}=await u(e);200==t.code?(this.$message({type:"success",message:"delete successfully!"}),this.getProductTestings()):this.$message({type:"warning",message:t.msg})}).catch(e=>{this.$message({type:"info",message:this.$t("clock.cancelTooltip")})})},closeUpdateForm(){this.getProductTestings(),this.updateFormVisible=!1},closeAddForm(){this.getProductTestings(),this.addFormVisible=!1},closeTable(){this.$refs.uploadRef.clearFiles(),this.getProductTestings(),this.visible=!1}},created(){},mounted(){this.getProductTestings()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},J=z,U=(a("b726"),Object(b["a"])(J,r,o,!1,null,"60ff5d74",null));t["default"]=U.exports},"9cc8":function(e,t,a){},"9d7e9":function(e,t,a){"use strict";a("d5ca")},af88:function(e,t,a){},b726:function(e,t,a){"use strict";a("af88")},b747:function(e,t,a){},ca91:function(e,t,a){},d5ca:function(e,t,a){},e965:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",staticStyle:{background:"#fff",height:"100px",padding:"10px 0"}},[a("div",{staticClass:"title",staticStyle:{"font-size":"30px",padding:"10px"}},[e._v(e._s(e.title))]),a("div",{staticClass:"content",staticStyle:{"font-size":"15px",padding:"10px",color:"#888"}},[e._v(e._s(e.describe)+" ")])])},o=[],l={components:{},name:"pageHeader",props:{title:{type:String,default:null},describe:{type:String,default:null}},data(){return{}},computed:{},watch:{},methods:{},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},n=l,i=(a("3e54"),a("2877")),s=Object(i["a"])(n,r,o,!1,null,"32773f74",null);t["a"]=s.exports}}]);