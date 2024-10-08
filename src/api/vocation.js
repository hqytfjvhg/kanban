import request from "@/utils/http"
import store from "@/store"

export function getAreaVocations(){
    return request({
        url:'/info_screen/vocation/areaVocations',
        method:'get',
        //headers:{token:store.getters.token}
    })
}

export function getVocationDates(){
    return request({
        url:'/info_screen/vocation/vocationDates',
        method:'get',
        headers:{token:store.getters.token}
    })
}

export function addVacationDate(addForm){
     return request({
        url:'/info_screen/vocation/date/add',
        method:'post',
        data:addForm,
        headers:{token:store.getters.token}
     })
}

export function queryAndPage(page){
    return request({
        url:'/info_screen/vocation/list/paged',
        method:'post',
        data:page,
        headers:{token:store.getters.token}
    })
}

export function deleteVacationConnection(vacationTypeId,vacationDateId){
    return request({
        url:'/info_screen/vocation/delete/'+vacationTypeId+'/'+vacationDateId,
        method:'delete',
        headers:{token:store.getters.token}
    })
}