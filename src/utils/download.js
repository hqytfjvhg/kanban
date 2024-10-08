/**
 * 下载文件工具类
 */
import request from './http'


const download = {
  /**
   * 下载文件
   * @param url 文件接口地址
   * @param fileName 文件名称
   * @return 返回一个Promise对象，用 then接受返回结果, 返回结果 true或者 false
   */
  downFile(url, fileName) {
    let s = request.get(url, {
      responseType: "blob"
    }).then((res) => {
      console.info('请求 blob结果', res)
      let url = window.URL.createObjectURL(res.data); // 创建一个临时的url指向blob对象
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      // 释放这个临时的对象url
      window.URL.revokeObjectURL(url);
      return true
    }).catch((err) => {
      console.error('下载文件异常，原因：', err)
      return false
    });
    return s
  }
}

export default download
