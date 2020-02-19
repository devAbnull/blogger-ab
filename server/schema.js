const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Blog {
    id: String
    title: String!
    content: String
    createdOn: Int
  }

  type Query {
    blogs: [Blog]
    blog(id: String, title: String, createdOn: Int) : Blog
  }
`;

module.exports = {
  typeDefs,
}