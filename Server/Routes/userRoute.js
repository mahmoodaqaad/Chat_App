const express = require("express")
const router = express.Router()
const { registerUser, LoginUser ,findUser,getUsers} = require("../Controllers/userController")
 
router.post("/register", registerUser)
router.post("/login", LoginUser)
router.get("/user/:id", findUser)
router.get("/", getUsers)
module.exports = router