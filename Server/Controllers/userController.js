const userModel = require("../Models/userModels")
const bcrypt = require("bcrypt")
const { json } = require("express")
const jwt = require("jsonwebtoken")
const validator = require("validator")




const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" })
}




const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) return res.status(404).json("All Fileds are Required")
        let user = await userModel.findOne({ email })
        if (user) return res.status(404).json("User is Already Exist ")


        if (!validator.isEmail(email)) return res.status(404).json("Email must be valid Email")

        // if (!validator.isStrongPassword(password)) return res.status(404).json("Password must be Strong...")


        user = new userModel({ name, email, password })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = createToken(user._id)

        res.status(200).json({  user, token })
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
}




const LoginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(404).json("All Fileds are Required")

        let user = await userModel.findOne({ email })

        if (!user) return res.status(404).json("User Not Found ")

        const IsValidPassword = await bcrypt.compare(password, user.password)

        if (!IsValidPassword) return res.status(404).json("Password Not Correct ")

        const token = createToken(user._id)

        res.status(200).json({ user, token })

    } catch (e) {

        console.log(e);

        res.status(500).json(e)

    }
}


const findUser = async (req, res) => {
    const { id } = req.params
    try {
        let user = await userModel.findById(id)
        if (!user) return res.status(404).json("User Not Found ")

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(404).json(error);

    }

}


const getUsers = async (req, res) => {
    try {
        let users = await userModel.find()

        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error);

    }

}
module.exports = { registerUser, LoginUser, findUser, getUsers }