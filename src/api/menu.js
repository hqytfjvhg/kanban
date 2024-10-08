import request from "@/utils/http";
import store from "@/store";

//获取菜单
export function getMenuList() {
  return request({
    url: "/info_screen/menu/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

export function getMenuListById(id) {
  return request({
    url: "/info_screen/menu/list/" + id,
    method: "get",
    headers: { token: store.getters.token },
  });
}

//添加菜单
export function addMenu(form) {
  return request({
    url: "/info_screen/menu/add",
    method: "post",
    headers: { token: store.getters.token },
    data: form,
  });
}

//update
export function updateMenu(form) {
  return request({
    url: "/info_screen/menu/update",
    method: "put",
    headers: { token: store.getters.token },
    data: form,
  });
}

//delete
export function deleteMenu(id) {
  return request({
    url: "/info_screen/menu/delete/" + id,
    method: "delete",
    headers: { token: store.getters.token },
  });
}
