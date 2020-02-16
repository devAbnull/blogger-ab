const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');

const webpackConfig = require("./webpack.config");

const app = express();
app.use(history());

app.use(webpackMiddleWare(webpack(webpackConfig)));

app.listen(8000, () => {
  console.log("Listening");
});

module.exports = app;
