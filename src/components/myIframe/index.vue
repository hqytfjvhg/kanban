<!--
* @description  参数1
* @fileName  index
* @author Arvin
* @date 2022-12-07 15:11:19
* @version V1.0.0
!-->

<template>
  <div id='my-iframe' style="overflow: auto;">
    <iframe id="my-iframe-content" style="width:100%" sandbox="allow-same-origin allow-forms"
          :src="mySrc" scrolling="no" ame="webb" οnlοad="this.height=webb.document.body.scrollHeight+20">
        </iframe>
  </div>
</template>

<script>
export default {
  name: 'my-iframe',
  props:{
    mySrc:{
        type:String,
        default:'https://ifi-audio.com/secrets-of-silence/',
        required: false,
    }
  },
  data () {
    return {
        
    }
  },
  created () { // 实例被创建之后执行代码
    const oIframe = document.getElementById('my-iframe-content');
    console.log(oIframe.contentWindow.document)
    },
  computed: { // 计算属性

    },
  components: { // 组件的引用

    },
  methods: { // 方法

    },
  mounted () { // 页面进入时加载内容
    //document.domain = 'ifi-audio.com'  Failed to set the 'domain' property on 'Document': 'ifi-audio.com' is not a suffix of 'localhost'
    const oIframe = document.getElementById('my-iframe-content');
    console.log(oIframe.contentWindow.document)
    //const deviceWidth = document.documentElement.clientWidth;
    //const deviceHeight = oIframe.contentWindow.document.body.height + 50;
    //oIframe.style.width = (Number(deviceWidth)-220) + 'px'; //数字是页面布局宽度差值
    //oIframe.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
    },
  watch: { // 监测变化

    }
}
</script>
<style lang='scss' scoped>

</style>