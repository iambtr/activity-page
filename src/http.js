import axios from "axios";

const get = (url, params = {}, hideLoading = false) => {
    return axios
        .get(url, { params: params })
        .then(response => response.data)
}
const post = (url, params = {}, hideLoading = false) => {
    return axios
        .post(url, JSON.stringify(params), { headers: { hideLoading } })
        .then(response => response.data)
}
const put = (url, params = {}, hideLoading = false) => {
    return axios
        .put(url, JSON.stringify(params))
        .then(response => response.data)
}
export {
    get, post, put
}
