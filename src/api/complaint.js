import request from "@/utils/http"
import store from "@/store"

export function add(complaint){
    return request({
        url:'/info_screen/complaint/add',
        data:complaint,
        method:'post',
        headers: {'token': store.getters.token},
    })
}

export function batchAdd(complaints){
    return request({
        url:'/info_screen/complaint/batchAdd',
        data:complaints,
        method:'post',
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/complaint/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function update(complaint){
    return request({
        url:'/info_screen/complaint/update',
        method:'put',
        data:complaint,
        headers:{'token':store.getters.token}
    })
}

export function get(id){
    return request({
        url:'/info_screen/complaint/get/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function list(){
    return request({
        url:'/info_screen/complaint/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/complaint/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}