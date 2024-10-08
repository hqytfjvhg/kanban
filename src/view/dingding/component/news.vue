<!-- news -->
<template>
    <div class="news-container">
        <!-- <div style="font-size: 1.5rem;padding: 1rem;color: #888;">重要通知列表</div> -->
        <van-nav-bar :title="$t(`dingding.intList`)" />
        <div class="change-lan" style="margin:0.7rem;position:absolute;top: 0;right:0rem;z-index: 99;">
            <ChangeLan></ChangeLan>
        </div>
        <van-swipe-cell v-for="item in news" :key="item.keynewId" style="margin:1rem 0;background:#fff;">
            <van-cell :border="false" :title="item.title" :value="item.publisher" style="font-size: 0.9rem;">
                <div>
                    {{ item.gmtModified }}
                </div>
                <div v-if="item.memberName === null">
                    {{ item.publisher }}
                </div>
                <div v-else>
                    {{ item.memberName }}
                </div>
            </van-cell>
            <van-divider />
            <template #right>
                <div>
                    <div>
                    <van-button square hairline size="large" type="primary" :text="$t(`dingding.update`)"
                        @click="update(item)" />
                    </div>
                    <div>
                    <van-button square hairline size="large" type="danger" @click="deleteById(item.keynewId)"
                        :text="$t(`dingding.delete`)" />
                    </div>
                </div>
            </template>
        </van-swipe-cell>

        <van-action-sheet v-model="show" :title="$t(`dingding.update`)">
            <van-form @submit="onSubmit" >
                <van-field v-model="updateForm.title" :name="$t(`dingding.title`)" :label="$t(`dingding.title`)"
                    :placeholder="$t(`dingding.title`)"
                    :rules="[{ required: true, message: 'Please enter the message' }]" label-width="7rem"/>
                <van-field v-if="updateForm.memberName === null" v-model="updateForm.publisher"
                    :name="$t(`dingding.publisher`)" :label="$t(`dingding.publisher`)"
                    :placeholder="$t(`dingding.publisher`)" readonly label-width="7rem"/>
                <van-field v-else v-model="updateForm.memberName" :name="$t(`dingding.publisher`)"
                    :label="$t(`dingding.publisher`)" :placeholder="$t(`dingding.publisher`)" readonly label-width="7rem"/>
                <van-field v-model="updateForm.message" type="textarea" :name="$t(`dingding.message`)"
                    :label="$t(`dingding.message`)" :placeholder="$t(`dingding.message`)" autosize
                    :rules="[{ required: true, message: 'Please enter the message' }]" label-width="7rem"/>
                <van-field readonly clickable name="datetimePicker" :value="updateForm.expireTime"
                    :label="$t(`dingding.expiration`)" placeholder="Please select the datetime"
                    @click="showPicker = true" label-width="7rem"/>
                <van-field name="switch" :label="$t(`dingding.isEffective`)" label-width="7rem">
                    <template #input>
                        <van-switch v-model="updateForm.isExpire" size="20" inactive-color="#13ce66"
                            active-color="#ff4949" />
                    </template>
                </van-field>
                <div style="margin: 20px;">
                    <van-button round block type="info" native-type="submit">{{ $t(`dingding.submit`)}}</van-button>
                </div>
            </van-form>
        </van-action-sheet>

        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker type="datetime" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import ChangeLan from '@/components/changeLan/index.vue'
import { keyNews, deleteKeyNewById, updateKey } from '@/api/dingding'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {
        ChangeLan
    },
    name: 'new-list',
    //props: {
    //  handA: {
    //    type: String,
    //    required: true
    //    default: '100'
    //  }
    //},
    data() {
        // 这里存放数据
        return {
            news: [],
            show: false,
            updateForm: {},
            showPicker: false,
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async getNews() {
            const { data: res } = await keyNews()
            console.log(res.data)
            if (res.code == 200) {
                this.news = res.data
            } else {
                this.$message({
                    type: 'fail',
                    message: '获取列表失败'
                })
            }
        },
        async deleteById(id) {
            const { data: res } = await deleteKeyNewById(id)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.getNews()
            }
        },
        update(item) {
            this.updateForm = item
            this.show = true
        },
        async onSubmit() {
            console.log('submit', this.updateForm);
            const { data: res } = await updateKey(this.updateForm)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '更新成功'
                })
                this.getNews()
                this.show = false
            } else {
                this.$message({
                    type: 'warn',
                    message: '更新失败'
                })
            }
        },
        onConfirm(time) {

            console.log(time)

            this.showPicker = false;
            var d = new Date(time);
            console.log(d.getHours())
            var standardTime = d.getFullYear()

            if ((d.getMonth() + 1) > 9) {
                standardTime = standardTime + "-" + (d.getMonth() + 1)
            } else {
                standardTime = standardTime + "-0" + (d.getMonth() + 1)
            }
            if (d.getDate() > 9) {
                standardTime = standardTime + "-" + d.getDate()
            } else {
                standardTime = standardTime + "-0" + d.getDate()
            }
            if (d.getHours() > 9) {
                standardTime = standardTime + "T" + d.getHours()
            } else {
                standardTime = standardTime + "T0" + d.getHours()
            }
            if (d.getMinutes() > 9) {
                standardTime = standardTime + ":" + d.getMinutes()
            } else {
                standardTime = standardTime + ":0" + d.getMinutes()
            }
            if (d.getSeconds() > 9) {
                standardTime = standardTime + ":" + d.getSeconds()
            } else {
                standardTime = standardTime + ":0" + d.getSeconds()
            }
            this.updateForm.expireTime = standardTime;
            return standardTime

        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getNews()
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
.news-container{
    background: #eee;
    height: 100vh;
}
</style>