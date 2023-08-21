const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "yashpanchiwala"

exports.registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const anyUser = await User.findOne({ email })

        if (anyUser) {
            return res.status(404).send("User already exist")
        }

        const secPas = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name, email, password: secPas
        })

        const data = {
            user: {
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        res.status(200).send({ authToken })

    } catch (error) {
        res.status(500).send("Some Error Occured")
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send("User Not Found")
        }

        const checkPas = await bcrypt.compare(password, user.password)

        if (!checkPas) {
            return res.status(404).send("Invalid Credential")
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        res.status(200).send({ authToken })

    } catch (error) {
        res.status(500).send("Some Error Occured")
    }
}