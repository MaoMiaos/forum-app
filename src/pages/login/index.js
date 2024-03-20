import { Button, Input } from 'antd'
import imgLogo from './images/login.png'
// import './login.scss'
import {useNavigate} from 'react-router-dom'
//
function Login() {
    // 创建路由钩子
    const navigate =  useNavigate()
    return (
        <div>
            <div className="P-login">
                <img src={imgLogo} alt="" className="logo" />
                <div className="ipt-con">
                    <Input placeholder="账号" />
                </div>
                <div className="ipt-con">
                    <Input.Password placeholder="密码" />
                </div>
                <div className="ipt-con">
                    <Button type="primary" onClick={() => navigate('/home')}>登录</Button>
                </div>
            </div>
        </div>

    )
}

export default Login