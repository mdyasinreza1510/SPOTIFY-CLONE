const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');







async function userRegister(req, res) {
    
    const { username, email, password, role = "user" } = req.body;

    const useralreadyexist = await userModel.findOne({
        $or: [
            { username },
            { email },

        ]
    }) //

    if (useralreadyexist) {
        return res.status(409).json({ messege: "user already exist" })
    }

const hash=await bcrypt.hash(password,10);//req.body se ane wale pass ko hash krrte hain


    //were creating a a user data in the database
    const user = await userModel.create({
        username,
        email,
        password:hash,
        role

    });

    const token = jwt.sign({
        id:user._id,
        role:user.role},
        process.env.JWT_SECRET
    );

    res.cookie("token",token);
    res.status(200).json({
        messege:"user created sucessfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    });

    


}





//NOW WELL MAKE A FEATURE FROM WHICH A USER CAN LOGIN WITH USERNAME,EMAIL,PHONE NO.
async function userlogin(req,res){
    // body se ane wala username/usernam and password
    const {username,email,password}=req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
    if(!user){
        return res.status(401).json({messege:"INVALID USERNAME/EMAIL"})
    }

    //here we comapre the password given by thew user and the password saved in the database if they are same then login haoppens 
    const ispasswordvalid =await bcrypt.compare(password, user.password);
    
    if(!ispasswordvalid){
        return res.status(401).json({messege:"INVALID PASSWORD"});
    }

     const token = jwt.sign({
        id:user._id,
        role:user.role},
        process.env.JWT_SECRET
    );
    res.cookie("token",token);
    res.status(200).json({
        messege:"LOGIN SUCESSFULLY",
        user
    })
}


module.exports= { userRegister,userlogin }