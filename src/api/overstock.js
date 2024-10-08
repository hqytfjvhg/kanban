import request from "@/utils/http"
import store from "@/store"


export function addOverstock(overstock){
    return request({
        url:'/info_screen/overstock/add',
        method:'post',
        data:overstock,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(overstockId){
    return request({
        url:'/info_screen/overstock/delete/' + overstockId,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function updateOverstock(overstock){
    return request({
        url:'/info_screen/overstock/update',
        method:'post',
        headers:{'token':store.getters.token},
        data:overstock
    })
}

export function getOverstocks(){
    return request({
        url:'/info_screen/overstock/list',
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getProducts(){
    return request({
        url:'/info_screen/overstock/products',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/overstock/batch',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/overstock/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}

