import request from "@/utils/http"
import store from "@/store"


export function insert(form){
    return request({
        url:'/info_screen/return/add',
        method:'post',
        data:form,
        headers:{'token':store.getters.token}
    })
}

export function updateReturn(form){
    return request({
        url:'/info_screen/return/update',
        method:'post',
        data:form,
        headers:{'token':store.getters.token}
    })
}

export function getReturnRecord(){
    return request({
        url:'/info_screen/return/list',
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getProducts(){
    return request({
        url:'/info_screen/return/products',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/return/batch',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}


export function selectAllPaged(page){
    return request({
        url:'/info_screen/return/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/return/delete/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}