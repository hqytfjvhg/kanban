import request from "@/utils/http"
import store from "@/store"

export function getAll(){
    return request({
        url:'/info_screen/show/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function getShowById(id){
    return request({
        url:'/info_screen/show/'+id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function insert(form){
    return request({
        url:'/info_screen/show/insert',
        method:'post',
        data:form,
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/show/batchAdd',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}


//select unexpiredShow noneed token
export function selectUnexpiredShow(){
    return request({
        url:'/info_screen/show/unexpiredShow',
        method:'get'
    })
}

export function updateIsExpire(id){
    return request({
        url:'/info_screen/show/updateIsExpire/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function updateShow(show){
    return request({
        url:'/info_screen/show/updateShow',
        method:'post',
        data:show,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/show/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}