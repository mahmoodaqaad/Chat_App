const messageModel = require("../Models/messageModel")




// create message

        
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body

    const message = new messageModel({
        chatId, senderId, text
    })
    try {

        const response = await message.save()

        res.status(200).json(response)
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }

}
// getting message


const getMessages = async (req, res) => {
    const { chatId } = req.params;


    try {
        const message = await messageModel.find({ chatId })

        res.status(200).json(message)


    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
}


module.exports = { createMessage, getMessages }