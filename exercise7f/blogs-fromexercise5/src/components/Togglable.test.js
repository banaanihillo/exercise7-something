import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, fireEvent} from "@testing-library/react"
import Togglable from "./Togglable"

describe("The Togglable component", () => {
    let component
    beforeEach(() => {
        component = render(
            <Togglable buttonLabel = "Expand">
                <div className = "childElement" />
            </Togglable>
        )
    })

    test("Successfully renders props children", () => {
        expect(
            component.container.querySelector(".childElement")
        ).toBeDefined()
    })

    test("Does not display children by default", () => {
        const linssipapu = component.container.querySelector(".kinderGarten")
        expect(linssipapu).toHaveStyle("display: none")
    })

    test("Correctly displays the children after clicking the button", () => {
        const button = component.getByText("Expand")
        fireEvent.click(button)
        const puuroherne = component.container.querySelector(".kinderGarten")
        expect(puuroherne).not.toHaveStyle("display: none")
    })

    test("Hides the information by clicking the associated button", () => {
        const expandButton = component.getByText("Expand")
        fireEvent.click(expandButton)
        const collapseButton = component.getByText("Hide form")
        fireEvent.click(collapseButton)
        const soykidney = component.container.querySelector(".kinderGarten")
        expect(soykidney).toHaveStyle("display: none")
    })
})
