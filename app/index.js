// libraries
import React, { useCallback, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// routes
import Blog from './pages/blog';
import BlogList from './pages/blogList';
import Home from './pages/home';
import CreateBlog from './pages/createBlog';

// material-ui
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

// components
import AntSwitch from './components/antSwtich';
import "./app.scss";

const client = new ApolloClient();

function App() {
  const [theme, setTheme] = useState('light');
  const MuiTheme = useMemo(() => createMuiTheme({
    palette: {
      type: theme,
      primary: blue,
    },
  }));
  const onThemeSwitch = useCallback(e => setTheme(e.target.checked ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      <AppBar color="transparent" position="static">
        <Box display="flex" my={2.5} mr={10} ml={8} alignItems="center" >
          <Typography variant="h6">
            blogger AB
          </Typography>
          <Box ml="auto" display="flex">
            <AntSwitch onChange={onThemeSwitch} />
            <Typography variant="body2">Enable Dark Mode!</Typography>
          </Box>
        </Box>
      </AppBar>
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
