const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String },
  content: { type: String },
  summary: { type: String },
  createdOn: { type: Date },
});

BlogSchema.static.findBlog = function(id) {
  const Blogs = mongoose.model('blogs');

  return Blogs.findById(id);
}

mongoose.model('blogs', BlogSchema);