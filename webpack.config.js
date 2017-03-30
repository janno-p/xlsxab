var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "eval-source-map",
    entry: "./src/main/index.ts",
    output: {
        filename: "./dist/index.js"
    },
    resolve: {
        extensions: [".js", ".json", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.join(__dirname, "src")],
                use: "ts-loader"
            }
        ]
    },
    target: "electron-main",
    devServer: {
        overlay: true
    }
}