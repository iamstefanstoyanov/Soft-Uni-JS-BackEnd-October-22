const {Schema, model, Types} = require('mongoose')
const URL_PATERN = /^https?:\/\/.+$/i
const cryptoSchema = new Schema({
    name: { type: String, required: true, unique: true,minlength: [2, 'Title should be at least 2 characters']},
    imageUrl: {type: String, required:true, validate:{
      validator:(value)=> URL_PATERN.test(value),
      message: 'Image URL is not valid!'
  }},
    price: { type: Number, required: true,min:[1,'Must be a positive number']},
    description: { type: String, required: true,minlength: [10, 'Review should be a minimum of 10 characters long']},
    paymentMethod: { type: String, required: true},
    boughtCryptos: {type: [Types.ObjectId], ref: 'User',default:[]},
    owner: {type: Types.ObjectId, ref: 'User',required: true},
    
  });
  cryptoSchema.index(
    { name: 1 },
    {
      collation: {
        locale: 'en',
        strength: 2,
      },
    }
  );
  const Crypto = model('Crypto', cryptoSchema);

  module.exports = Crypto;