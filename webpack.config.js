const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require("autodll-webpack-plugin");

module.exports = (env = {}) => {
    return {
        entry: './src/index.js',
        output: {
            filename: './bundle.js',
            path: path.resolve(__dirname, 'bundle'),
        },
        resolve: {
            extensions: ['.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: true,
                filename: "index.html",
            }),
            ...(env.dll ? [new AutoDllPlugin({
                inject: true,
                inherit: true,
                filename: '[name]_[hash].js',
                debug: true,
                entry: {
                    vendor_dll: ['jquery']
                },
            })] : []),
        ],
        devtool: 'cheap-module-source-map',
        // devtool: 'cheap-source-map',
        // devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, "bundle")
        }
    };
};