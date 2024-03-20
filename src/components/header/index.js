import { Button, Card } from 'antd'
import {MoonOutlined, SunOutlined, ThemeOutlined} from '@/components/extraIcons'
import './header.scss'
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setDark} from "@/store/slice/theme";
import {globalConfig} from "@/globalConfig";
import ThemeModal from "@/components/themeModal";
function Header(props) {
    // 接收来自父组件的数据
    const {title,info} = props
    info && info()

    //是否显示主题色选择对话框
    const [showThemeModal, setShowThemeModal] = useState(false)
    // 获取redux派发钩子  useDispatch用于写入store库，调用store里定义的方法。
    const dispatch = useDispatch()
    //// 获取store中的主题配置   useSelector用于读取store库里的变量值。
    /**
     * theme就是从总库中获取的theme分库
   * theme.dark就是从theme分库中读取的dark值
   * 从而判断当前是亮色还是暗色主题
   * 进而确定是显示“月亮”按钮还是“太阳”按钮。
     */
    const theme = useSelector((state) => state.theme)

    return (
        <Card className="M-header">
            <div className="header-wrapper">
                <div className="logo-con">Header:{title}</div>
                <div className="opt-con">
                    {
                        theme.dark ? (
                            <Button
                                icon={<SunOutlined />}
                                shape="circle"
                                onClick={()=>
                                {dispatch(setDark(false))}
                            }></Button>
                        ):(
                            <Button
                                icon={<MoonOutlined />}
                                shape="circle"
                                onClick={()=>
                                {dispatch(setDark(true))}
                            }></Button>
                        )
                    }
                    {
                        globalConfig.customColorPrimarys &&
                            globalConfig.customColorPrimarys.length > 0 &&(

                                <Button
                                    icon={<ThemeOutlined />}
                                    shape="circle"
                                    onClick={()=>{
                                        setShowThemeModal(true)
                                    }}
                                ></Button>
                        )
                    }
                </div>
            </div>
            {
                //显示主题色换肤对话框
                showThemeModal && (
                    <ThemeModal
                        onClose={()=>{
                            setShowThemeModal(false)
                        }}
                    />
                )
            }
        </Card>
    )
}

export default Header