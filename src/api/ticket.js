import request from "@/utils/http"
import store from "@/store"

export function getStoId(){
    return request({
        url:'/ifi/vote/getUUID',
        method:'get'
    })
}
 
// 重置
export function setTeamId(a, b, c){
    return request({
        url:'/ifi/vote/set/' + a + '/' + b + '/' + c,
        method:'get'
    })
}

// 重置
export function getTeamId(){
    return request({
        url:'/ifi/vote/get',
        method:'get'
    })
}

// 重置
export function reBoot(data){
    return request({
        url:'/ifi/vote/reset',
        method:'get',
        data
    })
}

// 投票
export function toTicket(data){
    return request({
        url:'/ifi/vote/add',
        method:'post',
        data
    })
}

// 获取投票结果
export function getTicketResult(){
    return request({
        url:'/ifi/vote/result',
        method:'get'
    })
}



export function getAllTicketRecords(){
    return request({
        url:'/info_screen/ticket/list',
        method:'get',
        headers: {'token': store.getters.token}
    })
}

export function addTicket(addForm){
    console.log(addForm)
    return request({
        url:'/info_screen/ticket/add',
        method:'post',
        data:addForm,
        headers: {'token': store.getters.token}
    })
}

export function delectById(ticketId){
    return request({
        url:'/info_screen/ticket/delete/'+ticketId,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function updateTicket(ticket){
    return request({
        url:'/info_screen/ticket/update',
        method:'post',
        headers:{'token':store.getters.token},
        data:ticket
    })
}

export function resolveTicket(resolveForm){
    return request({
        url:'/info_screen/ticket/resolve',
        method:'post',
        data:resolveForm,
        headers: {'token': store.getters.token}
    })
}

export function getResolveRecord(){
   return request({
    
   })
}

export function getAddRecords(){
   
}

export function getProductList(){
    return request({
        url:'/info_screen/ticket/products',
        method:'get',
        headers: {'token': store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/ticket/adds',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}

export function selectAllPaged(page){
    return request({
        url:'/info_screen/ticket/list/paged',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}



export function getTicketSum(area,product,type,days){
    return request({
        url:'/info_screen/ticket/sum/'+area + '/' +product + '/' + type + '/' + days,
        method:'get',
        headers:{'token':store.getters.token}
    })
}
