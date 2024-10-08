import request from "@/utils/http"
import store from "@/store"

export function getAllNotice(){
    return request({
        url:'info_screen/urgentNotice/list/all',
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getById(urgentNoticeId){
    return request({
        url:'info_screen/urgentNotice/'+urgentNoticeId,
        method:'get',
        headers: {'token': store.getters.token},
    })
}

//select unexpiredNotice noneed token
export function selectUnexpiredNotice(screenId){
    return request({
        url:'/info_screen/urgentNotice/unexpiredNotices/'+screenId,
        method:'get'
    })
}

export function updateIsExpire(id){
    return request({
        url:'/info_screen/urgentNotice/updateIsExpire/'+id,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function updateUrgentNotice(notice){
    return request({
        url:'/info_screen/urgentNotice/updateUrgentNotice',
        method:'post',
        headers:{'token':store.getters.token},
        data:notice
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/urgentNotice/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function insert(form){
    return request({
        url:'/info_screen/urgentNotice/add',
        method:'post',
        headers:{'token':store.getters.token},
        data:form
    })
}