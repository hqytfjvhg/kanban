import request from "@/utils/http"

export function getStage(){
    return request({
        url:'/info_screen/stage/list',
        method:'get'
    })
}

export function selectProjectCalendar(){
    return request({
        url:'/info_screen/project/list',
        method:'get'
    })
}

 export function getOverstock(){

    return request({
        url:'/info_screen/overstock/list',
        method:'get'
    })
 }

 export function getSalesRanking(){
    return request({
        url:'/info_screen/sale/list',
        method:'get'
    })
}
