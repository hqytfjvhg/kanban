<template>
   <div class="_404">
        <h2 class="m-0">抱歉，页面未找到，<span>{{countDown}}</span>s后自动跳转到
            <a href="javascript:;" @click="goHome">首页</a>
        </h2>
        <img src="../../assets/404.png" alt="页面未找到">
    </div>
  </template>
  
  <script>
  import logo from '@/assets/logo_center.png'
  import pageHeader from '@/components/pageHeader/index.vue'
  export default {
    name: 'not-found',
    components: { // 组件的引用
      pageHeader
    },
    data() {
      return {
        role: this.$store.getters.role,
        background: {
          image: logo
        },
        countDown: 5,
        timer: null
  
      }
    },
    props: {
  
    },
    created() { // 实例被创建之后执行代码
  
     this.timer = setInterval(() => {
                this.countDown > 0 ? this.countDown-- : this.goHome()
            }, 1000)
      // clearInterval(this.timer)
  
  
    },
    computed: { // 计算属性
  
  
    },
    methods: { // 方法
        goHome() {
                this.$router.push('/')
                clearInterval(this.timer)
            }
    },
    mounted() { // 页面进入时加载内容
  
    },
    watch: { // 监测变化
  
    }
  }
  </script>
  <style lang='scss' scoped>
   body {
	        background-color: #dceebc;
	    }
	
	    ._404 {
	        width: 30%;
	        margin: 5rem auto;
	    }
	
	    ._404 img {
	        width: 30rem;
	    }
	
	    ._404 a {
	        color: #010101;
	    }
	
	    ._404 a:hover {
	        color: skyblue;
	    }
  </style>