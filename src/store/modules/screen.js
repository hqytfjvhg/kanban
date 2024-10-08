import store from '..'
import router from '@/route'

const state = {
    isCollapse: localStorage.getItem("isCollapse") == null ? false : localStorage.getItem("isCollapse"),
}

const mutations = {
    SET_IS_COLLAPSE: (state, isCollapse) => {
        state.isCollapse = isCollapse
    }
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
    mutations
}