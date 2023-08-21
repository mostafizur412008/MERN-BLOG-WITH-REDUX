
const { default: mongoose } = require('mongoose')
const blogModel = require('../models/blogModel')

//Get All Blogs
exports.getAllBlogsControllers =async (req,res)=>{
try {
    const blogs = await blogModel.find({})
    if (!blogs) {
        return res.status(200).send({
            success:false,
            message:'no Blogs found'
        })
    }
    return res.status(200).send({
        success:true,
        BlogCount:blogs.length,
        message:'All blogs list',blogs
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'Error while getting blog',error
    })
}
}
//Create All Blogs
exports.createBlogsControllers = async(req,res)=>{
    try {
        const {title, description,image, user} = req.body
        //validatation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success:false,
                message:'Please provide All feilds'
            })
        }
        const existingUser = await userModel.findById(user)
        //Validitation
        if (!existingUser) {
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
        const newBlog = new blogModel({title,description,image,user})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction();
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:'Blog created',
            newBlog
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error while Creating blog blog',error
        })

    }
}
//Get Update Blogs
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error, or log it
});

exports.updateBlogController =async (req,res)=>{
    try {
        const { id } = req.params; // Assuming you're getting the ID from the request parameters
        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
    
        if (!updatedBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }
    
        return res.status(200).send({
            success: true,
            message: 'Blog updated',
            updatedBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while updating blog',
            error
        })
    }
}

//Get Single Blogs
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error, or log it
});
exports.singleBlogController = async(req,res)=>{
    try {
        const {id}= req.params
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            })
        }
        return res.status(200).send({
            success:true,
            message:'Fetch Single Blog',
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while Deleting blog',
            error
        })
    }
}
// DELETE Single Blog
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error, or log it
});

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOneAndDelete({ _id: req.params.id }).populate('user');
        await blog.user.blogs.pull(deletedBlog);
        await blog.user.save();
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Blog deleted',
            deletedBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while deleting blog',
            error
        });
    }
}


exports.userBlogController = async (req, res) => {
    try {
        const userId = req.params.id;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

        if (!isValidObjectId) {
            return res.status(400).send({
                success: false,
                message: 'Invalid user ID'
            });
        }

        const userBlog = await userModel.findById(userId).populate('blogs');

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'User blogs not found with ID'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User blogs',
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in user blogs',
            error
        });
    }
}