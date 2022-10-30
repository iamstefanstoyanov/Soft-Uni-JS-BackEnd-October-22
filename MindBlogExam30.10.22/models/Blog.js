const { Schema, model, Types } = require("mongoose");
const URL_PATERN = /^https?:\/\/.+$/i;
const blogSchema = new Schema({
  title: {
    type: String,
    minlength: [5, "Title should be at least 5 characters"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => URL_PATERN.test(value),
      message: "Image URL is not valid!",
    },
  },
  content: {
    type: String,
    minlength: [10, "Content should be a minimum of 10 characters long"],
  },
  category: {
    type: String,
    minlength: [3, "Category should be a minimum of 3 characters long"],
  },
  followList: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  email:{
    type: String,
  }
});
blogSchema.index(
  { name: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);
const Blog = model("Blog", blogSchema);

module.exports = Blog;
