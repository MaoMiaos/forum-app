import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from '@/router'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import '@/common/styles/global.scss'
import ErrorBoundary from '@/router/ErrorBoundary'
import {Provider} from "react-redux";
import {store} from '@/store'
import '@/mock'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
    <ConfigProvider locale={zhCN}>
        <ErrorBoundary>
            <RouterProvider router={globalRouters} />
        </ErrorBoundary>
    </ConfigProvider>
    </Provider>
)