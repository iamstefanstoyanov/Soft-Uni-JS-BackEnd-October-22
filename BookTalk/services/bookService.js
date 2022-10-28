const Book = require("../models/Book")

async function getAll(){
    return Book.find({}).lean()
}
async function getById(id){
    return Book.findById(id).lean()
}
async function create(book){
    return await Book.create(book)
}
async function update(id,book){
    const existing = await Book.findById(id)
    existing.title = book.title
    existing.author = book.author
    existing.imageUrl = book.imageUrl
    existing.bookReview = book.bookReview
    existing.genre = book.genre
    existing.stars = book.stars
    
    await existing.save()
}
async function deleteById(id){
    await Book.findByIdAndRemove(id)
}
async function wishBook(bookId, userId){
    const book = await Book.findById(bookId)
    if(book.wishingList.includes(userId)){
        throw new Error('Cannot book twice')
    }
    book.wishingList.push(userId)
    await book.save()
}
async function getByUserWishes(userId){
    return Book.find({wishingList: userId}).lean()
}
module.exports = {
getAll,getById,create,update,deleteById,wishBook,getByUserWishes
}