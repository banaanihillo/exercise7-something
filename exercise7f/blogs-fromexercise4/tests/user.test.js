const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const user = supertest(app)

test("Incorrect user data input results in a 400 Bad Request", async () => {
    const badNamingConvention = {
        user: "O",
        name: "O Seung Hwan",
        password: "The Quality of the Passphrase Is Irrelevant Here"
    }
    await user
        .post("/api/users")
        .send(badNamingConvention)
        .expect(400)
})

test("Password input whose length is under 3 results in a 400", async () => {
    const considerUsingPasswordManager = {
        user: "Password",
        name: "Oblivious User",
        password: "OK"
    }
    await user
        .post("/api/users")
        .send(considerUsingPasswordManager)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})
