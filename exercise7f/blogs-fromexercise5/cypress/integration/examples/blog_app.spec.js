describe("The blog application", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it("front page works", () => {
        cy.contains("Blog")
    })
    it("button for opening the login form works", () => {
        cy.contains("Log in").click()
    })
    it("responds with an error if log-in credentials are incorrect", () => {
        cy.contains("Log in").click()
        cy.get("#userNameInput").type("This user does not exist for sure")
        cy.get("#passwordInput").type("This one is certainly incorrect as well")
        cy.get("#loginButton").click()
        cy.get(".errorMessage")
            .should("contain", "Incorrect login info.")
            .and("have.css", "color", "rgb(139, 0, 139)")
        cy.get("html").should("not.contain", "Logged in")
    })
})

describe("While logged in to the blog application", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/test/reset")
        const user = {
            userName: "testUser",
            name: "This user is using the test",
            password: "This is the passphrase of the user"
        }
        cy.request("POST", "http://localhost:3001/api/users", user)
        cy.Login({userName: "testUser", password: "This is the passphrase of the user"})
    })
    it("the application correctly displays the currently logged-in user", () => {
        cy.contains("Logged in as testUser")
    })
    it("opening the blog form works", () => {
        cy.contains("Click to create a new blog").click()
    })

    it("creating a new blog works", () => {
        cy.CreateBlog({
            title: "Creating New, Authorized Blogs via Cypress",
            author: "Cypressist",
            url: "/whoops",
            user: {
                name: "Whoever you want me to be"
            }
        })
    })
})

describe("After a blog has been created", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/test/reset")
        const user = {
            userName: "testUser",
            name: "This user is using the test",
            password: "This is the passphrase of the user"
        }
        cy.request("POST", "http://localhost:3001/api/users", user)
        cy.Login({userName: "testUser", password: "This is the passphrase of the user"})
        cy.CreateBlog({
            title: "Created by an External Command",
            author: "Command User",
            url: "/commands.js",
            user: {
                name: "This user is using the test"
            }
        })
    })
    it("The new blog is displayed correctly", () => {
        cy.contains("Created by an External Command")
    })

    it("more information can be shown", () => {
        cy.contains("Expand").click()
    })
    it("the blog can be thanked", () => {
        cy.contains("Expand").click()
        cy.contains("Thanks").click()
        cy.contains("Times thanked: 1")
    })

    it("the blog can not be deleted by anyone else", () => {
        const maliciousUser = {
            userName: "notoriousUserWithAFilthyPassword",
            name: "An Evil Party Attempting to Raise All Kinds of Chaos",
            password: "password"
        }
        cy.request("POST", "http://localhost:3001/api/users", maliciousUser)
        cy.Login({userName: "notoriousUserWithAFilthyPassword", password: "password"})
        cy.contains("Expand").click()
        cy.get("html").should("not.contain", "Remove this blog")
    })

    it("the blog can be deleted by the user that added it", () => {
        cy.contains("Expand").click()
        cy.contains("Remove this blog").click()
        cy.get("html").should("not.contain", "Created by an External Command")
    })
})

describe("A list of blogs", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/test/reset")
        const user = {
            userName: "testUser",
            name: "This user is using the test",
            password: "This is the passphrase of the user"
        }
        cy.request("POST", "http://localhost:3001/api/users", user)
        cy.Login({userName: "testUser", password: "This is the passphrase of the user"})
        cy.CreateBlog({
            title: "Created by an External Command",
            author: "Command User",
            url: "/commands.js",
            thanks: 5,
            user: {
                name: "This user is using the test"
            }
        })
        cy.CreateBlog({
            title: "This Thing Should Be on Top",
            author: "Very Grateful",
            url: "/donate",
            thanks: 8,
            user: {
                name: "This user is using the test"
            }
        })
        cy.CreateBlog({
            title: "Just a Dummy",
            author: "Irrelevant",
            url: "probably doesn't even have a website",
            user: {
                name: "This user is using the test"
            }
        })
        cy.CreateBlog({
            title: "One More, Just for Good Measure",
            author: "yksMaxKaks",
            url: "/lastcall",
            thanks: 6,
            user: {
                name: "This user is using the test"
            }
        })
    })

    it("is sorted by the times they've been thanked", () => {
        cy.get(".blogDisplay").then((blogs) => {
            cy.contains("Expand").parent().find("button").click()
            cy.get(blogs[0]).find(".blogThanks").should("contain", "8")
            cy.contains("Expand").parent().find("button").click()
            cy.get(blogs[1]).find(".blogThanks").should("contain", "6")
            cy.contains("Expand").parent().find("button").click()
            cy.get(blogs[2]).find(".blogThanks").should("contain", "5")
            cy.contains("Expand").parent().find("button").click()
            cy.get(blogs[3]).find(".blogThanks").should("contain", "0")
        })
    })
})
