import request from "@/utils/http";
import store from "@/store";

//finance
export function saveBatchCore(all) {
  return request({
    url: "/info_screen/fdAll/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listCore() {
  return request({
    url: "/info_screen/fdAll/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

export function saveBatchSaleStatus(all) {
  return request({
    url: "/info_screen/fdSaleStatus/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listSaleStatus() {
  return request({
    url: "/info_screen/fdSaleStatus/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

export function saveBatchSaleMonth(all) {
  return request({
    url: "/info_screen/fdSaleMonth/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listSaleMonth() {
  return request({
    url: "/info_screen/fdSaleMonth/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

//department
export function saveBatchDeptAll(all) {
  return request({
    url: "/info_screen/fdDeptAll/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listDeptAll() {
  return request({
    url: "/info_screen/fdDeptAll/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

export function saveBatchDeptMonth(all) {
  return request({
    url: "/info_screen/fdDeptMonth/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listDeptMonth() {
  return request({
    url: "/info_screen/fdDeptMonth/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

//money
export function saveBatchBalance(all) {
  return request({
    url: "/info_screen/fdBalance/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listBalance() {
  return request({
    url: "/info_screen/fdBalance/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

export function saveBatchPurchase(all) {
  return request({
    url: "/info_screen/fdPurchase/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listPurchase() {
  return request({
    url: "/info_screen/fdPurchase/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}

//资源url是后端请求的地址？
export function saveBatchCash(all) {
  return request({
    url: "/info_screen/fdCash/saveBatch",
    data: all,
    method: "post",
    headers: { token: store.getters.token },
  });
}

export function listCash() {
  return request({
    url: "/info_screen/fdCash/list",
    method: "get",
    headers: { token: store.getters.token },
  });
}
