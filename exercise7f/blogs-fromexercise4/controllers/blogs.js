const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const tokenizer = require("jsonwebtoken")

blogRouter.get("/", async (_request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", {userName: 1, name: 1, id: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post("/", async (request, response, next) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    if (!request.token) {
        return response.status(401).json({
            error: "No token provided"
        })
    }
    const verifiedToken = tokenizer.verify(request.token, process.env.SECRET)
    if (!verifiedToken.id) {
        return response.status(401).json({
            error: "Incorrect token"
        })
    }
    const user = await User.findById(verifiedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        thanks: body.thanks || 0,
        comments: body.comments,
        user: user
    })

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog.id)
    await user.save()
    response.json(newBlog.toJSON())
    next()
})

blogRouter.delete("/:id", async (request, response) => {
    const token = tokenizer.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if (token.id !== blog.user.toString()) {
        return response.status(401).json({
            error: "Unauthorized - the blog could not be deleted"
        })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
    const body = request.body
    const originalValues = await Blog.findById(request.params.id)
    const blog = {
        title: body.title || originalValues.title,
        author: body.author || originalValues.author,
        url: body.url || originalValues.url,
        thanks: body.thanks || originalValues.thanks,
        comments: body.comments || originalValues.comments,
        user: originalValues.user
    }
    const modifiedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, {new: true})
    response.json(modifiedBlog.toJSON())
})

module.exports = blogRouter
