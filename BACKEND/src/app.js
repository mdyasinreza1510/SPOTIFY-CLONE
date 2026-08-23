const express = require ('express');
const cookieParser = require ('cookie-parser');



const app = express();
app.use(express.json());//taki req.body se data aaske
app.use(cookieParser());//taki cookies me data save krske



module.exports = app;