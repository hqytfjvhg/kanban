import request from "@/utils/http";
import store from "@/store";

export function login(userForm){
    return request({
        url:'/info_screen/login',
        method:'post',
        data:userForm
    })
}

export function register(userForm){
    return request({
        url:'/info_screen/register',
        method:'post',
        data:userForm,
        withCredentials:true
    })
}

export function getChptchaImg(){
    return request({
        url:'/info_screen/getCaptchaImg',
        method:'get'
    })
}

export function updateBase(userForm){
    return request({
        url:'/info_screen/user/update/base',
        method:'post',
        data:userForm,
        headers:{'token':store.getters.token}
    })
}

export function updatePassword(passwordForm){
    return request({
        url:'/info_screen/user/update/password',
        method:'post',
        data:passwordForm,
        headers:{'token':store.getters.token}
    })
}

export function getUserInfo(){
    return request({
        url:'/info_screen/user/info',
        method:'get',
        headers:{'token':store.getters.token}
    })
}

//发送验证码至邮箱
export function sendCodeToEmail(email){
    return request({
        url:'/info_screen/user/email/' + email,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

//绑定邮箱
export function bindEmail(email,code){
    return request({
        url:'/info_screen/user/email/' + email + '/' + code,
        method:'get',
        headers:{'token':store.getters.token}
    })
}

//忘记密码——发送邮件
export function sendCodeByUsername(username,email){
    return request({
        url:'/info_screen/user/password/' + username + '/' + email,
        method:'get'
    })
}

//忘记密码——重置密码
export function resetPassword(username,email,code,password){
    return request({
        url:'/info_screen/user/password/' + username + '/' + email + '/' + code + '/' + password,
        method:'get'
    })
}

