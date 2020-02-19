const mongoose = require('mongoose');
const Blogs = mongoose.model('blogs');

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
};

module.exports = resolvers;