const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');


//get All Users
exports.getAllusers = async(req,res)=>{
   try {
    const users = await userModel.find({});
    return res.status(200).send({
        userCount: users.length,
        success:true,
        message:'All user data',
        users
    })
   } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        messege:'error in get all users',
        error

    })
   }
};

//register controller
exports.RegisterController = async(req,res)=>{
    try {
        const {username, email, password}=req.body
        //validatation
    if (!username || !email || !password) {
       return res.status(400).send({
        success:false,
        messege:'Please fill all the feilds'
       })}
       
       //existing user
    const existingUser = await userModel.findOne({email})
    if (existingUser) {
        return res.status(400).send({
            success:false,
            messege:'User Allready exist'
    })}

    const hashedPassword = await bcrypt.hash(password,10);
    
    //save new user
    const user = new userModel({username,email,password:hashedPassword}) 
        await user.save();
        return res.status(201).send({
            success:true,
            message:'New Uswe created',user

        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            "messege" : "Error is registration callback",
            "success" : false,
            error

        })
    }
};

//Log in controller 
exports.LoginController = async(req,res)=>{
try {
    const {email,password} = req.body
    if (!email || !password) {
        return res.status(401).send({
            success:false,
            messege:"Please provide email or password"
        })
    }
    const user = await userModel.findOne({email})
    if (!user) {
        return res.status(200).send({
            success:false,
            message:'Email is not registered'
        })
    }
const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch) {
    return res.status(401).send(
        {
            success:false,
            message:"Invalid Username or password"
        }
    )
}
return res.status(200).send({
    success:true,
    message:'Log In Successfully',
    user
})
} catch (error) {
    console.log(error);
    return res.status(500).send({
        "messege" : "Error is Log In",
        "success" : false,
        error

    })
}
};