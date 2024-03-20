import {Button, Modal, theme} from 'antd'
import './home.scss'
import {useNavigate} from 'react-router-dom'
import React from "react";
import {goto, logout} from "@/api";

const {useToken} = theme;
import Header from "@/components/header";
function Home() {

    const navigate = useNavigate()

    //获取Design token
    const {token} = useToken()

    const [modal,contextHolder] = Modal.useModal()
    //退出登录
    const exit  = () => {
        modal.confirm({
            title: '是否退出登录？',
            content: '退出登录后，你将无法访问该系统',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                logout()
            }
        })
    }
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
                <Button type="primary" onClick={exit}>返回登录</Button>
            </div>
            {
                // 这是最终解决Modal.method跟随换肤的关键
                // contextHolder在组件DOM中随便找个地方放就行
                contextHolder
            }
        </div>
    )
}

export default Home