<!--
* @description  参数1
* @fileName  webSocket
* @author Arvin
* @date 2022-11-17 16:53:58
* @version V1.0.0
!-->

<template>
    <div id='webSocket' class="container">
    </div>
</template>

<script>
export default {
    name: 'webSocket',
    data() {
        return {

        }
    },
    created() { // 实例被创建之后执行代码

    },
    computed: { // 计算属性

    },
    components: { // 组件的引用

    },
    methods: { // 方法

        initWebSocket: function () {
            var userId = 'webSocket';
            //var url = window._CONFIG['domianURL'].replace("http://", "ws://") + "websocket/" + userId;
            var url = "ws://localhost:8081/websocket/"+userId
            this.websock = new WebSocket(url);
            this.websock.onopen = this.websocketOnOpen;
            this.websock.onerror = this.websocketOnError;
            this.websock.send = this.websocketSend;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose

        },
        //连接后调用
        websocketOnOpen: function () {
            console.log("websocket 连接成功");
        },
        websocketOnError: function (e) {
            console.log("websocket 连接错误" + e);
        },
        websocketSend: function () {
            console.log("给后端发送消息");
        },
        websocketonmessage: function (e) {
            var data = eval("(" + e.data + ")");
            if (data.cmd == "topic") {
                console.log("topic指令，进行以下操作");
            }
        },
        // 关闭连接时调用
        websocketclose: function (e) {
            console.log("connection closed (" + e.code + ")");
        }


    },
    mounted() { // 页面进入时加载内容
        this.initWebSocket()
    },
    destroyed: function () { // 离开页面生命周期函数
        this.websocketclose();
    },
    watch: { // 监测变化

    }
}
</script>
<style lang='scss' scoped>

</style>