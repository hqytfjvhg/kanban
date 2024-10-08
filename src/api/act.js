import request from '@/utils/actRequest';

export function getTicketResult() {
        return request({
                url: '/getVotingScore', 
                method: 'get'
        })
}

export function reBoot() {
        return request({
            url: `/reset`, // 访问到的是 public/xieyi.html
            method: 'get'
        })
}

export function setTeamId(data) {
        return request({
            url: `/setTeamId`, // 访问到的是 public/xieyi.html
            method: 'post',
            data
        })
}

/**
 * 获取一个唯一随机数，用于限制投票次数
 * @returns {code:200, data:随机数}
 */
export function getStoId() {
        return request({
            url: `/getStoId`,
            method: 'get'
        })
}

export function setState(data) {
        return request({
                url: '/setState',
                method: 'post',
                data
        })
}

/**
 * 投票
 * @returns 
 */
export function toTicket(data) {
        return request({
            url: `/voting`,
            method: 'post',
            data
        })
}

/**
 * 获取相同票数的团队id
 * @returns
 */
export function getTeamId() {
        return request({
            url: `/getTeamId`,
            method: 'get'
        })
}

/**
 * 获取相同票数的团队id
 * @returns
 */
export function getResult() {
        return request({
            url: `/getTeamId`,
            method: 'get'
        })
}
