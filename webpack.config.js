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
                enforce: "pre",
                exclude: /node_modules/,
                test: /\.ts$/,
                use: {
                    loader: "tslint-loader",
                    options: {
                        emitErrors: true
                    }
                }
            },
            {
                test: /\.ts$/,
                include: [path.join(__dirname, "src")],
                use: "awesome-typescript-loader"
            }
        ]
    },
    target: "electron-main",
    devServer: {
        overlay: true
    }
}