import { getRole } from '@/api/role'
import store from '..'
import router from '@/route'

const state = {
    role: localStorage.getItem("role")==null ?[]:localStorage.getItem("role").split(','),
    menus: [],
}

const mutations = {
    SET_ROLE: (state, role) => {
        state.role = role
    },
    SET_MENUS: (state, menus) => {
        state.menus = menus
    },
}


const actions = {
    getRoleAction({ commit }) {
        return new Promise((resolve, reject) => {
            getRole().then(
                res => {
                    if (res.data.code == 200) {
                        console.log(res.data)
                        var role = []
                        var menus = []
                        role = res.data.data.roles
                        menus = res.data.data.menuTreeList
                        commit('SET_ROLE', role)
                        commit('SET_MENUS', menus)
                        localStorage.setItem("role", role.join(","))
                        // localStorage.setItem("menus",menus)
                        resolve(role)
                    } else {
                        store.dispatch('user/resetAction')
                        router.push('/info_screen/login')
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}