const musicModel=require('../models/music.model');
const jwt = require('jsonwebtoken');


/* ONLY AN ARTIST USER CAN ACCES THIS 
 WEL USE TOKEN HERE IF THE USER IS ARTIST ONLY IT WILL PROCEED OTHERWISE IT WIL SHOW ERROR*/
async function createMusic(req,res){
    
    //FIRST WE'LL GET THE TOKEN FROM THE USER SIDE
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({messege:"unauthorized"})
    }

    try{//VERIFYING THE TOKEN 
        const decoded=Jwt.verify(token,process.env.JWT_SECRET);

        //CHECKING IF THE ROLE IN THE TOKEN IS SAME OR NOT 
        if (decoded.role !== "artist"){
             return res.status(401).json({messege:"youre not an artist"})
        }
    }catch (err){
        return res.status(403).json({messege:"unauthorized"})
    }




    
}