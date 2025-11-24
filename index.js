const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cokieParser = require("cookie-parser");
const connectDB = require("./src/config/db.js");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT || 9000;


connectDB()
.then(() =>{
    app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`)
    })
})
.catch((error) =>{
    console.log("MongoDB connection failed", error.message)

})

