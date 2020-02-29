const mongoose = require('mongoose');
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
  Query: {
    blogs: async () => await Blogs.find({}),
    blog: async (root, { id, ...args}) => {
      if (id) {
        return await Blogs.findById(id);
      }
      return await Blogs.findOne(args);
    }
  },

  Mutation: {
    addBlog: async (root, args) => await (new Blogs(adaptBlogToSave(args))).save(),
    deleteBlog: async (root, { id }) => await Blogs.findOneAndDelete({ _id: id }),
  }
};

module.exports = resolvers;