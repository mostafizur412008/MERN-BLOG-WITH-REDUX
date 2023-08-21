const express = require('express');
const {getAllBlogsControllers,createBlogsControllers,updateBlogController,singleBlogController,deleteBlogController,userBlogController} = require("../controllers/blogController"); 


//router object
const router = express.Router();
//routes
//GET || all blogs
router.get('/all-blog', getAllBlogsControllers)

//POST || Create blog
router.post('/create-blog', createBlogsControllers)

//PUT || Update blog
router.put('/update-blog/:id', updateBlogController)
//GET || Single Blog details
router.get('/single-blog/:id',singleBlogController)
//DELETE || Blog
router.delete('/delete-blog/:id', deleteBlogController)
//GET user Blog route
router.get('/user-blog/:id', userBlogController)





module.exports = router;