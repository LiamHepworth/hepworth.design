const path = require("path")

module.exports = {
    mode: "development",

    entry: ["./src/index.js", "./src/styles/css/styles.css"],

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
            //     test: /\.svg$/,
            //     use: {
            //         loader: "svg-inline-loader",
            //         options: {
            //             name: "[name].[ext]",
            //             outputPath: "assets"
            //         }
            //     }
            //  },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[hash].[ext]",
            //             outputPath: "assets"
            //         }
            //     }
            // }
        ],
    },


    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs")
    },
};