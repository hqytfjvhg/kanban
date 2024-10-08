import request from "@/utils/http"
import store from "@/store"

export function list(){
    return request({
        url:'/info_screen/excel/template/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function update(excelTemplate){
    return request({
        url:'/info_screen/excel/template/update',
        method:'post',
        data:excelTemplate,
        headers:{'token':store.getters.token}
    })
}