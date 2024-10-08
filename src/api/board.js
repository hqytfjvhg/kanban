/**
 * 看板接口
 */

import request from "@/utils/http"

//finance
export function alls(){
    return request({
        url:'/info_screen/board/finance/all',
        method:'get'
    })
}

export function outcomes(lang){
    return request({
        url:'/info_screen/board/finance/outcomes/' + lang,
        method:'get'
    })
}

export function saleMonth(lang){
    return request({
        url:'/info_screen/board/finance/saleMonth/' + lang,
        method:'get'
    })
}

export function incomes(lang){
    return request({
        url:'/info_screen/board/finance/incomes/' + lang,
        method:'get'
    })
}


export function saleRates(){
    return request({
    url:'/info_screen/board/finance/sale/rate',
    method:'get'
})
}

//dept
export function deptAll(lang){
    return request({
        url:'/info_screen/board/dept/all/' + lang,
        method:'get'
    })
}

export function deptMonth(lang){
    return request({
        url:'/info_screen/board/dept/month/'  + lang,
        method:'get'
    })
}

//money
export function purchase(lang){
    return request({
        url:'/info_screen/board/purchase/' + lang,
        method:'get'
    })
}

export function cash(lang){
    return request({
        url:'/info_screen/board/cash/' + lang,
        method:'get'
    })
}

export function balance(lang){
    return request({
        url:'/info_screen/board/balance/' + lang,
        method:'get'
    })
}

//clock
export function getClocksByScreenId(screenId){
    return request({
        url:'/info_screen/board/clock/'+screenId,
        method:'get',
    })
}

//member
export function getMembersByScreenId(screenId){
    return request({
        url:'/info_screen/board/member/'+screenId,
        method:'get'
    })
}

//award
export function getAwards(type){
    return request({
        url:'/info_screen/board/award/true/' + type,
        method:'get'
    })
}

//notices
export function getNotices(screenId){
    return request({
        url:'/info_screen/board/unexpired/notices/' + screenId,
        method:'get'
    })
}

//shows
export function getShows(){
    return request({
        url:'/info_screen/board/unexpired/show',
        method:'get'
    })
}

//int. news
export function getNews(){
    return request({
        url:'/info_screen/board/unexpired/news',
        method:'get'
    })
}

//productTestings
export function getProductTestings(){
    return request({
        url:'/info_screen/board/productTesting/list',
        method:'get'
    })
}

//software stages
export function getSoftwares(){
    return request({
        url:'/info_screen/board/software/list',
        method:'get'
    })
}

//project desc
export function getProjectDescs(){
    return request({
        url:'/info_screen/board/project/list',
        method:'get'
    })
}

//eol list
export function getEols(){
    return request({
        url:'/info_screen/board/eol/list',
        method:'get'
    })
}

//RMA
export function getReturns(){
    return request({
        url:'/info_screen/board/return/list',
        method:'get'
    })
}

//overstock
export function getOverstocks(){
    return request({
        url:'/info_screen/board/monthOverstock/list',
        method:'get'
    })
}

//prouct Stage
export function getProductStages(){
    return request({
        url:'/info_screen/board/productStage/list',
        method:'get'
    })
}

//complaints
export function getComplaints(){
    return request({
        url:'/info_screen/board/complaint/list',
        method:'get'
    })
}

//unsolved complaint
export function getUnsolvedComplaints(){
    return request({
        url:'/info_screen/board/complaintUnsolved/list',
        method:'get'
    })
}

//avgDays
export function getAvgDays(){
    return request({
        url:'/info_screen/board/avgDays',
        method:'get'
    })
}

export function setAvgDays(days){
    return request({
        url:'/info_screen/board/avgDays/'+days,
        method:'get'
    })
}

//returnDays
export function getReturnDays(){
    return request({
        url:'/info_screen/board/returnDays',
        method:'get'
    })
}

export function setReturnDays(days){
    return request({
        url:'/info_screen/board/returnDays/'+days,
        method:'get'
    })
}

//看板显示库存类型 ，1为数量，2为总价格
export function getMonthOverstockType(){
    return request({
        url:'/info_screen/board/monthOverstock/type',
        method:'get'
    })
}

export function setMonthOverstockType(type){
    return request({
        url:'/info_screen/board/monthOverstock/type/' + type,
        method:'get'
    })
}

