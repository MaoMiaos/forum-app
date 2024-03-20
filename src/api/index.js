import { createHashHistory } from 'history'
import {globalConfig} from "@/globalConfig";

let history = createHashHistory()

// 配合教程演示组件外路由跳转使用，无实际意义
export const goto = (path) => {
    history.push(path)
}

//开发环境地址
let API_DOMAIN = '/api/'
if (process.env.NODE_ENV === 'production') {
    API_DOMAIN = 'http://localhost:8080/api/'
}
export const SESSION_LOGIN_INFO =  globalConfig.SESSION_LOGIN_INFO

//API请求正常，数据正常
export const API_CODE = {
    // API请求正常
    API_OK: 200,
    // API请求正常，数据异常
    ERR_DATA: 403,
    // API请求正常，空数据
    ERR_NO_DATA: 301,
    // API请求正常，登录异常
    ERR_LOGOUT: 401,

}
// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试'
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录'

export const apiReqs ={
    // 登录（成功后将登录信息存入localStorage）
    signIn:(config) =>{
        axios
    }
}