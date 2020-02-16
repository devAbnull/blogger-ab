const HtmlWebpackPlugin = require("html-webpack-plugin");
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = {
  entry: "./app/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new SourceMapDevToolPlugin({})
  ]
};
