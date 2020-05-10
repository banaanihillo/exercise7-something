const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const address = process.env.MONGODB_URI
async function connectToMongo() {
    mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}
connectToMongo().catch((error) => {
    console.log(`Could not connect to Mongo: ${error}`)
})

const tokenGrabber = (request, _response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")){
        request.token = authorization.substring(7)
    }
    next()
}
app.use(tokenGrabber)

const errorHandler = (error, _request, response, next) => {
    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "A token is required for postage of a new blog"
        })
    }
    console.log(error.message)
    next(error)
}
app.use(errorHandler)

app.use(cors())
app.use(express.json())
const blogRouter = require("./controllers/blogs")
app.use("/api/blogs", blogRouter)
const userRouter = require("./controllers/users")
app.use("/api/users", userRouter)
const loginRouter = require("./controllers/login")
app.use("/api/login", loginRouter)
if (process.env.NODE_ENV === "test") {
    const testRouter = require("./controllers/test")
    app.use("/api/test", testRouter)
}
module.exports = app
