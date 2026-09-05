const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');








async function registeruser(req, res) {

    const { username, email, password, role = "user" } = req.body;

    const useralreadyexist = await userModel.findOne({
        $or: [
            { username },
            { email },

        ]
    })

    if (useralreadyexist) {
        return res.status(409).json({ messege: "user already exist" })
    }

const hash=await bcrypt.hash(password,10);//req.body se ane wale pass ko hash krrte hain

    const user = await userModel.create({
        username,
        email,
        password,
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


module.exports= { registeruser }