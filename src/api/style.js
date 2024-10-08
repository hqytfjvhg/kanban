import request from "@/utils/http"
import store from "@/store"


//1-company 2-marketing 3-sts
export function getStyle(){
  return request({
    url:'/info_screen/clockStyle/list',
    method:'get'
  })
}

export function getStyleByScreenId(screenId){
  return request({
    url:'/info_screen/clockStyle/list/'+screenId,
    method:'get'
  })
}


export function getStyleById(styleId){
  return request({
    url:'/info_screen/clockStyle/'+styleId,
    method:'get',
    headers: {'token': store.getters.token}
  })
}

export function getListByScreenId(screenId){
   return request({
    url:'/info_screen/clockStyle/list/'+screenId,
    method:'get',
    headers: {'token': store.getters.token}
   })
}

export function updateStyle(style){
  return request({
    url:'/info_screen/clockStyle/update',
    method:'post',
    data:style,
    headers: {'token': store.getters.token}
  })
}

export function addStyle(style){
  return request({
    url:'/info_screen/clockStyle/add',
    method:'post',
    data:style,
    headers: {'token': store.getters.token}
  })
}

export function changeStyleStatuToOne(clockStyleId,screenId){
  return request({
    url:'/info_screen/clockStyle/statu/' + clockStyleId + '/update/' + screenId,
    method:'get',
    headers: {'token': store.getters.token}    
  })
}