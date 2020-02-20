import React from "react";
import { useQuery} from 'react-apollo';

import { gql } from 'apollo-boost';

const BLOGS_QUERY = gql`query {
  blogs {
    id
    title
  }
}
`;

function BlogList() {
  const { data } = useQuery(BLOGS_QUERY);
  console.log('=====> blog list', data);
  return <h2>BlogList</h2>;
}

export default BlogList;