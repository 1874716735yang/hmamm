import instance from '@/utils/request.js'
function getchartdata(data) {
    return instance({
        url: "/data/title",
        method: "post",
        // 注意点get请求是用data这个参数
        data      //params: params   
    })
}

export { getchartdata}