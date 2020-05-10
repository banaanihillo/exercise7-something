const tokenGenerator = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
    const body = request.body
    const user = await User.findOne({userName: body.userName})
    const authorized = (user === null)
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!authorized || !user) {
        return response.status(401).json({error: "Incorrect login info"})
    }
    const kaurapuuro = {
        userName: user.userName,
        id: user.id
    }
    const token = tokenGenerator.sign(kaurapuuro, process.env.SECRET)
    response
        .status(200)
        .send({token, userName: user.userName, name: user.name})
})

module.exports = loginRouter
