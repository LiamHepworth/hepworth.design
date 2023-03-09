const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: ['file-loader'],
          },
        ],
      },


    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs")
    },
};