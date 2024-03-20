import { Button } from 'antd'
import '@/pages/account/account.scss'
import React from "react";
import Header from "@/components/header";
function Account() {

    return (
        <div className="P-account">
            {/*<Header title="account" info={()=>{console.log('info:account')}} />*/}
            <h1>Account Page</h1>
            <div className="ipt-con">
                <Button type="primary">返回登录</Button>
            </div>
        </div>
    )
}

export default Account