import React from "react";
import { useQuery } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { gql } from 'apollo-boost';
import { makeStyles } from "@material-ui/core/styles";

import useSearchParam from 'react-use/lib/useSearchParam';

const useStyles = makeStyles({
  root: {
    fontSize: 16,
  },
});

const BLOG_QUERY = gql`
query BlogQuery($id:String) {
	blog(id: $id) {
    id
    title
    content
  }
}
`;

function BlogId(props) {
  return <div>Blog with id</div>
}

function Blog() {
  const classes = useStyles();
  const id = useSearchParam('id');
  const { data } = useQuery(BLOG_QUERY, {
    variables: {
      id,
    }
  });
  const blog = data && data.blog;

  return blog ?
    <Box mx={30} mt={5}>
      <Typography variant="h5">{blog.title}</Typography>
      <Box mt={5}>
        <div className={classes.root} dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Box>
    </Box>
    : null;
}

export default Blog;