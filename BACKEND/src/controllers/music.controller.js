
const jwt = require('jsonwebtoken');
const musicModel=require('../models/music.model');

const {uploadfile} = require("../services/storage.service");

/* ONLY AN ARTIST USER CAN ACCES THIS 
 WEL USE TOKEN HERE IF THE USER IS ARTIST ONLY IT WILL PROCEED OTHERWISE IT WIL SHOW ERROR*/
async function createMusic(req,res){
    
    //FIRST WE'LL GET THE TOKEN FROM THE USER SIDE
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({messege:"invalid token"})
    }

    try{//VERIFYING THE TOKEN 
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //CHECKING IF THE ROLE IN THE TOKEN IS SAME OR NOT 
        if (decoded.role !== "artist"){
             return res.status(401).json({messege:"youre not an artist"})
        }



        //body se title liye
    const {title}= req.body;

    //body se file ko liye jisme name,type aur buffer hota hai
    const file= req.file;
    
    //file ke buffer ko string banake upload kiye imagekit me , ab ye buffer ul;poadfile fun me jayega jaha pe result me imagekit url banake return krega 
    const result = await uploadfile(file.buffer.toString("base64"));
/* vvip :- imagekit me hmaesha file ka buffer jayega string format me  */


    //ab url milne k baad music ka model banyenge jsime url,title,artist ki id hogi;
    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })
    res.status(201).json({
        messege:"music created sucessfully",
        music:{
            id:music.id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,
        }
    })


    }catch (err){
        
        return res.status(403).json({messege:"bhago"})
    }

    
}

module.exports={createMusic}