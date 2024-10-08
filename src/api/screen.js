import request from "@/utils/http";

export function getScreen(screenId){
    return request({
        url:'/info_screen/screen/' + screenId,
        method:'get'
    })
}