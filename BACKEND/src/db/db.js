const mongoose = require ('mongoose');


async function connectDB(){
 
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE CONNECTED")
    }

    catch(err){
        console.error('DataBase connection error:',err);
        process.exit(1);
    }
}

module.exports = connectDB;