import http from './httpService'

export function getModelList() {
    return http.getMethod(`/api/v1/model`, false)
}

export function getModelDetails(modelId) {
    return http.getMethod(`/api/v1/model/${modelId}`, false)
}

export function getModelSlots(modelId, date) {
    return http.getMethod(`/api/v1/modelSlot/${modelId}/${date}`)
}
export default {
    getModelList,
    getModelDetails,
    getModelSlots
}