const path = require("path")
const webpack = require("webpack")

const config = (env, argv) => {
    console.log(argv.mode)
    console.log(env)
    const backend_url = (argv.mode === "production")
        ? "https://something-something-71177.herokuapp.com/api/blogs"
        : "http://localhost:3001/blogs"
    
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "main.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ["style-loader", "css-loader"]
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, "build"),
            compress: true,
            port: 3000
        },
        devtool: "source-map",
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
