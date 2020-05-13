const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.post("/", async (request, response) => {
    const body = request.body
    const saltRounds = 10
    if (!body.password || body.password.length <3) {
        return response.status(400).json({error: "Password should be longer than 2"})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    if (!body.userName || body.userName.length <3) {
        return response.status(400).json({error: "Illegal user name"})
    }
    const user = new User({
        userName: body.userName,
        name: body.name,
        passwordHash
    })
    const newUser = await user.save()
    response.json(newUser.toJSON())
})

userRouter.get("/", async (_request, response) => {
    const users = await User
        .find({})
        .populate("blogs", {title: 1, author: 1, url: 1, id: 1})

    response.json(users.map(user => {
        return user.toJSON()
    }))
})

userRouter.get("/:id", async (request, response) => {
    const user = await User
        .findById(request.params.id)
        .populate("blogs", {title: 1, author: 1, url: 1, id: 1})
    
    return response.json(user.toJSON())
})

module.exports = userRouter

