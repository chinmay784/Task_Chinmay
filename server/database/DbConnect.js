const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(() =>{
        console.log("MongoDB is connected successfully");
    })
    .catch((error) =>{
        console.log("MongoDB connection failed", error.message);
    })
}