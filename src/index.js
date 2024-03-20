import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
// import App from './pages/account'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ConfigProvider locale={zhCN}>
        {/*<App />*/}
        <RouterProvider router={globalRouters} />
    </ConfigProvider>
)