
<<<<<<< HEAD
import { Message } from 'element-ui'; 
import axios from 'axios'
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL ,
  withCredentials:true
=======
import { Message } from 'element-ui';
import axios from 'axios'
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
>>>>>>> login
});
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
<<<<<<< HEAD
  if (response.data.code==200) {
=======
  if (response.data.code == 200) {
>>>>>>> login
    return response.data;
  } else {
    Message.error(response.data.message)
    return Promise.reject("error")
  }
<<<<<<< HEAD
  
=======

>>>>>>> login
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
function gctphonecode(data) {
<<<<<<< HEAD
  return  instance({
        url:"/sendsms",
        method:'post',
      data,
        
    })
}
function register(data) {
  return  instance({
        url:"/register",
        method:'post',
      data,
        
    })
}
export { gctphonecode,register } 
// 在js中使用export 
=======
  return instance({
    url: "/sendsms",
    method: 'post',
    data,

  })
}
function register(data) {
  return instance({
    url: "/register",
    method: 'post',
    data,

  })
}
export { gctphonecode, register }
// 在js中使用export
>>>>>>> login

// - export { a}    export {b}   
// - 它是与import对应使用   import {a}  from "export js"
// - 它们二个之间就是一个解构赋值     {a}  =    {a,b}
// - 注意点：命名方面需要一样，export可以写多个