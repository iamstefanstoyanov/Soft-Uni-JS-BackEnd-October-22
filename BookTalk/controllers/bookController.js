const { create, getById, update, deleteById, wishBook } = require('../services/bookService');
const { parseError } = require('../util/parser');

const bookController = require('express').Router();

bookController.get('/:id/details', async (req, res) => {

  const book = await getById(req.params.id);
  if(req.user){
    if(book.owner == req.user._id){
      book.isOwner = true
    }else if(book.wishingList.map(b=>b.toString()).includes(req.user._id.toString())){
      book.isWished = true
    }
    res.render('details', {
      title: 'Book Details',
      book
    });
  }else{
    res.render('guestDetails', {
      title: 'Book Details',
      book
    });
  }
    
  })

bookController.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Book',
  });
});
bookController.post('/create', async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    bookReview: req.body.bookReview,
    genre: req.body.genre,
    stars: Number(req.body.stars),
    owner: req.user._id,
  };
  try {
    
    await create(book)
    res.redirect('/catalog');
  } catch (err) {
    res.render('create', {
      title: 'Create Book',
      body: book,
      errors: parseError(err),
      
    });
  }
});

bookController.get('/:id/edit', async(req, res) => {
  const book = await getById(req.params.id);
  if(book.owner != req.user._id){
    return res.redirect('/auth/login')
  }

  res.render('edit', {
    title: 'Edit Book',
    book
  });
});

bookController.post('/:id/edit', async(req, res) => {
  const book = await getById(req.params.id);
  if(book.owner != req.user._id){
    return res.redirect('/auth/login')
  }
  const edited = {
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    bookReview: req.body.bookReview,
    genre: req.body.genre,
    stars: Number(req.body.stars)
  }
  try {
    await update(req.params.id,edited)
    res.redirect(`/book/${req.params.id}/details`);
  } catch (err) {
    res.render('edit', {
      title: 'Edit Book',
      book: Object.assign(edited, {_id:req.params.id}),
      errors: parseError(err),
      
    });
  }
});
bookController.get('/:id/delete', async(req, res) => {
  const book = await getById(req.params.id);
  if(book.owner != req.user._id){
    return res.redirect('/auth/login')
  }
  await deleteById(req.params.id)
  res.redirect('/catalog')
});
bookController.get('/:id/wish', async(req, res) => {
  const book = await getById(req.params.id);
  try {
    if(book.owner == req.user._id){
      book.isOwner = true
      throw new Error('Cannot wish your own book!')
    }
    await wishBook(req.params.id,req.user._id)
    res.redirect(`/book/${req.params.id}/details`)
  } catch (error) {
    res.render('details',{
      title: 'Book Details',
      book,
      errors: parseError(error)
    })
  }
});

module.exports = bookController;
