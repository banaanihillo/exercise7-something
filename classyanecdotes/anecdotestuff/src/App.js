import React from "react"
import axios from "axios"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anecdotes: [

            ],
            current: 0
        }
    }

    componentDidMount = () => {
        axios
            .get("http://localhost:3001/anecdotes")
            .then(response => {
                this.setState({
                    anecdotes: response.data
                })
            })
            .catch(error => {
                console.log(`Unexpected stuff happened. ${error}`)
            })
    }

    handleClick = () => {
        const current = Math.floor(
            Math.random() * (this.state.anecdotes.length -1)
        )
        this.setState({
            current: current
        })
    }

    render() {
        if (this.state.anecdotes.length === 0) {
            return (
                <div>
                    Nothing to see here, yet.
                </div>
            )
        } else {
            return (
                <div>
                    <h1> Anecdote of the day </h1>
                    <p>
                        {this.state.anecdotes[this.state.current].content}
                    </p>
                    <button onClick = {this.handleClick}>
                        Roll a random anecdote
                    </button>
                </div>
            )
        }
    }
}
export default App
