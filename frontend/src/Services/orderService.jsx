import http from './httpService'

export function getOrderHistory(){
    return http.getMethod(`/api/v1/orderHistory`,false)
}

export default{
    getOrderHistory
}