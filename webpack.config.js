const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        filename: "bundle[contenthash].js",
        path: path.resolve(__dirname, "docs"),
        clean: true,
        assetModuleFilename: "[name][ext]"
    },

    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "docs")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "hepworth.design",
            filename: "index.html",
            template: "src/template.html",
        }),

        new CopyPlugin(
            { 
              patterns: [
                { from: 'src/assets', to: 'assets' },
              ]
            }
          )    ]
};