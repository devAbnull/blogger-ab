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
import { makeStyles } from "@material-ui/core/styles";

// components
import AntSwitch from './components/antSwtich';
import "./app.scss";

const client = new ApolloClient();

const useStyles = makeStyles(theme => ({
  '@global': {
    code: {
      backgroundColor: theme.palette.divider,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    a: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    }
  },
}));


function App(props) {
  const classes = useStyles();
  const { onThemeSwitch } = props;

  return (
    <>
      <CssBaseline classes={classes} />
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
    </>
  );
}

function AppWithTheme() {
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
      <App onThemeSwitch={onThemeSwitch} />
    </ThemeProvider>
  )
}

ReactDOM.render(<AppWithTheme />, document.querySelector("#root"));
