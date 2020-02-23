// libraries
import React, { useMemo } from "react";
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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

import "./app.scss";

const client = new ApolloClient();

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
});

function App() {
  // const theme = useMemo(() =>
  //   createMuiTheme({
  //     palette: {
  //       type: 'dark',
  //     },
  //   }), [])
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Router>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/createBlog">
              <CreateBlog />
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
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
