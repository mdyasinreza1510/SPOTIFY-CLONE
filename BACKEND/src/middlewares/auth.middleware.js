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

        /** YAHA HAM RE.USER  EK NAYI PROPERTY BANA RHE HAIN JIS KI VALUE ME DECODED HOGI, TO JAB JAISE HI REQ MIDD.WARE SE CONFIRM HOKE AGE JAYEGI (IN ROUTES ,EG:CREATEMUSIC) AND HM US PROPERTY KO CONTROLLER ME ACCES KRSKTE HAIN   */
        req.user=decoded;





        //yaha pe next ka use hmne isliye kiya hai ki jab ye sare logic pass hojayenge  tb req next middle ware pe chli jayegi from  "authMiddleware.authArtist -> musicController.CreateAlbum (in the routes)
        next();

    } catch(err){
         return res.status(401).json({
            messege:"catch eror"
        })
    }

}







async function authuser(req,res,next){

     const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            messege:"token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.role !="user"){
            return res.status(403).json({
            messege:"not an user"
        })

        }

        req.user=decoded;


        next();

    } catch(err){
         return res.status(401).json({
            messege:"catch eror"
        })
    
}
}

module.exports = {authArtist , authuser}