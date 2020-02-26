import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_BLOG_MUTATION = gql`
  mutation AddBlog($title: String, $content:String) {
    addBlog(title: $title, content:$content) {
      id
    }
  }
`;

export default function useAddBlog() {
  const [addBlog, { data, loading }] = useMutation(ADD_BLOG_MUTATION);
  const handleAddBlog = useCallback(values => {
    addBlog({ variables: values });
  }, []);

  return {
    addBlog: handleAddBlog,
    data,
    loading
  }
}
