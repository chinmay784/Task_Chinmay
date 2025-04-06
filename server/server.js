const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { dbConnect } = require("./database/DbConnect");
const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");

const app = express();

dbConnect();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/user" , userRoute);
app.use("/api/post", postRoute)


app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})