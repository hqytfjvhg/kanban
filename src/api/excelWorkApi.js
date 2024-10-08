/**
 * Excel协同API接口
 */
import request from "@/utils/http"

/**
 * 获取Excel整个表格数据
 * @param {*} gridKey 表格唯一标识符
 */
export function getExcelWorkData(gridKey) {
    return request.get(`/getExcelWorkData/${gridKey}`)
}

/**
* 手动保存整个Excel数据
* @param params 数据对象,存储两参数, gridKey: 表格唯一标识符, data: 调用luckysheet.toJson()的数据
 */
export function saveExcelWorkData(params) {
    return request.post('/info_screen/excelWork/save', params)
}