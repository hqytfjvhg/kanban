import request from "@/utils/http"
import store from "@/store"

export function batchAdd(productTestings){
    return request({
        url:'/info_screen/productTesting/batchAdd',
        method:'post',
        data:productTestings,
        headers:{'token':store.getters.token}
    })
}

export function add(productTesting){
    return request({
        url:'/info_screen/productTesting/add',
        method:'post',
        data:productTesting,
        headers:{'token':store.getters.token}
    })
}

export function list(){
    return request({
        url:'/info_screen/productTesting/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function update(productTesting){
    return request({
        url:'/info_screen/productTesting/update',
        method:'put',
        data:productTesting,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/productTesting/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}