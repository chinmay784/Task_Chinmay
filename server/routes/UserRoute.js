const express = require("express");
const { register, login, profile } = require("../controllers/userController");
const { userAuthMiddelwere } = require("../middelwere/userMiddelWere");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/profile",userAuthMiddelwere,profile);

module.exports = router;



// API to register a user
//http://localhost:5000/api/user/register
// API to login a user
//http://localhost:5000/api/user/login
// API to get user profile
//http://localhost:5000/api/user/profile (in This route we use userAuthMiddelwere to protect the route and provide the token in the header)