const { hasUser } = require('../middlewares/guards');
const { create, getAll, getById, update, deleteById,buyById} = require('../services/cryptoService');
const { parseError } = require('../util/parser');

const cryptoController = require('express').Router()

cryptoController.get('/', async (req, res) => {
    const cryptos = await getAll()
    res.render('cryptos', {
        title: 'Cryptos page',
        cryptos    
    });
});

cryptoController.get('/create',hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Crypto',
        
    });
});
cryptoController.post('/create', async(req, res) => {
   const crypto = {
    name:req.body.name,
    imageUrl:req.body.imageUrl,
    price:Number(req.body.price),
    description:req.body.description,
    paymentMethod:req.body.paymentMethod,
    owner:req.user._id
   }
   
   try {
    if(Object.values(crypto).some(v=>!v)){
        throw new Error ('All fields are requierd')
       }
    await create(crypto);
    res.redirect('/cryptos')
   } catch (error) {
    res.render('create',{
        title: 'Create Page',
        body: crypto,
        errors: parseError(error)
    })
   }
});

cryptoController.get('/:id/details', async(req, res) => {
    const crypto = await getById(req.params.id)
    if(req.user){
        if(crypto.owner==req.user._id){
            crypto.isOwner = true
        }else if(crypto.boughtCryptos.toString().includes(req.user._id.toString())){
            crypto.isBought = true
        }
        res.render('details', {
            title: 'Details Page',
            crypto
           
        });
    }else{
        crypto.isGuest = true
        res.render('details', {
            title: 'Details Page',
            crypto
           
        });
    }
    
});
cryptoController.get('/:id/edit',hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id)
    if(crypto.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    res.render('edit', {
        title: 'Edit Page',
        crypto
    });
});
cryptoController.post('/:id/edit',hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id)
    if(crypto.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    const edited = {
        name:req.body.name,
        imageUrl:req.body.imageUrl,
        price:Number(req.body.price),
        description:req.body.description,
        paymentMethod:req.body.paymentMethod,
       }
       
       try {
        if(Object.values(edited).some(v=>!v)){
            throw new Error ('All fields are requierd')
           }
        await update(req.params.id,edited);
        res.redirect(`/cryptos/${req.params.id}/details`)
       } catch (error) {
        res.render('edit',{
            title: 'Edit Page',
            crypto: Object.assign(edited,{_id: req.params.id}),
            errors: parseError(error)
        })
       }
});
cryptoController.get('/:id/delete',hasUser(), async (req, res) => {
    const crypto = await getById(req.params.id)
    if(crypto.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    await deleteById(req.params.id);
    res.redirect('/cryptos')
});
cryptoController.get('/:id/buy',hasUser(), async (req, res) => {
    const crypto = await getById(req.params.id)
    try {
        if(crypto.owner==req.user._id){
            crypto.isOwner = true
            throw new Error ('Cannot buy your own crypto')
        }
        await buyById(req.params.id,req.user._id);
        res.redirect(`/cryptos/${req.params.id}/details`)
        
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            crypto,
            errors: parseError(error)
        });
    }
});

module.exports = cryptoController