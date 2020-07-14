import instance from '@/utils/request.js'
function questionlist(params) {
    return instance({
        url: "/question/list",
        method: 'get',
        params,

    })
}
function addquestionlist(data) {
    return instance({
        url: "/question/add",
        method: 'post',
        data,

    })
}
function removequestionlist(data) {
    return instance({
        url: "/question/remove",
        method: 'post',
        data,

    })
}
function statusquestionlist(data) {
    return instance({
        url: "/question/status",
        method: 'post',
        data,

    })
}
function editquestionlist(data) {
    return instance({
        url: "/question/edit",
        method: 'post',
        data,

    })
}
export { questionlist,addquestionlist,removequestionlist,statusquestionlist ,editquestionlist}