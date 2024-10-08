import request from "@/utils/http"
import store from "@/store"

export function addProduct(form){
    return request({
        url:'/info_screen/product/addProduct',
        method:'post',
        headers:{'token':store.getters.token},
        data:form
    })
}
export function updateProduct(form){
    return request({
        url:'/info_screen/product/updateProduct',
        method:'post',
        headers:{'token':store.getters.token},
        data:form
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/product/deleteProduct?id=' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function getData(show){
    return request({
        url:'/info_screen/product/getAllProduct?company='+show ,
        method:'get',
        headers: {'token': store.getters.token},
    })
}
