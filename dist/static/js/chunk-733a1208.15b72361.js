(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-733a1208"],{"236c":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sn-container-publish"},[r("van-nav-bar",{attrs:{title:e.$t("dingding.publishShowTitle"),"left-text":e.$t("dingding.back")},on:{"click-left":e.onClickLeft}}),r("div",{staticClass:"change-lan",staticStyle:{margin:"0.7rem",position:"absolute",top:"0",right:"0rem","z-index":"99"}},[r("ChangeLan")],1),r("div",{staticClass:"form",staticStyle:{margin:"1rem"}},[r("el-form",{attrs:{"label-position":"left","label-width":"9rem",model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:e.$t("dingding.title"),prop:"title"}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("el-form-item",{attrs:{label:e.$t("dingding.message"),prop:"message"}},[r("el-input",{attrs:{type:"textarea",rows:3,placeholder:"Please enter the message."},model:{value:e.form.message,callback:function(t){e.$set(e.form,"message",t)},expression:"form.message"}})],1),r("el-form-item",{attrs:{label:e.$t("dingding.customPublisher")}},[r("el-switch",{model:{value:e.flag,callback:function(t){e.flag=t},expression:"flag"}})],1),e.flag?r("el-form-item",{attrs:{label:e.$t("dingding.customPublisher"),prop:"publisher"}},[r("el-input",{model:{value:e.form.publisher,callback:function(t){e.$set(e.form,"publisher",t)},expression:"form.publisher"}})],1):r("el-form-item",{attrs:{label:e.$t("dingding.optionalPublishers"),prop:"member"}},[r("el-select",{attrs:{placeholder:"Please select a publisher."},model:{value:e.form.memberId,callback:function(t){e.$set(e.form,"memberId",t)},expression:"form.memberId"}},e._l(e.members,(function(t){return r("el-option",{key:t.id,attrs:{label:t.memberName,value:t.id}},[r("div",[r("span",{staticStyle:{float:"left",color:"#8492a6","font-size":"15px"}},[e._v(e._s(t.memberName))]),null!==t.avatar?r("el-avatar",{staticStyle:{width:"35px",height:"35px",float:"right"},attrs:{src:e.base_api+t.avatar}}):r("el-avatar",{staticStyle:{width:"35px",height:"35px",float:"right"},attrs:{src:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}})],1)])})),1)],1),r("el-form-item",{attrs:{label:e.$t("dingding.expiration"),prop:"expireTime"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"Please select a datetime.","value-format":"yyyy-MM-ddTHH:mm:ss"},model:{value:e.form.expireTime,callback:function(t){e.$set(e.form,"expireTime",t)},expression:"form.expireTime"}})],1),r("el-form-item",{attrs:{label:e.$t("dingding.isEffective"),prop:"isExpire"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.form.isExpire,callback:function(t){e.$set(e.form,"isExpire",t)},expression:"form.isExpire"}})],1)],1),r("div",{staticStyle:{display:"flex"}},[r("el-button",{staticStyle:{margin:"1rem auto"},attrs:{type:"primary"},on:{click:e.submit}},[e._v(e._s(e.$t("dingding.publish")))]),r("el-button",{staticStyle:{margin:"1rem auto"},attrs:{type:"warning"},on:{click:function(t){return e.queryInfos()}}},[e._v(e._s(e.$t("dingding.queryList")))])],1)],1),r("van-tabbar",{attrs:{route:""}},[r("van-tabbar-item",{attrs:{name:"news-publish",icon:"home-o",to:{name:"news-publish"}}},[e._v(e._s(e.$t("dingding.tabTitle1"))+" ")]),r("van-tabbar-item",{attrs:{icon:"friends-o",to:{name:"shows-publish"}}},[e._v(e._s(e.$t("dingding.tabTitle2"))+" ")]),r("van-tabbar-item",{attrs:{icon:"setting-o",to:{name:"notices-publish"}}},[e._v(e._s(e.$t("dingding.tabTitle3"))+" ")])],1)],1)},n=[],a=(r("14d9"),r("f1c9")),s=r("a4d8"),o={components:{ChangeLan:a["a"]},name:"show-new",props:{form:{type:Object,required:!1,default:function(){return{}}}},data(){return{users:{},rules:{title:[{required:!0,message:this.$t("dingding.titleRuleTip"),trigger:"blur"}],message:[{required:!0,message:this.$t("dingding.messageRuleTip"),trigger:"blur"}],expireTime:[{required:!0,message:this.$t("dingding.expirationRuleTip"),trigger:"blur"}]},shows:[],members:[],flag:!0,base_api:"https://api.board.ifi-cloud.com"}},computed:{},watch:{},methods:{async submit(){console.log(this.form);const{data:e}=await Object(s["h"])(this.form);200==e.code?(this.$message({type:"success",message:"发布成功"}),this.form={}):this.$message({type:"error",message:"表单有空字段，请仔细填写！"})},async getShows(){const{data:e}=await Object(s["j"])();200==e.code?this.shows=e.data:this.$message({type:"fail",message:"获取列表失败"})},async getMembers(){const{data:e}=await Object(s["e"])();200==e.code&&(this.members=e.data)},queryInfos(){console.log("查询列表");let e=this.$router.resolve({path:"/info_screen/dingding/shows"});window.open(e.href,"_top")},onClickLeft(){this.$router.push({path:"/info_screen/dingding/publish"})}},created(){},mounted(){this.getMembers()},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},l=o,d=(r("d46a"),r("2877")),c=Object(d["a"])(l,i,n,!1,null,"68e14d9c",null);t["default"]=c.exports},"6ee0":function(e,t,r){},a4d8:function(e,t,r){"use strict";r.d(t,"g",(function(){return n})),r.d(t,"h",(function(){return a})),r.d(t,"i",(function(){return s})),r.d(t,"e",(function(){return o})),r.d(t,"j",(function(){return l})),r.d(t,"d",(function(){return d})),r.d(t,"f",(function(){return c})),r.d(t,"c",(function(){return u})),r.d(t,"b",(function(){return m})),r.d(t,"a",(function(){return f})),r.d(t,"k",(function(){return p})),r.d(t,"l",(function(){return b})),r.d(t,"m",(function(){return g}));var i=r("751a");function n(e){return Object(i["a"])({url:"/info_screen/dd/key",data:e,method:"post"})}function a(e){return Object(i["a"])({url:"/info_screen/dd/show",data:e,method:"post"})}function s(e){return Object(i["a"])({url:"/info_screen/dd/urgent",data:e,method:"post"})}function o(){return Object(i["a"])({url:"/info_screen/dd/members",method:"get"})}function l(){return Object(i["a"])({url:"/info_screen/dd/show/list",method:"get"})}function d(){return Object(i["a"])({url:"/info_screen/dd/key/list",method:"get"})}function c(){return Object(i["a"])({url:"/info_screen/dd/notice/list",method:"get"})}function u(e){return Object(i["a"])({url:"/info_screen/dd/show/delete/"+e,method:"delete"})}function m(e){return Object(i["a"])({url:"/info_screen/dd/notice/delete/"+e,method:"delete"})}function f(e){return Object(i["a"])({url:"/info_screen/dd/key/delete/"+e,method:"delete"})}function p(e){return Object(i["a"])({url:"/info_screen/dd/key",method:"put",data:e})}function b(e){return Object(i["a"])({url:"/info_screen/dd/show",method:"put",data:e})}function g(e){return Object(i["a"])({url:"/info_screen/dd/urgent",method:"put",data:e})}},d46a:function(e,t,r){"use strict";r("6ee0")}}]);