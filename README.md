<h1> USER REGISTRATION </h1>

1) FIRST WE WILL CREATE A SCHEMA FOR REGISTRING A USER (user.model.js);

2) NOW WELL CREATE APIS FOR THE AUTHENTIATION OF THE USER

3) THEN WE WRITE THE LOGIC FOR THE API IN CONTROLLER FILE (controller.js)

4) THEN WE USE THE PASSWORD HASHING 
    - to use hasing we use a package "bcryptjs"
5) THEN WE GO TO THE CONTROLLERS AND MAKE A VAR TO USE THE B-CRYPT then we pass the password parametr in it.

<h1>USER LOGIN </h1>

1) IN USER LOGIN WERE DEVLOPING A FEATURE WHERE USER CAN CAN VIA EMAIL/USERNAME/PHONE NO.
2) WE'LL WRITE A QUERY WHERE IF ANY ONE OF THE CREDENTIAL IS PASSED THE DB USE THEM TO LOGIN THE USER 
```javascript 
query={
    //ye OR operator database se same email/phone/username leke ayega jo bhi user ne provide kiya hai aur database me search krkega . yaha pe jaise user2 ka email match hogya to wo uss credwntial se login krdega 
$or:[
        {username:undefined}
        {email:mamta@saviour.com}
    ]
}
user1 ->
username = modi
email=modi@chor.com

user 2 ->
username = mamtabanerjee
email=mamta@saviour.com
```
3) HERE WE COMAPRE THE PASSWORD GIVEN BY THEW USER AND THE PASSWORD SAVED IN THE DATABASE IF THEY ARE SAME THEN LOGIN HAOPPENS. THIS BCRYPT FIRST CONVERT THE PAASWORD INTO HASH THEN COMPARES FORM THE SAVED HASEHD PASSWORD 
```javascript
const ispasswordvalid =await bcrypt.compare(password, user.password);
```

<h1>ARTIST SECTION</h1>
<B> HERE WE CRATE AN API SO THAT ONLY A USER WITH ROLE 'ARTIST' CAN CREATE MUSIC</B>

1) FIRT WECREATE A SCEMA FOR MUSIC in music.model.js
```javascript
const musicschema= new mongoose.Schema({
    uri:{
        type:String,
        required:true 
    },
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }

})
const musicModel= mongoose.model("music",musicschema);
```
2) FIRST WE MAKE A FILE IN ROUTES 'music.routes.js' where we create apis.
3) THEN WE MAKE A FILE IN CONTROLLERS "music.controller.js" FOR API LOGIC
4) NOW WE GONNA CONNECT TO MAGE KIT FOR UPLOADING THE DATA 
```javascript
const ImageKitClient = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
```
5) WELL CREATE A FUNCTION FOR UPLOADING THE FILE
```javascript
async function uploadfile(file){
    const result= await ImageKitClient.files.upload({
        file:file, //actual image/song/pdf,
        fileName:"music_" + Date.now(),
        folder:"spotify-clone/music"
        //ImageKit Dashboard me ye file jis folder me save hogi

    })
    return result;
}
```
6) NOW WE'LL CREATE  A VAR RESULT WHERE WE STORE THE VLUES WE GOT FROM THE IMAGEKIT SERVER. WE PASED THE BUFFER DIRECTLY TO THE FUNCTION SO THAT IMAGEKIT CAN CONVERT THE URL  
```javascript
   const result = await uploadfile(file.buffer.toString("base64"));
```
7) HERE WE SAVED THE MUSIC IN OUR DATABASE
```javascript
 const music = await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })
```
<h1>ALBUM CREATION</h1>

1) FIRST WE MAKE A MODEL FOR ALBUM
```javascript
const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"music"
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
})

```
2) AS THIS FEATURE DOESNT REQUIRE TO HAVE A PERTICULAR CONTROLLER FILES WE GONNA WRITE ITS LOGIC IN THE MUSIC.CONTROLLER AS WELL.

- FIRST WE GET THE TOKEN FROM THE BODY/FRONTEND TO CHECK WHETHER IS A VALID USER OR NOT 
```javascript
const token = req.cokkies.token;

if(!token){
    return res.status(401).json({
        messege:"invalid token"
    })
}

```
- THEN WE VERIFY THE IF THE ROLE IN TOKEN DEFINES AN ARTIST OR A NORMAL USER 

```javascript
 const decoded = jwt.verify(token ,process.env.JWT_SECERET)

    if (decoded.role != "artist"){
        return res.status(401).json({
        messege:"not an artist so you cannot create an album"
    })
    }

```
- WHEN THE TOKEN VERIFIES WE GO AHEAD AND SAVE THE SONMG IN DB
```javascript
const {title , mymusic} = req.body;
  const album = await albumModel.create({
    title,
    artist:decoded.id,
    musics:mymusic, 
  })

  res.status(201).json({
    messege:"ALBUM CREATED SUCESSFULLY",
    album
  })

```

<h1>USE OF MIDDLEWARE  </h1>

1) AS WEVE SEEN WE HAVE TO WRITE CODE FOR GETTING TOKEN,VERIFYING IT , THEN CHECKING THE ROLE EVERY SINGLE TIME SO WE CREATE A MIDDLE WARE WHERE WE WRITE THE CODE FOR AUTHENTICATION

- FIRST WE MAKE A 'MIDDLEWARE' FOLDER IN SRC
- THEN WE MAKE A FILE " auth.middleware.js" FOR WRITING THE AUTH CODE

```javascript
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

        next() //ek mid.ware se req dusre mid.ware k jaaskeee fully verify hone k baad hahahahahaha.


    } catch(err){
         return res.status(401).json({
            messege:"catch eror"
        })
    }

}

```

- THEN WE REQUIRE THE MIDDLEWARE FILE IN THE  " ROUTES " like this
```javascript
const authMiddleware= require ("../middlewares/auth.middleware")

// AND USE LIKE THIS

router.post('/album',authMiddleware.authArtist,musicController.CreateAlbum)

```
- NOW WE CAN REMOVE THE AUTH CODES FROM THE CONTROLLER FILE
