import store from "@/store";
import request from "@/utils/http";


export function selectSujects(){
    return request({
        url:'/info_screen/project/subject',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

export function batchAdd(list){
    return request({
        url:'/info_screen/project/batch',
        method:'post',
        data:list,
        headers:{'token':store.getters.token}
    })
}


export function selectProjectItemQueryAndPage(page){
    return request({
        url:'/info_screen/project/item/list',
        method:'post',
        data:page,
        headers:{'token':store.getters.token}
    })
}

export function insertProjectItem(projectItem){
    return request({
        url:'/info_screen/project/item/insert',
        method:'post',
        data:projectItem,
        headers:{'token':store.getters.token}
    })
}

export function deleteProjectItemById(itemId){
    return request({
        url:'/info_screen/project/item/delete/'+itemId,
        method:'delete',
        headers:{'token':store.getters.token}
    })
}

export function updateProjectItem(projectItem){
    return request({
        url:'/info_screen/project/item/update',
        method:'put',
        data:projectItem,
        headers:{'token':store.getters.token}
    })
}