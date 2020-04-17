import instance from '@/utils/request.js'
function getUserList(params) {
    return instance({
        url: "/user/list",
        method: "get",
        // 注意点get请求是用params这个参数
        params      //params: params   
    })
}
function addUserList(data) {
    return instance({
        url: "/user/add",
        method: "post",
        // 注意点get请求是用params这个参数
        //params: params  
        data
    })
}
function deleUserList(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        // 注意点get请求是用params这个参数
        //params: params  
        data
    })
}
function setUserList(data) {
    return instance({
        url: "/user/status",
        method: "post",
        // 注意点get请求是用params这个参数
        //params: params  
        data
    })
}
function editUserList(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        // 注意点get请求是用params这个参数
        //params: params  
        data
    })
}

export { getUserList, editUserList, setUserList, deleUserList, addUserList }