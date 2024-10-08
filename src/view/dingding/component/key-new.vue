<!--  -->
<template>
    <div class="kn-container-publish" style="">
        <van-nav-bar :title="$t(`dingding.publishIntTitle`)" :left-text="$t(`dingding.back`)" @click-left="onClickLeft" />
        <div class="change-lan" style="margin:0.7rem;position:absolute;top: 0;right:0rem;z-index: 99;">
            <ChangeLan></ChangeLan>
        </div>
        <div class="form" style="margin:1rem">
            <el-form label-position="left" label-width="9rem" :model="form" :rules="rules" ref="form">
                <el-form-item :label="$t(`dingding.title`)" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item :label="$t(`dingding.message`)" prop="message">
                    <el-input v-model="form.message" type="textarea" :rows="3"
                        placeholder="Please enter the message."></el-input>
                </el-form-item>
                <el-form-item :label="$t(`dingding.customPublisher`)">
                    <el-switch v-model="flag"></el-switch>
                </el-form-item>
                <el-form-item :label="$t(`dingding.optionalPublishers`)" prop="member" v-if="!flag">
                    <el-select v-model="form.memberId" placeholder="Please select a publisher.">
                        <el-option v-for="item in members" :key="item.id" :label="item.memberName" :value="item.id">
                            <div>
                                <span style="float: left; color: #8492a6; font-size: 15px">{{ item.memberName }}</span>
                                <el-avatar v-if="item.avatar !== null" :src="base_api + item.avatar"
                                    style="width: 35px; height: 35px;float:right"></el-avatar>
                                <el-avatar v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                    style="width: 35px; height: 35px;float:right"></el-avatar>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t(`dingding.customPublisher`)" prop="publisher" v-else>
                    <el-input v-model="form.publisher"></el-input>
                </el-form-item>
                <el-form-item :label="$t(`dingding.expiration`)" prop="expireTime">
                    <el-date-picker v-model="form.expireTime" type="datetime" placeholder="Please select a datetime."
                        value-format="yyyy-MM-ddTHH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t(`dingding.isEffective`)" prop="isExpire">
                    <el-switch v-model="form.isExpire" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div style="display:flex">
                <el-button type="primary" style="margin:1rem auto" @click="submit">{{ $t(`dingding.publish`) }}</el-button>
                <el-button type="warning" style="margin:1rem auto"
                    @click="queryInfos()">{{ $t(`dingding.queryList`) }}</el-button>
            </div>
        </div>
        <van-tabbar route>
            <van-tabbar-item name="news-publish" icon="home-o" :to="{ name: 'news-publish' }">{{ $t(`dingding.tabTitle1`) }}
            </van-tabbar-item>
            <van-tabbar-item name="shows-publish" icon="friends-o"
                :to="{ name: 'shows-publish' }">{{ $t(`dingding.tabTitle2`) }}
            </van-tabbar-item>
            <van-tabbar-item name="notices-publish" icon="setting-o"
                :to="{ name: 'notices-publish' }">{{ $t(`dingding.tabTitle3`) }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import ChangeLan from '@/components/changeLan/index.vue'
import { publishKeyNew, keyNews, members } from '@/api/dingding'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        ChangeLan
    },
    name: 'key-new',
    props: {
        form: {
            type: Object,
            required: false,
            default: function () {
                return {
                };
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            //form: {},
            users: [],
            rules: {
                title: [
                    { required: true, message: this.$t(`dingding.titleRuleTip`), trigger: 'blur' },
                ],
                message: [
                    { required: true, message: this.$t(`dingding.messageRuleTip`), trigger: 'blur' },
                ],
                expireTime: [
                    { required: true, message: this.$t(`dingding.expirationRuleTip`), trigger: 'blur' },
                ],
            },
            news: [],
            members: [],
            flag: true,
            activeName: 0,
            base_api: process.env.VUE_APP_BASE_API,
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async submit() {
            console.log(this.form)
            const { data: res } = await publishKeyNew(this.form)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '发布成功'
                })
                this.form = {}
            } else {
                this.$message({
                    type: 'error',
                    message: '表单有空字段，请仔细填写！'
                })
            }
        },
        queryInfos() {
            console.log(`查询列表`)
            let router = this.$router.resolve(
                {
                    path: '/info_screen/dingding/news',
                    // query: {
                    //     'ticket': '123456'
                    // }
                }
            );
            window.open(router.href, '_top');
        },
        async getNews() {
            const { data: res } = await keyNews()
            if (res.code == 200) {
                this.news = res.data
            } else {
                this.$message({
                    type: 'fail',
                    message: '获取列表失败'
                })
            }
        },
        async getMembers() {
            const { data: res } = await members()
            if (res.code == 200) {
                this.members = res.data
            }
        },
        onClickLeft() {
            this.$router.push({ path: '/info_screen/dingding/publish' })
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getMembers()
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
<style lang='scss' scoped>//  @import url(); 引入公共css类
.kn-container-publish {
    background: #eee;
    height: 100vh;
}</style>