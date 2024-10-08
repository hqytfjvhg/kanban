import request from "@/utils/http"
import store from "@/store"

export function generatorImage(award){
    return request({
        url:'/info_screen/awards//generator/image',
        method:'post',
        headers: {'token': store.getters.token},
        data:award,
        timeout:100 * 1000
    })
}

export function generatorImages(awards){
    return request({
        url:'/info_screen/awards//generator/images',
        method:'post',
        headers: {'token': store.getters.token},
        data:awards,
        timeout:200 * 1000
    })
}

export function batchSave(p2iObjects){
    return request({
        url:'/info_screen/awards/batch/save',
        method:'post',
        headers:{'token':store.getters.token},
        data:p2iObjects
    })
}

export function selectAll(){
    return request({
        url:'/info_screen/awards/all',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function selectAwardsStateIsTrue(type){
    return request({
        url:'/info_screen/awards/state/true/'+type,
        method:'get'
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/awards/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function changeState(id){
    return request({
        url:'/info_screen/awards/state/'+id,
        method:'put',
        headers:{'token':store.getters.token}
    })
}