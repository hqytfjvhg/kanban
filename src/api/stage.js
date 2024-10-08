import request from "@/utils/http"
import store from "@/store"

export function add(form){
    return request({
        url:'/info_screen/stage/add',
        method:'post',
        data:form,
        headers: {'token': store.getters.token},
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/stage/delete/' + id,
        method:'delete',
        headers: {'token':store.getters.token}
    })
}

export function getStages(){
    return request({
        url:'/info_screen/stage/list',
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getProducts(){
    return request({
        url:'/info_screen/stage/products',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/stage/batch',
        method:'post',
        data: list,
        headers:{'token':store.getters.token}
    })
}

export function updateStage(stage){
    return request({
        url:'/info_screen/stage/update',
        method:'put',
        data:stage,
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/stage/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}