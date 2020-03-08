const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Blog {
    id: String
    title: String
    content: String
    summary: String
    createdOn: Date
  }

  type Query {
    blogs: [Blog]
    blog(id: String, title: String, createdOn: Date) : Blog
  }

  type Mutation {
    addBlog(title: String, createdOn: Date, content: String): Blog
    deleteBlog(id: String): Blog
    updateBlog(id: String, title: String, createdOn: Date, content: String): Blog
  }
`;

module.exports = {
  typeDefs,
}