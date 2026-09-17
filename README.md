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
