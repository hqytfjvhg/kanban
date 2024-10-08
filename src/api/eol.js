import request from "@/utils/http"
import store from "@/store"

export function add(eol){
    return request({
        url:'/info_screen/eol/add',
        method:'post',
        data:eol,
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(eols){
    return request({
        url:'/info_screen/eol/batchAdd',
        method:'post',
        data:eols,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/eol/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function update(eol){
    return request({
        url:'/info_screen/eol/update',
        method:'put',
        data:eol,
        headers:{'token':store.getters.token}
    })
}

export function list(){
    return request({
        url:'/info_screen/eol/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}