const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const webpackConfig = require("./webpack.config");
const { typeDefs } = require('./server/schema');
const resolvers = require('./server/resolvers');
const Blogs = mongoose.model('blogs');
const { dbUser, dbPassword, dbUrl, port } = require('./environment');

const { ApolloServer, gql } = require('apollo-server-express');

const server = new ApolloServer({ typeDefs, resolvers });

const MONGO_URI = `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}?retryWrites=true&w=majority`;

if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

  server.applyMiddleware({ app });

app.use(bodyParser.json());

app.use(history());

// app.use(webpackMiddleWare(webpack(webpackConfig)));

app.listen(port, () => {
  console.log(`Server Listening...\n
  ****************************************
   🌎   Go to http://localhost:${port}/ \n\n
   🚀  GraphQL at http://localhost:${port}${server.graphqlPath}\n
   ****************************************
   `);
});

module.exports = app;
