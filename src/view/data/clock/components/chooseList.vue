<!--  -->
<template>
    <div class="chooseList" style="display: block;">
        <el-checkbox-group v-model="memberIds">
            <el-checkbox v-for="member in members" :label="member.id" :key="member.id">
                <div style="text-align: center;">
                    <el-avatar v-if="member.avatar === null" :size="43"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar" />
                    <el-avatar v-if="member.avatar !== null" :size="43" :src="base_api + member.avatar" class="avatar" />
                    <div style="font-size:0.9rem;font-weight: bold;">{{ member.memberName }}</div>
                </div>
            </el-checkbox>
        </el-checkbox-group>
        <div style="text-align: center;margin: 20px;">
            <el-button class="create-button" type="primary" @click="updateTeam" size="mini">{{ $t(`clock.confirm`)
            }}</el-button>
            <el-button class="create-button" type="warning" @click="cancle" size="mini">{{ $t(`clock.cancel`)
            }}</el-button>
        </div>

    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getMembers, getMemberIds, updateTeam } from '@/api/member';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'chooseList',
    props: {
        clockId: {
            type: Number,
            default: 1
        }
    },
    data() {
        // 这里存放数据
        return {
            base_api: process.env.VUE_APP_BASE_API,
            members: [],
            memberIds: []
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        cancle() {
            this.$emit("fatherMethod", false)
            this.$message({
                type: 'info',
                message: this.$t(`clock.operationOK`)
            })
            this.getMemberIds(this.clockId)

        },
        async getMembers() {
            const { data: res } = await getMembers()
            if (res.code == 200) {
                this.members = res.data
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        async getMemberIds(clockId) {
            const { data: res } = await getMemberIds(clockId)
            if (res.code == 200) {
                this.memberIds = res.data
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        async updateTeam() {
            const { data: res } = await updateTeam(this.clockId, this.memberIds)
            if (res.code == 200) {
                this.memberIds = res.data
                console.log(`关闭子组件`)
                this.$emit("fatherMethod", true)
                this.$message({
                    type: 'success',
                    message: this.$t(`clock.operationOK`)
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },

    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getMembers()
        this.getMemberIds(this.clockId)
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
</style>