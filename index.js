const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const bodyParser = require("body-parser");

const webpackConfig = require("./webpack.config");
const { typeDefs } = require('./server/schema');
const { AuthDirective } = require('./server/schemaDirectives');
const resolvers = require('./server/resolvers');
const Blogs = mongoose.model('blogs');
const { dbUser, dbPassword, dbUrl, port, adminPassword } = require('./environment');

const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server-express');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: ({ req }) => {
    return { authorization: req.headers.authorization };
  },
});

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
app.post('/admin/auth', bodyParser.urlencoded({ extended: false }), function (req, res) {
  const isAdminAuthenticated = req.body.password === adminPassword;
  res.send({ isAdminAuthenticated });
});
app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  res.set('Cache-Control', 'public,max-age=31536000');
  next();
});

app.use(webpackMiddleWare(webpack(webpackConfig)));
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'devAB'
}, app)
  .listen(port, () => {
    console.log(`Server Listening...\n
  ****************************************
   🌎   Go to http://localhost:${port}/ \n\n
   🚀  GraphQL at http://localhost:${port}${server.graphqlPath}\n
   ****************************************
   `);
  });

module.exports = app;
