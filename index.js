const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const webpackConfig = require("./webpack.config");
const models = require('./server/models');
const Blogs = mongoose.model('blogs');
const MONGO_URI = 'mongodb+srv://dbUser:********@cluster0-5dv6u.mongodb.net/blogDb?retryWrites=true&w=majority';

if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());

// app.get('/addBlog', (req, res) => { test for adding blog
//   console.log('adding new blog');
//   (new Blogs({ title: 'Blog 1', content:'title for first blog' })).save();
//   res.send('added blog succesfully');
// });

app.use(history());

// app.use(webpackMiddleWare(webpack(webpackConfig)));

app.listen(8000, () => {
  console.log("Listening");
});

module.exports = app;
