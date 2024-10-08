<!--  -->
<template>
    <div class="CardComponent">
        <div class="list" id="list" :style="'width:' + width">
            <div class="list-content-contain">
                <!-- <autoscroll class="list-content" :height="height" v-if="members.length > 0" :speed="41">
                    <div v-for="(item, index) in members" :key="index" style="padding: 0.1rem 0;">
                        <el-row>
                            <el-col :xs="12" :sm="12" :lg="4" v-for="it in item">
                                <div style="text-align: center;">
                                    <el-avatar v-if="it.avatar === null" :size="43"
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                        class="avatar" />
                                    <el-avatar v-else :size="43" :src="it.avatar" class="avatar" />
                                    <div v-if="it.memberName.length<9" style="font-size:0.8rem;font-weight: bold;">{{ it.memberName }}</div>
                                    <div v-else style="font-size:0.8rem;font-weight: 500;">{{ it.memberName }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </autoscroll> -->
                <div class="list-content" :style="'height:' + height" v-if="members.length > 0" :speed="41">
                    <!-- <Transition-group name="changeShow" appear> -->
                    <Transition name="changeShow" appear v-for="(item, index) in members" :key="index">
                        <el-row v-show="isShow[index]">
                            <el-col :xs="12" :sm="12" :lg="4" v-for="it in item" :key="it.memberId">
                                <div style="text-align: center;">
                                    <el-avatar v-if="it.avatar === null" style="width: 3.5rem; height: 3.5rem"
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                        class="avatar" />
                                    <el-avatar v-else style="width: 3.5rem; height: 3.5rem" :src="base_api + it.avatar" class="avatar" />
                                    <div v-if="it.memberName.length < 9" style="font-size:0.8rem;font-weight: 600;">{{
                                        it.memberName }}</div>
                                    <div v-else style="font-size:0.8rem;font-weight: bold;">{{ it.memberName }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </Transition>
                    <!-- </Transition-group> -->
                </div>
                <div class="list-content flex-center"
                    :style="'font-family: Arial; color: #ccc; height:' + height + 'px; font-size: 1.2rem;'" v-else>No
                    information</div>
            </div>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import autoscroll from 'z-vue-autoscroll'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        autoscroll
    },
    name: 'CardComponent',
    props: {
        height: {
            type: String,
            // required: true
            default: '2.4rem'//4.5rem
        },
        width: {
            type: String,
            // required: true
            //default: '100%'
        },
        rem: {
            type: String,
        },
        members: {
            type: Array,
            default:
                function () {
                    return [
                        // [
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     }
                        // ],
                        // [
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Alvin',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Lucy',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     }
                        // ],
                        // [
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Mike',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Tom',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     }
                        // ],
                        // [
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Tony',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     },
                        //     {
                        //         memberDept: 'Marketing',
                        //         memberName: 'Adam',
                        //         duty: 'Reviews, Forums and Partnerships'
                        //     }
                        // ],
                    ];
                }
        }
    },
    data() {
        // 这里存放数据
        return {
            base_api: process.env.VUE_APP_BASE_API,
            isShow: [],
            timer:null
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {
        rem: {
            handler: function () {
                document.documentElement.style.fontSize = this.rem
                console.log(`CardComponent change document rem` + this.rem)
            },
            immediate: true
        },
        members: {
            handler: function () {
                var length = this.members.length
                for (var i = 0; i < length; i++) {
                    this.$set(this.isShow, i, false)
                }
                //this.isShow[0] = true
                this.$set(this.isShow, 0, true)
                //this.isShow[1] = true
                this.clear()
                this.changeIsShow()
            },
            immediate: true
        },
    },
    // 方法集合
    methods: {
        changeIsShow() {
            var length = this.members.length
            if (length == 1) return
            else {
                var trueIndex = 0
                this.timer = setInterval(() => {
                    this.$set(this.isShow, (trueIndex + 1) % length, true)
                    this.$set(this.isShow, trueIndex, false)
                    //console.log(`定时任务`,trueIndex)
                    trueIndex = (trueIndex + 1) % length
                }, 10000)
            }
        },
        clear() {
            clearInterval(this.timer);
            this.timer = null;
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.changeIsShow()
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() { }, // 生命周期 - 创建之前
    beforeMount() { }, // 生命周期 - 挂载之前
    beforeUpdate() { }, // 生命周期 - 更新之前
    updated() { }, // 生命周期 - 更新之后
    beforeDestroy() { }, // 生命周期 - 销毁之前
    destroyed() { }, // 生命周期 - 销毁完成
    activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
.list {
    padding: 0 0.4rem;
    display: flex;

    .list-content-contain {
        background-color: #272956;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .list-content {
            font-family: Arial;
            overflow: hidden;
            width: 100%;
            padding:0.5rem 0 1.2rem 0;
            //border:1px solid;
            //margin-top:-0.1rem;


            .membersName {
                margin-top: 0.1rem;
                font-size: 0.9rem;
            }
        }
    }
}

.changeShow-enter-active {
    animation: changeShow 0.8s;
}

.changeShow-leave-active {
    animation: changeShow 0.1s reverse;
}

@keyframes changeShow {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0px);
    }
}
</style>
