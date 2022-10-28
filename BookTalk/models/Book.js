const {Schema, model, Types} = require('mongoose')

const URL_PATERN = /^https?:\/\/.+$/i

const bookSchema = new Schema({
    title: {type: String, required:true, minlength: [2, 'Title should be at least 2 characters']},
    author: {type: String, required:true,minlength: [5, 'Author should be at least 5 characters']},
    imageUrl: {type: String, required:true, validate:{
        validator:(value)=> URL_PATERN.test(value),
        message: 'Image URL is not valid!'
    }},
    bookReview: {type: String, required:true,minlength: [10, 'Review should be a minimum of 10 characters long']},
    genre: {type: String, required:true,minlength: [3, 'Author should be at least 5 characters']},
    stars: {type: Number, required:true, min:[1,'Must be between 1 and 5'],max:[5,'Must be between 1 and 5']},
    wishingList: {type: [Types.ObjectId], ref: 'User',default:[]},
    owner: {type: Types.ObjectId, ref: 'User', required:true},
})

bookSchema.index({name: 1},{
    collation: {
        locale:'en',
        strength: 2
    }
})

const Book = model('Book', bookSchema);

module.exports = Book