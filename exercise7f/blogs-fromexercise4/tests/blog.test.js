const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blog = supertest(app)
const Blog = require("../models/blog")
const tokenThing = require("jsonwebtoken")
const User = require("../models/user")

const testUser = {
    user: "userForTesting"
}

const blogsForTesting = [
    {
        title: "Not Sure If This Blog Really Has Been Thanked",
        author: "Will C.",
        url: "https://en.wikipedia.org/Gratitude"
    },
    {
        title: "Just a Thankless Blog",
        author: "Insignificant Person",
        url: "the.field.below/is/supposed/to/be/empty"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    const mongoUser = new User(testUser)
    testUser.id = mongoUser._id
    mongoUser.save()
    await Blog.deleteMany({})
    await Blog.insertMany(blogsForTesting)
})

test("The test displays the correct amount of blogs", async () => {
    const response = await blog.get("/api/blogs")
    expect(response.body).toHaveLength(2)
})

test("The blogs are in JSON format", async () => {
    await blog
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("The blog id is in a suitable format", async () => {
    const response = await blog.get("/api/blogs")
    expect(response.body.id).toBeDefined
})

test("Adding new blogs works", async () => {
    const newBlog = {
        title: "How to Add Authorized Entries",
        author: "Author Ice",
        url: "/anew",
        thanks: 2
    }
    const token = tokenThing.sign(testUser, process.env.SECRET)

    await blog
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
    const response = await blog.get("/api/blogs")
    expect(response.body).toHaveLength(blogsForTesting.length + 1)
})

test("Adding thankless blogs works", async () => {
    const thanklessBlog = {
        title: "Adding Incomplete Entries",
        author: "Incomplete Author",
        url: "/no/thanks"
    }
    const token = tokenThing.sign(testUser, process.env.SECRET)
    await blog
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(thanklessBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    const response = await blog.get("/api/blogs")
    expect(response.body.thanks).toBeDefined
})

test("Adding a blog with no title or url is a Bad Request(tm)", async () => {
    const incompleteBlog = {
        title: "A Blog Whose Address Is Unknown",
        author: "Jesus of Nazareth",
        thanks: -2000
    }
    await blog
        .post("/api/blogs")
        .send(incompleteBlog)
        .expect(400)
})

test("Attempting to add a blog without authorization ends up in a 401", async () => {
    const unauthorizedBlog = {
        title: "Irrelevant",
        url: "/forwardslash"
    }
    await blog
        .post("/api/blogs")
        .send(unauthorizedBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})
