const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, minlength: 3, unique: true},
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})
userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (_document, userToFormat) => {
        userToFormat.id = userToFormat._id.toString()
        delete userToFormat._id
        delete userToFormat.__v
        delete userToFormat.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)
