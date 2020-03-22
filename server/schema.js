const { gql } = require('apollo-server-express');

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  scalar Date

  type Blog {
    id: String
    title: String
    content: String
    summary: String
    createdOn: Date
  }

  type Query {
    blogs(pageNo: Int, size: Int): [Blog]
    blog(id: String, title: String, createdOn: Date) : Blog
  }

  type Mutation {
    addBlog(title: String, createdOn: Date, content: String): Blog @auth
    deleteBlog(id: String): Blog @auth
    updateBlog(id: String, title: String, createdOn: Date, content: String): Blog @auth
  }
`;

module.exports = {
  typeDefs,
}