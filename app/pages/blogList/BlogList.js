import React from "react";
import {
  Link
} from "react-router-dom";

// material-ui
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";

// graphql
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const BLOGS_QUERY = gql`query BlogsQuery {
  blogs {
    id
    title
    summary
  }
}
`;

function useBlogsQuery() {
  const { data = {} } = useQuery(BLOGS_QUERY);
  return {
    blogs: data.blogs,
  }
}

const useStyles = makeStyles({
  root: {
    fontSize: 16,
  },
});

function BlogSummary({ id, title, summary }) {
  const classes = useStyles();
  return (
    <ListItem divider>
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary={<Link to={`/blog?id=${id}`}><Typography variant="h5">{title}</Typography></Link>}
          secondary={<div className={classes.root} dangerouslySetInnerHTML={{ __html: `${summary}...` }} />}
        />
      </Box>
    </ListItem>
  );
}

function BlogList() {
  const { blogs = [] } = useBlogsQuery();
  return (
    <Box display="flex" flexDirection="column" mx={30} mt={5}>
      <List>
        {blogs.map(blog => <BlogSummary key={blog.id} {...blog} />)}
      </List>
    </Box>
  );
}

export default BlogList;