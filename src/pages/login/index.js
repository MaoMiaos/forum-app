import { Button, Input } from 'antd'
import imgLogo from './images/login.png'
import {useNavigate} from 'react-router-dom'
import React from "react";
import './login.scss'
//
function Login() {
    // 创建路由钩子
    const navigate =  useNavigate()
    return (
        <div className="P-login">
            <img src={imgLogo} alt="" className="logo" />
            <div className="ipt-con">
                <Input placeholder="账号" />
            </div>
            <div className="ipt-con">
                <Input.Password placeholder="密码" />
            </div>
            <div className="ipt-con">
                <Button type="primary" block={true} onClick={()=>{navigate('/home')}}>登录</Button>
            </div>
        </div>
    )
}

export default Login