const mongoose = require('mongoose');
const { GraphQLScalarType } = require('graphql');
require('./models');
const Blogs = mongoose.model('blogs');

function adaptBlogToSave({ title, content, createdOn }) {
  return {
    title,
    content,
    createdOn,
    summary: content.slice(0, 140),
  }
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
  }),

  Query: {
    blogs: async () => await Blogs.find({}).sort({ createdOn: -1 }),
    blog: async (root, { id, ...args }) => {
      if (id) {
        return await Blogs.findById(id);
      }
      return await Blogs.findOne(args);
    }
  },

  Mutation: {
    addBlog: async (root, args) => await (new Blogs(adaptBlogToSave(args))).save(),
    deleteBlog: async (root, { id }) => await Blogs.findOneAndDelete({ _id: id }),
    updateBlog: async (root, { id, ...args }) => await Blogs.findOneAndUpdate(
      { _id: id },
      { $set: args },
      { new: true }),
  },
};

module.exports = resolvers;