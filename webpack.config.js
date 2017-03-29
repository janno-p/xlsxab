var webpack = require("webpack");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/index.js"
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    target: "electron"
}