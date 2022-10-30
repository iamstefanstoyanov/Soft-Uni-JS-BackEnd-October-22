const Blog = require('../models/Blog');

async function getAll() {
  return Blog.find({}).sort({createdAt:1}).lean()
}
async function getById(id) {
  return Blog.findById(id).lean()
}
async function create(blog) {
  return await Blog.create(blog);
}
async function update(id, blog) {
  const existing = await Blog.findById(id);
  existing.title = blog.title;
  existing.imageUrl = blog.imageUrl;
  existing.content = blog.content;
  existing.category = blog.category;

  await existing.save();
}
async function deleteById(id) {
  await Blog.findByIdAndRemove(id);
}
async function followById(blogId, userId) {
  const blog = await Blog.findById(blogId);
  if (blog.followList.includes(userId)) {
    throw new Error('Cannot follow twice');
  }
  blog.followList.push(userId);
  await blog.save();
}
async function getAllByUser(userId){
  return Blog.find({owner: userId}).lean()
}
async function getAllByUserFollowings(userId){
  return Blog.find({followList: userId}).lean()
}
module.exports = { getAll, create, update, deleteById, getById, followById,getAllByUser,getAllByUserFollowings };
