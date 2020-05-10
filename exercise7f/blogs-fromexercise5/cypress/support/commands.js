Cypress.Commands.add("Login", ({userName, password}) => {
    cy.request("POST", "http://localhost:3001/api/login", {
        userName, password
    }).then(({body}) => {
        localStorage.setItem("currentlyLoggedIn", JSON.stringify(body))
        cy.visit("http://localhost:3000")
    })
})

Cypress.Commands.add("CreateBlog", ({title, author, url, thanks, user}) => {
    cy.request({
        url: "http://localhost:3001/api/blogs",
        method: "POST",
        body: {
            title,
            author,
            url,
            thanks,
            user
        },
        headers: {
            "Authorization": `Bearer ${JSON.parse(
                localStorage.getItem("currentlyLoggedIn")
            ).token}`
        }
    })
    cy.visit("http://localhost:3000")
})
