import axios from "axios";

console.log(process.env.VUE_APP_BASE_API, "地址");
const service = axios.create({
  // .env.development 和 .env.productiont
  // baseURL: 'https://votedv2-api.vip.cpolar.cn/vote', // url = base url + request url
  // baseURL: "http://192.168.1.150:15888/vote",
  baseURL: process.env.VUE_APP_BASE_API + "/vote",
  timeout: 10000, // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 正常响应
    const res = response.data;
    return res;
  },
  (error) => {
    // 响应异常
    return Promise.reject(error);
  }
);

export default service;
