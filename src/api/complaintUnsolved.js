import request from "@/utils/http"
import store from "@/store"

export function add(complaintUnsolved){
    return request({
        url:'/info_screen/complaintUnsolved/add',
        data:complaintUnsolved,
        method:'post',
        headers: {'token': store.getters.token},
    })
}

export function batchAdd(complaintUnsolveds){
    return request({
        url:'/info_screen/complaintUnsolved/batchAdd',
        data:complaintUnsolveds,
        method:'post',
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/complaintUnsolved/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function update(complaintUnsolved){
    return request({
        url:'/info_screen/complaintUnsolved/update',
        method:'put',
        data:complaintUnsolved,
        headers:{'token':store.getters.token}
    })
}

export function get(id){
    return request({
        url:'/info_screen/complaintUnsolved/get/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function list(){
    return request({
        url:'/info_screen/complaintUnsolved/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/complaintUnsolved/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}