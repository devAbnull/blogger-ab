const HtmlWebpackPlugin = require("html-webpack-plugin");
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;
const { isDebug } = require('./environment');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: "./app/index.js",
  ...(!isDebug && { mode: 'production' }),
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  optimization: {
    splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
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
    ...(isDebug ? [new SourceMapDevToolPlugin({})] : []),
    ...(isDebug ? [new BrotliPlugin()]: []),
  ]
};
