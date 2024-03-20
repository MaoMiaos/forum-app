import {Button, theme} from 'antd'
import './home.scss'
import {useNavigate} from 'react-router-dom'
import React from "react";
import {goto} from "@/api";

const {useToken} = theme;
import Header from "@/components/header";
function Home() {

    const navigate = useNavigate()

    //获取Design token
    const {token} = useToken()
    /**
     * 这里将“Home Page”的文字色设为了token.colorText
     *   即当前Antd文本色，因此会跟随主题进行换肤
     * 同理，如果想让自定义组件的背景色换肤
     *   可以使用token.colorBgContainer
     *    边框色换肤，可以使用token.colorBorder
     *    使用当前Antd主题色，可以使用token.colorPrimary。
     */
    return (
        <div className="P-home">

            <h1 style={{color: token.colorBgContainer}}>Home Page</h1>
            <div className="ipt-con">
                <Button onClick={()=>{goto('/login')}}>组件外跳转</Button>
            </div>
            <div className="ipt-con">
                <Button type="primary" onClick={() => navigate('/login')}>Login</Button>
            </div>
        </div>
    )
}

export default Home