import { createSlice } from '@reduxjs/toolkit'
import { globalConfig } from '@/globalConfig'

/**
 * 先从localStorage里获取主题配置
 * 这么做是为了将用户的主题配置保存在浏览器中，用户在刷新或者重新打开该项目的时候，会直接应用之前设置的主题配置。
 * 如果localStorage没有主题配置
 * 则从globalConfig读取默认值，然后再写入localStorage
 * 这种情况一般是用户使用当前浏览器第一次浏览该项目时会用到。
 * setDark用来设置“亮色/暗色主题”，setColorPrimary用来设置“主题色”
 * 每次设置后，除了变更store里的值（为了项目全局动态及时生效）
 * 还要同步写入localStorage（为了刷新或重新打开时及时生效）。
 * “亮色/暗色主题”和“主题色”虽然都是颜色改变，但是完全不同的两个维度的换肤。
 * “亮色/暗色主题”主要是对默认的文字、背景、边框等基础元素进行黑白切换
 * 而“主题色”则是对带有“品牌色”的按钮等控件进行不同色系的颜色切换。
    */
// 先从localStorage里获取主题配置
const sessionTheme = JSON.parse(window.localStorage.getItem(globalConfig.SESSION_LOGIN_THEME))

// 如果localStorage里没有主题配置，则使用globalConfig里的初始化配置
const initTheme =  sessionTheme?sessionTheme: globalConfig.initTheme

//该store分库的初始值
const initialState = {
    dark: initTheme.dark,
    colorPrimary: initTheme.colorPrimary
}

export const themeSlice = createSlice({
    // store分库名称
    name: 'theme',
    // store分库初始值
    initialState,
    reducers: {
        // redux方法：设置亮色/暗色主题
        setDark: (state, action) => {
            // 修改了store分库里dark的值（用于让全项目动态生效）
            state.dark = action.payload
            // 更新localStorage的主题配置（用于长久保存主题配置）
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_THEME, JSON.stringify(state))
        },
        // redux方法：设置主题色
        setColorPrimary: (state, action) => {
            // 修改了store分库里colorPrimary的值（用于让全项目动态生效）
            state.colorPrimary = action.payload
            // 更新localStorage的主题配置（用于长久保存主题配置）
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_THEME, JSON.stringify(state))
        },
    },
})

// 将setDark和setColorPrimary方法抛出
export const { setDark } = themeSlice.actions
export const { setColorPrimary } = themeSlice.actions

export default themeSlice.reducer