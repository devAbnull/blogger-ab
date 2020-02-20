import React from "react";
import { useQuery } from 'react-apollo';

import { gql } from 'apollo-boost';

const BLOG_QUERY = gql`
query BlogQuery($id:String) {
	blog(id: $id) {
    id
    title
    content
  }
}
`;

function Blog() {
  const { data } =useQuery(BLOG_QUERY, {
    variables: {
      id: '5e4eef178784ef21f0b97119',
    }
  });

  console.log('=======> blog', data);
  return <h2>Blog</h2>;
}

export default Blog;