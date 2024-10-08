import request from "@/utils/http"
import store from "@/store"

export function getAll(){
    return request({
        url:'/info_screen/keynew/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function getKeynewById(id){
    return request({
        url:'/info_screen/keynew/'+id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function insert(form){
    return request({
        url:'/info_screen/keynew/insert',
        method:'post',
        data:form,
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/keynew/batchAdd',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}

//select unexpiredNews noneed token
export function selectUnexpiredNews(){
    return request({
        url:'/info_screen/keynew/unexpiredNews',
        method:'get'
    })
}

export function updateIsExpire(id){
    return request({
        url:'/info_screen/keynew/updateIsExpire/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function updateKeyNew(keynew){
    return request({
        url:'/info_screen/keynew/updateKeyNew',
        method:'post',
        headers:{'token':store.getters.token},
        data:keynew
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/keynew/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}