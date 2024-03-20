import React from "react";
import {Outlet, useLocation} from 'react-router-dom'
import Header from '@/components/header'
import './entry.scss'
import {useSelector} from "react-redux";
import {ConfigProvider, theme} from "antd";
import {PrivateRoute} from "@/router";

function Entry() {

    //获得路由钩子
    const location = useLocation()


    const { darkAlgorithm, defaultAlgorithm } = theme
    // 获取store中的主题配置

    // 注意这里的theme是来自于Ant Design的，而不是store
    const globalTheme = useSelector((state)=>state.theme)
    // Ant Design主题变量
    // darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
    let antdTheme = {
        algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    }

    //应用自定义主题色
    if(globalTheme.colorPrimary){
        antdTheme.token = {
            colorPrimary: globalTheme.colorPrimary,
        }
    }

    return (
        <PrivateRoute>
        <ConfigProvider theme={antdTheme}>
        <div className="M-entry">
            <Header title={location.pathname}/>
            <div className="main-container">
                //二级路由
                <Outlet />
            </div>
        </div>
        </ConfigProvider>
        </PrivateRoute>
    )
}

export default Entry