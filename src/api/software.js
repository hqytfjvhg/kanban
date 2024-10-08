import request from "@/utils/http"
import store from "@/store"

export function list(){
    return request({
        url:'/info_screen/software/list',
        method:'get',
        headers: {'token': store.getters.token}
    })
}

export function add(software){
    return request({
        url:'/info_screen/software/add',
        method:'post',
        data:software,
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(softwares){
    return request({
        url:'/info_screen/software/batchAdd',
        method:'post',
        data:softwares,
        headers:{'token':store.getters.token}
    })
}

export function get(id){
    return request({
        url:'/info_screen/software/'+id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/software/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function update(software){
    return request({
        url:'/info_screen/software/update',
        method:'put',
        data:software,
        headers:{'token':store.getters.token}
    })
}