// create chat

const chatModel = require("../Models/chatModel")

// getallChats

// findCahts


const createChat = async (req, res) => {
    const { firstId, secondId } = req.body
    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })
        if (chat) return res.status(200).json(chat);


        const newChat = new chatModel({
            members: [firstId, secondId]

        })
        const response = await newChat.save()

        res.status(200).json(response)

    } catch (e) {
        console.log(e);
        res.status(500).json(e)

    }
}

const findUserChats = async (req, res) => {
    const { id } = req.params
    try {
        const chat = await chatModel.find({
            members: { $in: [id] }

        })

        res.status(200).json(chat)


    } catch (e) {
        console.log(e);
        res.status(500).json(e)

    }
}
const findChats = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chat = await chatModel.find({
            members: { $in: [firstId, secondId] }

        })

        res.status(200).json(chat)


    } catch (e) {
        console.log(e);
        res.status(500).json(e)

    }
}


module.exports = { createChat, findUserChats, findChats }