import store from "@/store";
import request from "@/utils/http";

//查询
export function getAllMachineType() {
  return request({
    url: "/info_screen/profitAndLossModel/getAllMachineType",
    method: "post",
    // headers: { token: store.getters.token },
  });
}

//新增机型盈亏数据
export function addMachineType(data) {
  return request({
    url: "/info_screen/profitAndLossModel/addMachineType",
    method: "post",
    // headers: { token: store.getters.token },
    data: data,
  });
}

//修改
export function updateMachineType(data) {
  return request({
    url: "/info_screen/profitAndLossModel/updateMachineType",
    method: "post",
    // headers: { token: store.getters.token },
    data: data,
  });
}

//删除
export function deleteMachineType(data) {
  return request({
    url: "/info_screen/profitAndLossModel/deleteMachineType",
    method: "DELETE",
    // headers: { token: store.getters.token },
    data: data,
  });
}
