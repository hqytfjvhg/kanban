import request from "@/utils/http"
import store from "@/store"

export function insertSale(sale){
    return request({
        url:'/info_screen/sale/add',
        method:'post',
        data:sale,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(saleId){
    return request({
        url:'/info_screen/sale/delete/' + saleId,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function updateSale(sale){
    return request({
        url:'/info_screen/sale/update',
        method:'post',
        data:sale,
        headers:{'token':store.getters.token}
    })
}

export function getSales(){
    return request({
        url:'/info_screen/sale/list',
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getProducts(){
    return request({
        url:'/info_screen/sale/products',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/sale/batch',
        data:list,
        method:'post',
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/sale/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}