const { getAll, create, update, deleteById, getById, followById } = require('../services/blogService');
const { parseError } = require('../util/parser');
const {hasUser} = require('../middlewares/guards')

const blogController = require('express').Router()

blogController.get('/',async (req,res)=>{
    const blogs = await getAll()
    res.render('catalog',{
        title: 'Blogs Page',
        blogs
    })
})
blogController.get('/create',hasUser(),(req,res)=>{
    res.render('create',{
        title: 'Create Blog'
    })
})
blogController.post('/create',hasUser(), async(req, res) => {
    const blog = {
     title:req.body.title,
     imageUrl:req.body.imageUrl,
     content:req.body.content,
     category:req.body.category,
     owner:req.user._id,
     email:req.user.email,
    }
    try {
     await create(blog);
     res.redirect('/blogs')
    } catch (error) {
     res.render('create',{
         title: 'Create Page',
         body: blog,
         errors: parseError(error)
     })
    }
 });
 blogController.get('/:id/details', async(req, res) => {
    const blog = await getById(req.params.id)
    console.log(blog)
    if(req.user){
        if(blog.owner==req.user._id){
            blog.isOwner = true
        }else if(blog.followList.toString().includes(req.user._id.toString())){
            blog.isFollowed = true
        }
        res.render('details', {
            title: 'Details Page',
            blog,
        });
    }else{
        blog.isGuest = true
        res.render('details', {
            title: 'Details Page',
            blog
        });
    }
    
});
blogController.get('/:id/edit',hasUser(), async(req, res) => {
    const blog = await getById(req.params.id)
    if(blog.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    res.render('edit', {
        title: 'Edit Page',
        blog
    });
});
blogController.post('/:id/edit',hasUser(), async(req, res) => {
    const blog = await getById(req.params.id)
    if(blog.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    const edited = {
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        content:req.body.content,
        category:req.body.category,
        owner:req.user._id
       }
       
       try {
        if(Object.values(edited).some(v=>!v)){
            throw new Error ('All fields are requierd')
           }
        await update(req.params.id,edited);
        res.redirect(`/blogs/${req.params.id}/details`)
       } catch (error) {
        res.render('edit',{
            title: 'Edit Page',
            blog: Object.assign(edited,{_id: req.params.id}),
            errors: parseError(error)
        })
       }
});
blogController.get('/:id/delete',hasUser(), async (req, res) => {
    const blog = await getById(req.params.id)
    if(blog.owner!=req.user._id){
        return res.redirect('/auth/login')
    }
    await deleteById(req.params.id);
    res.redirect('/blogs')
});
blogController.get('/:id/follow',hasUser(), async (req, res) => {
    const blog = await getById(req.params.id)
    try {
        if(blog.owner==req.user._id){
            blog.isOwner = true
            throw new Error ('You already follow this blog!')
        }
        await followById(req.params.id,req.user._id);
        res.redirect(`/blogs/${req.params.id}/details`)
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            blog,
            errors: parseError(error)
        });
    }
});
module.exports = blogController