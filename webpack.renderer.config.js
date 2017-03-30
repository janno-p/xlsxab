var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "eval-source-map",
    entry: "./src/renderer/index.ts",
    output: {
        filename: "./dist/renderer.js"
    },
    resolve: {
        extensions: [".css", ".js", ".ts", ".vue"],
        modules: [
            "node_modules"
        ]
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
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: "file-loader"
            }
        ]
    },
    target: "electron-renderer",
    devServer: {
        overlay: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "index.css",
            disable: false,
            allChunks: true
        })
    ]
}