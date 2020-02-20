// libraries
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// routes
import Blog from './pages/blog';
import BlogList from './pages/blogList';
import Home from './pages/home';
import CreateBlog from './pages/createBlog';

import "./app.scss";

const client = new ApolloClient();

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/blogList">
            <BlogList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
