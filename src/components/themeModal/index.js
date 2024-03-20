import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';
import {Modal} from "antd";
import {setColorPrimary} from "@/store/slice/theme";
import {globalConfig} from "@/globalConfig";
import "@/components/themeModal/themeModal.scss";
import React from "react";
function CheckCircleFilled(props) {
    return null;
}
//主题色选择对话框组件
function ThemeModal({onClose}){
    //获取redux钩子
    const dispatch = useDispatch();
    //获取store中的主体配置
    const theme = useSelector((state) => state.theme);
    return (
    <Modal
        className='M-themeModal'
        open={true}
        title="主题色"
        onCancel={()=>{
            onClose()
        }}
        maskClosable={false}
        footer={null}
        >
        <div className="colors-con">
            {
                // 遍历globalConfig配置的customColorPrimarys主题色
                globalConfig.customColorPrimarys &&
                globalConfig.customColorPrimarys.map((item, index) => {
                    return (
                        <div
                            className="theme-color"
                            style={{ backgroundColor: item }}
                            key={index}
                            onClick={() => {
                                dispatch(setColorPrimary(item))
                            }}
                        >
                            {
                                // 如果是当前主题色，则显示“对勾”图标
                                theme.colorPrimary === item && (
                                    <CheckCircleFilled
                                        style={{
                                            fontSize: 28,
                                            color: '#fff',
                                        }}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    </Modal>
        )
}

export default ThemeModal