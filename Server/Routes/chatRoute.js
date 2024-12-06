const { createChat, findChats, findUserChats } = require("../Controllers/chatController")

const express = require("express")
const router = express.Router()
router.post("/", createChat)
router.get("/:id", findUserChats)
router.get("/find/:firstId/:secondId", findChats)

module.exports = router 