import React from "react";

// material-ui
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Box from '@material-ui/core/Box';

// graphql
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const BLOGS_QUERY = gql`query BlogsQuery {
  blogs {
    id
    title
  }
}
`;

function useBlogsQuery() {
  const { data = {} } = useQuery(BLOGS_QUERY);
  return {
    blogs: data.blogs,
  }
}

function BlogSummary({ id, title }) {
  return (
    <Box display="flex" flexDirection="column">
      <ListItem>
        <ListItemText primary={title} />
        {/* <hr /> */}
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
}

function BlogList() {
  const { blogs = [] } = useBlogsQuery();
  return (
    <Box display="flex" flexDirection="column" mx={20} mt={5}>
      <List>
        {blogs.map(blog => <BlogSummary key={blog.id} {...blog} />)}
      </List>
    </Box>
  );
}

export default BlogList;