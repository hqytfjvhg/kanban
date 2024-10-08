import request from "@/utils/http";
import store from "@/store";

export function deleteData(id) {
  return request({
    url: `info_screen/role/delete/${id}`,
    method: "delete",
    headers: { token: store.getters.token },
  });
}

// update
export function update(data) {
  return request({
    url: "/info_screen/role/update",
    method: "put",
    data,
    headers: { token: store.getters.token },
  });
}

// 新增角色
export function add(data) {
  return request({
    url: "/info_screen/role/add",
    method: "post",
    data,
    headers: { token: store.getters.token },
  });
}

//获取菜单
export function getRole() {
  return request({
    url: "/info_screen/role",
    method: "get",
    headers: { token: store.getters.token },
  });
}

//根据roleId获取menuId
export function getMenuIdsByRoleId(roleId) {
  return request({
    url: "/info_screen/role/menuIds/" + roleId,
    method: "get",
    headers: { token: store.getters.token },
  });
}

//根据roleId获取resourceIds
export function getResourceIdsByRoleId(roleId) {
  return request({
    url: "/info_screen/role/resourceIds/" + roleId,
    method: "get",
    headers: { token: store.getters.token },
  });
}

//assign menus
export function assignMenusByRoleId(roleId, menuIds) {
  return request({
    url: "/info_screen/role/menu/" + roleId,
    method: "post",
    data: menuIds,
    headers: { token: store.getters.token },
  });
}

//assign resources
export function assignResourcesByRoleId(roleId, resourceIds) {
  return request({
    url: "/info_screen/role/resource/" + roleId,
    method: "post",
    data: resourceIds,
    headers: { token: store.getters.token },
  });
}

//根据roleId,获取资源列表
export function getResourcesByRoleId(roleId) {
  return request({
    url: "/info_screen/resource/list/category/" + roleId,
    method: "get",
    headers: { token: store.getters.token },
  });
}
