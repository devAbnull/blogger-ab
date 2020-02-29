import React from "react";

// material-ui
import Typography from '@material-ui/core/Typography';
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
    <Box display="flex">
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
}

function BlogList() {
  const { blogs = [] } = useBlogsQuery();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {blogs.map(blog => <BlogSummary key={blog.id} {...blog} />)}
    </Box>
  );
}

export default BlogList;