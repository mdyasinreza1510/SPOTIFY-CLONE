
const jwt = require('jsonwebtoken');
const musicModel=require('../models/music.model');
const albumModel= require ('../models/album.model')

const {uploadfile} = require("../services/storage.service");

/* ONLY AN ARTIST USER CAN ACCES THIS 
 WEL USE TOKEN HERE IF THE USER IS ARTIST ONLY IT WILL PROCEED OTHERWISE IT WIL SHOW ERROR*/
async function createMusic(req,res){
    
    //FIRST WE'LL GET THE TOKEN FROM THE USER SIDE
    // const token= req.cookies.token;
    // if(!token){
    //     return res.status(401).json({messege:"invalid token"})
    // }

    // try{//VERIFYING THE TOKEN 
    //     const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //     //CHECKING IF THE ROLE IN THE TOKEN IS SAME OR NOT 
    //     if (decoded.role !== "artist"){
    //          return res.status(401).json({messege:"youre not an artist"})
    //     }



        //body se title liye
    const {title}= req.body;

    //body se file ko liye jisme name,type aur buffer hota hai
    const file= req.file;
    
    //file ke buffer ko string banake upload kiye imagekit me , ab ye buffer ul;poadfile fun me jayega jaha pe result me imagekit url banake return krega 
    const result = await uploadfile(file.buffer.toString("base64"));
/* vvip :- imagekit me hmaesha file ka buffer jayega string format me  */


    
    //ab url milne k baad music ka model banyenge jsime url,title,artist ki id hogi;

    /* KYU KI AB DECODED TO YAHA PE NAHI HAI ISILIYE HMNE MIDWARE ME JO REQ.USER=DECODED PROP BANAYI THI USKO ACCES KRSKTE HAIN JAHA JAHA DECODED KI NEED HAI YASSSSU */

    const music = await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
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


//     }catch (err){
        
//         return res.status(403).json({messege:"bhago"})
//     }

    
}




async function CreateAlbum(req,res){

// const token = req.cookies.token;

// if(!token){
//     return res.status(401).json({
//         messege:"invalid token"
//     })
// }


// try{
//     // verify token
//      const decoded=jwt.verify(token,process.env.JWT_SECRET);

//     if (decoded.role != "artist"){
//         return res.status(401).json({
//         messege:"not an artist so you cannot create an album"
//     })
    
//     }
 // ROLE == ARTIST

 const {title , mymusic} = req.body;
  const album = await albumModel.create({
    title,
    artist:req.user.id,
    musics:mymusic, 
  })

  res.status(201).json({
    messege:"ALBUM CREATED SUCESSFULLY",
    album:{
        id:album._id,
        title:album.title,
        artist:album.artist,
        musics:album.musics
    }
  })

}








async function getAllMusic (req,res){

    const musics= await musicModel.find().limit(1).populate("artist","username email");
    res.status(200).json({
        messege:"music fetched sucessfully",
        musics:musics
    })
}






async function getAllAlbums (req,res){
// were using .select for getting only the title and artist values in the output (eg:- postman)
    const albums= await albumModel.find().select(" title artist");
    res.status(200).json({
        messege:"albums fetched sucessfully",
        albums:albums
    })

}





async function getAlbumById(req,res){
    //yaha hmne sbse se phle album ki id nikali aur find by id me pass kiya ab jab album fetch hogi to usme hme populate method ki wjh se srif artist ka username aur email dikhega 
    const albumId= req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "username email")

    return res.status(200).json({
        messege :"album fetched sucessfully",
        album:album
    })


}


module.exports={createMusic, CreateAlbum,getAllMusic,getAllAlbums, getAlbumById}