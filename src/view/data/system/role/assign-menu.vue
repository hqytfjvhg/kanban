<!--  -->
<template>
    <div class="assign-menu-container">
        <!-- <div>{{ role }}</div> -->
        <el-tree :data="menus" show-checkbox node-key="id" :default-expanded-keys="[1, 6, 19]" :default-checked-keys="menuIds"
            :props="defaultProps" ref="tree" :check-strictly="true">
        </el-tree>
        <el-button type="primary" style="display:block;margin:10px auto" @click="submit">提交</el-button>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getMenuList } from '@/api/system'
import { getMenuIdsByRoleId, assignMenusByRoleId } from '@/api/role'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'assign-menu',
    props: {
        role: {
            type: Object,
            required: true
        }
    },
    data() {
        // 这里存放数据
        return {
            menus: [],
            defaultProps: {
                label: 'title'
            },
            menuIds: []
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async getMenus() {
            const { data: res } = await getMenuList()
            if (res.code == 200) {
                this.menus = res.data
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        async getMenuIds(roleId) {
            const { data: res } = await getMenuIdsByRoleId(roleId)
            if (res.code == 200) {
                this.menuIds = res.data
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        async submit() {
            const checkedNodes = await this.$refs.tree.getCheckedNodes(false, true)
            const checkedKeys = []
            for (let index = 0; index < checkedNodes.length; index++) {
                checkedKeys[index] = checkedNodes[index].id;

            }
            console.log(checkedKeys)
            const { data: res } = await assignMenusByRoleId(this.role.roleId, checkedKeys)
            if (res.code == 200) {
                this.getMenuIds(this.role.roleId)
                this.$emit('fatherMethod')
                this.$message({
                    type: 'success',
                    message: '分配成功'
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getMenus()
        this.getMenuIds(this.role.roleId)
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