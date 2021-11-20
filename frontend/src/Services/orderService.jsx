import http from './httpService'

export const getOrderDetails = (order_id) => {
    return http.getMethod(`/api/v1/order/${order_id}`, false)
}
export function getOrderHistory(user_id) {
    return http.getMethod(`/api/v1/orderHistory/${user_id}`, false)
}

export const addOrder = (data) => {
    return http.postMethod(`/api/v1/addOrder`, data)
}

export default {
    getOrderHistory,
    addOrder
}