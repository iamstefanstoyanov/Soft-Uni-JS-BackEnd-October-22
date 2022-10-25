const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /https?:\/\/./i;

const courseSchema = new Schema({
  title: {
    type: String,
    minlength: [4, "Title must be at least 4 char long"],
  },
  description: {
    type: String,
    minlength: [20, "Description must be at least 20 char long"],
    maxlength: [50, "Description must be not more than 50 char long"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Invalid URL",
    },
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  createdAt: {
    type: String,
    required: true,
    default: () => (new Date()).toISOString().slice(0,10)
  },
  users: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  owner: { 
    type: Types.ObjectId, 
    ref: "User" 
  },
  userCount: {
    type: Number,
    default: 0
  }
});

courseSchema.index(
  { title: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Course = model("Course", courseSchema);

module.exports = Course;
