const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        //   {
        //     test: /\.png$/i,
        //     use: ['file-loader'],
        //   },
        ],
      },


    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs")
    },
};