var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "eval-source-map",
    entry: "./src/renderer/index.ts",
    output: {
        filename: "./dist/renderer.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".vue"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.join(__dirname, "src")],
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader"
                }
            }
        ]
    },
    target: "electron-renderer",
    devServer: {
        overlay: true
    }
}