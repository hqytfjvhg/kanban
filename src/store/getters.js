const getters = {
    token:state => state.user.token,
    login_time:state => state.user.login_time,
    role:state => state.role.role,
    menus:state => state.role.menus,
    username:state =>state.user.username,
    avatar:state => state.user.avatar
}

export default getters