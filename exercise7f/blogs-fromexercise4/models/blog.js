const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    thanks: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

blogSchema.set("toJSON", {
    transform: (_document, blogToFormat) => {
        blogToFormat.id = blogToFormat._id.toString()
        delete blogToFormat._id
        delete blogToFormat.__v
    }
})

module.exports = mongoose.model("Blog", blogSchema)
