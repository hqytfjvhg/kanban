import store from "@/store"
import request from "@/utils/http"

//get All
export function getMembers(){
    return request({
        url:'/info_screen/member/list',
        method:'get',
        headers:{token:store.getters.token}
    })
}

export function getMembersByClockId(clockId){
    return request({
        url:'/info_screen/member/list/'+clockId,
        method:'get',
        headers:{token:store.getters.token}
    })
}


export function insert(member){
    return request({
        url:'/info_screen/member/insert',
        method:'post',
        data:member,
        headers:{token:store.getters.token}
    })
}

export function updateStatu(memberId){
    return request({
        url:`/info_screen/member/statu/update/${memberId}`,
        method:'get',
        headers:{token:store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:`/info_screen/member/batchAdd`,
        method:'post',
        data:list,
        headers:{token:store.getters.token}
    })
}

export function batchUpdateStatu(clockId,memberIdList){
    return request({
        url:`/info_screen/member/statu/batchUpdate/${clockId}`,
        method:'post',
        data:memberIdList,
        headers:{token:store.getters.token}
    })
}

export function updateMember(member){
    return request({
        url:'/info_screen/member/update',
        method:'put',
        data:member,
        headers:{token:store.getters.token}
    })
}

export function deleteById(id){
    return request({
        url:'/info_screen/member/delete/' + id,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function updateTeam(clockId,memberIds){
    return request({
        url:'/info_screen/member/team/'+clockId,
        method:'post',
        data:memberIds,
        headers:{'token':store.getters.token}
    })
}

export function getMemberIds(clockId){
    return request({
        url:'/info_screen/member/memberIds/'+clockId,
        method:'get',
        headers:{'token':store.getters.token}
    })
}