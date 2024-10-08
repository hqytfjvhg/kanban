import request from "@/utils/http"
import store from "@/store"

export function queryAndPage(page){
    return request({
        url:'/info_screen/logOperation/list',
        method:'post',
        data:page,
        headers:{'tokne':store.getters.token}
    })
}