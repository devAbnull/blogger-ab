// libraries
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// routes
import Blog from './pages/blog';
import BlogList from './pages/blogList';
import Home from './pages/home';
import CreateBlog from './pages/createBlog';

import "./app.scss";

// const App = props => {
//   return <h1 className="bg-red flex justify-center">Hello World!</h1>;
// };

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
    </Router>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
