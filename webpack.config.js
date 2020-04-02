const HtmlWebpackPlugin = require("html-webpack-plugin");
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;
const { isDebug } = require('./environment');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: "./app/index.js",
  ...(!isDebug && { mode: 'production' }),
  output: {
    path: __dirname + "/dist",
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      maxAsyncRequests: 20,
			// cacheGroups: { // not needed as current code is very less
			// 	commons: {
			// 		test: /[\\/]@material-ui[\\/]|[\\/]react[\\/]|[\\/]react-dom[\\/]|[\\/]react-router-dom[\\/]|[\\/]jquery[\\/]/,
			// 		name: 'vendors',
			// 		chunks: 'all'
			// 	}
			// }
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
    new CleanWebpackPlugin(),
    ...(!isDebug ? [new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        // threshold: 10240,
        minRatio: 0.8,
        cache: true,
    })]: []),
    ...(isDebug ? [new SourceMapDevToolPlugin({})] : []),
  ]
};
