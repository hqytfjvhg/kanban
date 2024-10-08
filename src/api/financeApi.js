/**
 * 新版财务接口API
 */
import request from "@/utils/http"

/**
 * 获取总体财务预算表格数据
 */
export function getOverallFinancialBudgetTableData() {
    return request.get(`/info_screen/finance/v2/getOverallFinancialBudgetTableData`)
}

/**
 * 获取销售状况表格数据
 */
export function getSalesStatusTableData() {
    return request.get(`/info_screen/finance/v2/getSalesStatusTableData`)
}

/**
 * 获取月度销售趋势表格数据
 */
export function getMonthlySalesTrendTableData() {
    return request.get(`/info_screen/finance/v2/getMonthlySalesTrendTableData`)
}

/**
 * 获取部门费用预算汇总表格数据
 */
export function getDepartmentExpenseBudgetSummaryTableData() {
    return request.get(`/info_screen/finance/v2/getDepartmentExpenseBudgetSummaryTableData`)
}

/**
 * 获取部门费用月度趋势表格数据
 */
export function getMonthlyTrendOfDepartmentalExpensesTableData() {
    return request.get(`/info_screen/finance/v2/getMonthlyTrendOfDepartmentalExpensesTableData`)
}

/**
 * 获取余额状况表格数据
 */
export function getBalancePositionTableData() {
    return request.get(`/info_screen/finance/v2/getBalancePositionTableData`)
}

/**
 * 获取采购月度趋势Excel表格数据
 */
export function getPurchasingMonthlyTrendTableData() {
    return request.get(`/info_screen/finance/v2/getPurchasingMonthlyTrendTableData`)
}

/**
 * 获取现金流情况Excel表格数据
 */
export function getCashFlowSituationTableData() {
    return request.get(`/info_screen/finance/v2/getCashFlowSituationTableData`)
}