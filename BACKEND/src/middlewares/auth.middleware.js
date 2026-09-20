const jwt = require('jsonwebtoken');

async function authArtist (req,res,next){


    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            messege:"token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.role !="artist"){
            return res.status(403).json({
            messege:"not an artist"
        })

        }


        //yaha pe next ka use hmne isliye kiya hai ki jab ye sare logic pass hojayenge  tb req next middle ware pe chli jayegi from  "authMiddleware.authArtist -> musicController.CreateAlbum (in the routes)
        next();

    } catch(err){
         return res.status(401).json({
            messege:"catch eror"
        })
    }

}

module.exports = {authArtist}