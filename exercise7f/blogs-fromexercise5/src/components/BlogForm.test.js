import "@testing-library/jest-dom/extend-expect"
import {prettyDOM} from "@testing-library/dom"
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import BlogForm from "./blogForm"


test("BlogForm correctly submits the input data", () => {
    const addBlog = jest.fn()
    const createBlog = jest.fn()
    const component = render(
        <BlogForm
            addBlog = {addBlog}
            createBlog = {createBlog}
        />
    )

    const newTitle = component.container.querySelector("#Title")
    const newAuthor = component.container.querySelector("#Author")
    const newAddress = component.container.querySelector("#URL")
    const form = component.container.querySelector("form")

    fireEvent.change(newTitle, {
        target: {value: "Yea, really"}
    })
    fireEvent.change(newAuthor, {
        target: {value: "A Real Author"}
    })
    fireEvent.change(newAddress, {
        target: {value: "but no real address"}
    })
    console.log(prettyDOM(form))
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("Yea, really")
    expect(createBlog.mock.calls[0][0].author).toBe("A Real Author")
    expect(createBlog.mock.calls[0][0].url).toBe("but no real address")
})
console.log("yep")
