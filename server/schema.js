const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Blog {
    id: String
    title: String
    content: String
    summary: String
    createdOn: Int
  }

  type Query {
    blogs: [Blog]
    blog(id: String, title: String, createdOn: Int) : Blog
  }

  type Mutation {
    addBlog(title: String, createdOn: Int, content: String): Blog
    deleteBlog(id: String): Blog
  }
`;

module.exports = {
  typeDefs,
}