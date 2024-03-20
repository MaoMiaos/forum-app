import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你也可以将错误日志上报给服务器
        console.error("Error in ErrorBoundary:", error, errorInfo);

        // 如果你想在控制台中看到错误，请取消下面这行的注释
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 你可以渲染任何自定义的后备 UI
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;