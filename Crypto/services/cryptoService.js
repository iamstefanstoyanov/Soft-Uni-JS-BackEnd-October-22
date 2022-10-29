const Crypto = require("../models/Crypto")

async function getAll(){
    return Crypto.find({}).lean()
}
async function getAllByName(search,type){
    const query = {}
    if(search&&type){
        query.title = new RegExp(search , 'i')
        query.paymentMethod = type
    }
    return Crypto.find(query).lean()
}
async function getById(id){
    return Crypto.findById(id).lean()
}
async function create(crypto){
    return await Crypto.create(crypto)
}
async function update(id, crypto){
    const existing = await Crypto.findById(id)
    existing.name = crypto.name
    existing.imageUrl = crypto.imageUrl
    existing.price = crypto.price
    existing.description = crypto.description
    existing.paymentMethod = crypto.paymentMethod

    await existing.save()
    
}
async function deleteById(id){
    await Crypto.findByIdAndRemove(id)
}
async function buyById(cryptoId,userId){
    const crypto = await Crypto.findById(cryptoId)
    if(crypto.boughtCryptos.includes(userId)){
        throw new Error('Cannot book twice')
    }
    crypto.boughtCryptos.push(userId)
    await crypto.save()
}

module.exports = { getAll,  create,  update, deleteById,getById,buyById,getAllByName}