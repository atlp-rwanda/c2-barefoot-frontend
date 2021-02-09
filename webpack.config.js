const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config();

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode:  process.env.NODE_ENV || 'development',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        historyApiFallback: true,
        clientLogLevel: 'silent',
        inline: true,
        open: true,
        port: 3000,
        hot: true,
      },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
                
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
         }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template:path.resolve(__dirname,"public/index.html") , filename: 'index.html'}),        
        new webpack.DefinePlugin({
            'process.env': {
                REACT_APP_BACKEND_LINK: JSON.stringify(process.env.REACT_APP_BACKEND_LINK),
                IMAGE_UPLOAD_LINK: JSON.stringify(process.env.IMAGE_UPLOAD_LINK),
                UPLOAD_PRESET: JSON.stringify(process.env.UPLOAD_PRESET),
            }
        }),
    ],
};
