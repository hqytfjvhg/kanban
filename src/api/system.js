import request from "@/utils/http";
import store from "@/store";

// 角色赋值
export function batchAddRole(data) {
  return request({
    url: "/info_screen/user/assignRole",
    method: "post",
    data,
    headers: {
      token: store.getters.token,
    },
  });
}

// 删除角色
export function deleteUser(userId) {
  return request({
    url: "/info_screen/user/delete/" + userId,
    method: "delete",
    headers: {
      token: store.getters.token,
    },
  });
}

export function saveUser(params) {
  return request({
    url: "/info_screen/user/save",
    method: "POST",
    data: params,
  });
}

export function updateUser(params) {
  return request({
    url: "/info_screen/user/update/v",
    method: "POST",
    data: params,
  });
}

export function getUserList(page) {
  return request({
    url: "/info_screen/user",
    method: "post",
    data: page,
    headers: {
      token: store.getters.token,
    },
  });
}

export function updateState(username, state) {
  return request({
    url: "/info_screen/user/state/" + username + "/" + state,
    method: "put",
    headers: {
      token: store.getters.token,
    },
  });
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: "/info_screen/role/list",
    method: "get",
    headers: {
      token: store.getters.token,
    },
  });
}

//获取菜单列表
export function getMenuList() {
  return request({
    url: "/info_screen/menu/list",
    method: "get",
    headers: {
      token: store.getters.token,
    },
  });
}

// 获取资源列表
export function getResourceList(condition) {
  return request({
    url: "/info_screen/resource/list",
    method: "post",
    data: condition,
    headers: {
      token: store.getters.token,
    },
  });
}

// 获取资源列表
export function getResourceListGroupByCategory(condition) {
  return request({
    url: "/info_screen/resource/list/category",
    method: "post",
    data: condition,
    headers: {
      token: store.getters.token,
    },
  });
}

//删除资源
export function deleteResourceById(id) {
  return request({
    url: "/info_screen/resource/delete/" + id,
    method: "delete",
    headers: {
      token: store.getters.token,
    },
  });
}

//更新资源
export function updateResource(data) {
  return request({
    url: "/info_screen/resource/update",
    method: "put",
    data: data,
    headers: {
      token: store.getters.token,
    },
  });
}

//新增资源分类
export function addResourceCategory(form) {
  return request({
    url: "/info_screen/resourceCategory/add",
    method: "post",
    data: form,
    headers: {
      token: store.getters.token,
    },
  });
}

//删除资源分类
export function deleteResourceCategoryById(id) {
  return request({
    url: "/info_screen/resourceCategory/delete/" + id,
    method: "delete",
    headers: {
      token: store.getters.token,
    },
  });
}

//更新资源分类
export function updateResourceCategory(form) {
  return request({
    url: "info_screen/resourceCategory/update",
    method: "put",
    data: form,
    headers: {
      token: store.getters.token,
    },
  });
}

//获取资源分类列表
export function getResourceCategories() {
  return request({
    url: "/info_screen/resourceCategory/list",
    method: "get",
    headers: {
      token: store.getters.token,
    },
  });
}

//新增资源
export function addResource(form) {
  return request({
    url: "/info_screen/resource/add",
    method: "post",
    data: form,
    headers: {
      token: store.getters.token,
    },
  });
}

//searchList
export function searchList() {
  return request({
    url: "/info_screen/resourceCategory/searchList",
    method: "get",
    headers: {
      token: store.getters.token,
    },
  });
}
