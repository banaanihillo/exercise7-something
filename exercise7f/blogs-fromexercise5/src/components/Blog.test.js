import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, fireEvent} from "@testing-library/react"
import Blog from "./Blog"
import {prettyDOM} from "@testing-library/dom"

test("Rendering the blog works", () => {
    const blog = {
        title: "Something something something",
        author: "An Author",
        url: "an address",
        thanks: 2
    }
    const component = render(
        <Blog blog = {blog} />
    )

    expect(component.container).toHaveTextContent(
        "Something something something"
    )
    expect(component.container).not.toHaveTextContent("an address")
})
describe("Button clicks are working", () => {
    test("Clicking on Expand displays additional information", () => {
        const toggleDisplay = jest.fn()
        const blog = {
            title: "Buttons and Displays",
            author: "Displayist",
            url: "/info",
            thanks: 5,
            user: "User of this test"
        }
        const user = {
            name: "User of this test"
        }
        const component = render(
            <Blog
                blog = {blog}
                toggleDisplay = {toggleDisplay}
                user = {user}
            />
        )
        const expandButton = component.getByText("Expand")
        component.debug()
        expect(component.container).not.toHaveTextContent("Times thanked")

        console.log(prettyDOM(expandButton))
        fireEvent.click(expandButton)
        component.debug()
        expect(component.container).toHaveTextContent("Times thanked")
        expect(component.container).toHaveTextContent("/info")
    })
    test("Clicking on Thanks adds thanks", async () => {
        const toggleDisplay = jest.fn()
        const addThanks = jest.fn()
        const blog = {
            title: "Thank You",
            author: "Thanker",
            url: "/thanks",
            thanks: 7,
            user: "I am using this test"
        }
        const user = {
            name: "I am using this test"
        }
        const component = render(
            <Blog
                blog = {blog}
                toggleDisplay = {toggleDisplay}
                user = {user}
                addThanks = {addThanks} />
        )
        const expandButton = component.getByText("Expand")
        fireEvent.click(expandButton)
        const thanksButton = component.getByText("Thanks")
        fireEvent.click(thanksButton)
        console.log(addThanks.mock)
        fireEvent.click(thanksButton)
        console.log(addThanks.mock)
        expect(addThanks.mock.calls).toHaveLength(2)
    })
})
