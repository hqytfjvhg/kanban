import request from "@/utils/http"
import store from "@/store"

export function getClockListByScreenId(screenId){
    return request({
        url:'/info_screen/clock/list/'+screenId,
        method:'get',
        headers: {'token': store.getters.token},
    })
}

export function getAllClock(condition){
    return request({
        url:'/info_screen/clock/all',
        method:'post',
        data:condition,
        headers: {'token': store.getters.token},
    })
}

export function update(clock){
    return request({
        url:'/info_screen/clock/update',
        method:'put',
        data:clock,
        headers:{'token':store.getters.token}
    })
}