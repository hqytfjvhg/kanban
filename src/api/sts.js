import request from "@/utils/http"

export function getReturnTable(){
    return request({
        url:'/info_screen/return/unsolvedTable',
        method:'get'
    })
}

export function getAvgTicket(){
    return request({
        url:'/info_screen/ticket/avgTicket',
        method:'get'
    })
}

export function getUnsolvedTicket(){
    return request({
        url:'/info_screen/ticket/unsolvedTicket',
        method:'get'
    })
}

export function getStage(){
    return request({
        url:'/info_screen/stage/list',
        method:'get'
    })
}

export function getUrgentNotices(){
    return request({
        url:'/info_screen/urgentNotice/list/3',
        method:'get'
    })
}