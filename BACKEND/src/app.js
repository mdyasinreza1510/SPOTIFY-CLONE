const express = require ('express');
const cookieParser = require ('cookie-parser');
const authRoutes= require ('./routes/auth.routes')



const app = express();
app.use(cookieParser());//taki cookies me data save krske
app.use(express.json());//taki req.body se data aaske







        //api defination
app.use("/api/auth/",authRoutes);



module.exports = app