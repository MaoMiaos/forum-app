import { createHashHistory } from 'history'
import {globalConfig} from "@/globalConfig";
import axios from "axios";
import {message, Modal} from "antd";

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

// 通过apiReqs把项目所有API进行统一管理。
export const apiReqs ={
    // 登录（成功后将登录信息存入localStorage）
    signIn:(config) =>{
        axios
            .post(API_DOMAIN + 'login', config.data)
            .then(res => {
                let result = res.data
                config.done && config.done(result)
                if (result.code === API_CODE.API_OK){
                    window.localStorage.setItem(
                        SESSION_LOGIN_INFO,
                        JSON.stringify(
                            {
                                uid: result.data.uid,
                                nickname: result.data.nickname,
                                token: result.data.token,
                            }
                        ))
                    config.success && config.success(result)
                }
                else {
                    config.fail && config.fail(result)
                }
            })
            .catch(()=>{
                config.done && config.done()
                config.fail && config.fail({
                    message: API_FAILED,
                })
                Modal.error({
                    title: '登录失败',
                })
            })
    },
    ///登出，登出后将登录信息从哪个localStorage删除
    signOut:() =>{
        const {uid,token} = getLocalLoginInfo()
        let headers ={
            loginUid:uid,
            'access-token': token,
        }
        let axiosConfig = {
            method: 'post',
            url: API_DOMAIN + 'logout',
            headers: headers,
        }
        axios(axiosConfig)
            .then((res) => {
                logout()
            })
            .catch(() => {
                logout()
            })
    },
    // 获取用户信息
    getUserList:(config)=>{
        config.method = 'get'
        config.url = API_DOMAIN + 'user/getUserList'
        apiRequest(config)
    },
    //修改用户信息
    modifyUser: (config) => {
        config.url = API_DOMAIN + 'user/modify'
        apiRequest(config)
    },
}

// 从localStorage获取用户信息
export function getLocalLoginInfo() {
    return JSON.parse(window.localStorage[SESSION_LOGIN_INFO])
}

// 退出登录
export function logout() {
    // 清除localStorage中的登录信息
    window.localStorage.removeItem(SESSION_LOGIN_INFO)
    //跳转Login界面
    history.push('/login')
}

/**
 * API请求封装（带验证信息）
 * config.history: [必填]用于页面跳转等逻辑
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 * apiRequest方法，实现统一的token验证、登录状态失效报错以及
 * 请求错误报错等业务逻辑
 */
export function apiRequest(config) {
    const loginInfo = JSON.parse(
        window.localStorage.getItem(SESSION_LOGIN_INFO)
    )
    if(config.data === undefined){
        config.data = {}
    }
    config.method = config.method || 'post'
    // 封装header信息
    let headers ={
        loginUid: loginInfo ? loginInfo.uid : null
        ,'access-token': loginInfo ? loginInfo.token : null
    }
    let data = null
    // 判断是否使用formData方式提交
    if (config.formData) {
        headers['Content-Type'] = 'multipart/form-data'
        data = new FormData()
        Object.keys(config.data).forEach(function (key) {
            data.append(key, config.data[key])
        })
    }
    else {
        data = config.data
    }

    //组装axios数据
    let axiosConfig = {
        method: config.method,
        url: config.url,
        headers: headers,
    }

    //判断是get还是post请求，并加入发送的数据
    if (config.method === 'get') {
        axiosConfig.params = data
    }
    else {
        axiosConfig.data = data
    }

    //发起请求
    axios(axiosConfig)
        .then((res) => {
            let result = res.data
            config.done && config.done()
            if (result.code === API_CODE.ERR_LOGOUT) {
                Modal.error({
                    title: result.message,
                    onOk: () => {
                        logout()
                    }
                })
            }
            else {
                config.success && config.success(result)
            }
        })
        .catch((err)=>{
            // 如果接口不通或出现错误，则弹出Antd的Modal对话框
            Modal.error({
                title: API_FAILED,
            })
            // 执行fail的回调
            config.fail && config.fail(err)
            // 执行done的回调
            config.done && config.done()
        })
}


