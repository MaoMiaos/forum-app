const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,// 禁用 sourceMap
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            //处理JS/JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // 处理 SCSS 文件，如果你有 SCSS 文件的话
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // 处理图片文件
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: './src/common/images'
            },
            // 处理字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: './src/common/fonts'
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname,'..', 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        compress: true, // 压缩
        port: 3000, // 端口
        open: true, // 自动打开浏览器
        hot: true, // 热模块替换
    }
};
