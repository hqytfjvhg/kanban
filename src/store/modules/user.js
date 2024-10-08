import { login } from '@/api/user'
//import router from '@/route'


const state = {
    token: localStorage.getItem("token")==null ? '':localStorage.getItem("token"),
    login_time: localStorage.getItem("login_time")==null ? '':localStorage.getItem("login_time"),
    username: localStorage.getItem("username")==null ? '':localStorage.getItem("username"),
    avatar:localStorage.getItem("avatar")==null ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':localStorage.getItem("avatar")
}

const mutations = {
    SET_TOKEN: (state,token) =>{
        state.token = token
    },
    SET_LOGIN_TIME: (state,login_time) =>{
        state.login_time = login_time
    },
    SET_USERNAME:(state,username) =>{
        state.username = username
    },
    SET_AVATAR:(state,avatar) =>{
        state.avatar = avatar
    }

}


const actions = {
    loginAction({commit},userForm){
        return new Promise((resolve, reject) => {
           login(userForm).then(
            res =>{
                if(res.data.code == 200){
                    const login_time = new Date().getTime()
                    commit('SET_TOKEN',res.data.data.token)
                    commit('SET_LOGIN_TIME',login_time)
                    commit('SET_USERNAME',res.data.data.username)
                    localStorage.setItem("token",res.data.data.token)
                    localStorage.setItem("username",res.data.data.username)
                    localStorage.setItem("login_time",login_time)
                    if(res.data.data.avatar != ''&&res.data.data.avatar!=undefined){
                        commit('SET_AVATAR',res.data.data.avatar)
                        localStorage.setItem("avatar",res.data.data.avatar)
                    }
                  }
                  resolve(res)
                }).catch(err =>{
                    reject(err)
                })      
        })
    },
    
    resetAction({commit}){
        return new Promise(() =>{
            commit('SET_TOKEN','')
            commit('SET_LOGIN_TIME','')
            commit('SET_USERNAME','')
            commit('SET_AVATAR','')
            localStorage.removeItem('token')
            localStorage.removeItem('login_time')
            localStorage.removeItem('username')
            localStorage.removeItem('avatar')
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}