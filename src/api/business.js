import instance from '@/utils/request.js'
function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        // 注意点get请求是用params这个参数
           //params: params  
           params
    })
}
function addBusinessData(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        // 注意点get请求是用params这个参数
           //params: params  
           data
    })
}
function deleBusinessData(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        // 注意点get请求是用params这个参数
           //params: params  
           data
    })
}
function setBusinessStayus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        // 注意点get请求是用params这个参数
           //params: params  
           data
    })
}
function editBusinessStayus(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        // 注意点get请求是用params这个参数
           //params: params  
           data
    })
}
export { getBusinessData,addBusinessData,deleBusinessData,setBusinessStayus,editBusinessStayus}