const path = require("path")

module.exports = {
    mode: "production",

    entry: ["./src/index.js"],

    devServer: {
        static: {
          directory: path.join(__dirname, 'docs'),
        },
        compress: true,
        port: 9000,
    },


    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     use: "file-loader"
            // },
        ],
    },

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs"),
        publicPath: '/'
    },
};