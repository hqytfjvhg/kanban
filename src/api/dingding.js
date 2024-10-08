import request from "@/utils/http"

export function publishKeyNew(form){
    return request({
        url:'/info_screen/dd/key',
        data:form,
        method:'post'
    })
}


export function publishShowNew(form){
    return request({
        url:'/info_screen/dd/show',
        data:form,
        method:'post'
    })
}

export function publishUrgentNotice(form){
    return request({
        url:'/info_screen/dd/urgent',
        data:form,
        method:'post'
    })
}

//获取管理员列表
export function getUsers(){
    return request({
        url:'/info_screen/dd/admin',
        method:'get'
    })
}

//获取系统"通讯录"
export function members(){
    return request({
        url:'/info_screen/dd/members',
        method:'get'
    })
}

export function shows(){
    return request({
        url:'/info_screen/dd/show/list',
        method:'get'
    })
}

export function keyNews(){
    return request({
        url:'/info_screen/dd/key/list',
        method:'get'
    })
}

export function notices(){
    return request({
        url:'/info_screen/dd/notice/list',
        method:'get'
    })
}

//根据id删除
export function deleteShowById(id){
    return request({
        url:'/info_screen/dd/show/delete/' + id,
        method:'delete'
    })
}

export function deleteNoticeById(id){
    return request({
        url:'/info_screen/dd/notice/delete/' + id,
        method:'delete'
    })
}

export function deleteKeyNewById(id){
    return request({
        url:'/info_screen/dd/key/delete/' + id,
        method:'delete'
    })
}

export function updateKey(form){
    return request({
        url:'/info_screen/dd/key',
        method:'put',
        data:form
    })
}

export function updateShow(form){
    return request({
        url:'/info_screen/dd/show',
        method:'put',
        data:form
    })
}

export function updateUrgentNotice(form){
    return request({
        url:'/info_screen/dd/urgent',
        method:'put',
        data:form
    })
}