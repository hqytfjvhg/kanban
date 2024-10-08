import request from "@/utils/http"
import store from "@/store"

export function add(monthOverstock){
    return request({
        url:'/info_screen/monthOverstock/add',
        method:'post',
        data:monthOverstock,
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(monthOverstocks){
    return request({
        url:'/info_screen/monthOverstock/batchAdd',
        method:'post',
        data:monthOverstocks,
        headers:{'token':store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/monthOverstock/delete/'+id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function update(monthOverstock){
    return request({
        url:'/info_screen/monthOverstock/update',
        method:'put',
        data:monthOverstock,
        headers:{'token':store.getters.token}
    })
}

export function list(){
    return request({
        url:'/info_screen/monthOverstock/list',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/monthOverstock/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}

export function get(id){
    return request({
        url:'/info_screen/monthOverstock/get/' + id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}