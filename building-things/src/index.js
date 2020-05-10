import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import PromisePolyfill from "promise-polyfill"
if (!window.Promise) {
    window.Promise = PromisePolyfill
}

const hello = (world) => {
    console.log(`Hello, ${world}!`)
}
console.log(hello)

ReactDOM.render(<App />, document.getElementById("root"))
