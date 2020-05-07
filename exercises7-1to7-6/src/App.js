import React, {useState} from "react"
import {Switch, Route, Link, useRouteMatch, useHistory} from "react-router-dom"
import {useField} from "./hooks/index"
require("./styles.css")

const Menu = (props) => {
    
    const {anecdotes, addNewAnecdote, anecdote, setNotification} = props

    const padding = {
        paddingRight: 5
    }

    return (
        <div>

            <Link to = "/" style = {padding}> Anecdotes </Link>
            <Link to = "/create" style = {padding}> Create new anecdote </Link>
            <Link to = "/about" style = {padding}> More information </Link>
            
            <Switch>
                <Route path = "/create">
                    <CreateNew
                        addNewAnecdote = {addNewAnecdote}
                        setNotification = {setNotification}
                    />
                </Route>
                <Route path = "/about">
                    <About />
                </Route>
                <Route path = "/anecdotes/:id">
                    <Anecdote anecdote = {anecdote} />
                </Route>
                <Route path = "/">
                    <AnecdoteList anecdotes = {anecdotes} />
                </Route>
            </Switch>

        </div>
    )
}

const Anecdote = (props) => {
    const {anecdote} = props
    return (
        <div>
            <h2> {anecdote.content} </h2>
            <p> Author: <strong> {anecdote.author} </strong> </p>
            <p> Votes given to this anecdote: {anecdote.votes} </p>
            <p> For more information, visit {anecdote.info} </p>
        </div>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2> Anecdotes </h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key = {anecdote.id}>
                    <Link to = {`/anecdotes/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>
            )}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2> About anecdote app </h2>
        <p> According to Wikipedia: </p>
        
        <em>
            An anecdote is a brief,
            revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter
            but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative.
            An anecdote is "a story with a point."
        </em>
        
        <p>
            Software engineering is full of excellent anecdotes,
            at this app you can find the best and add more.
        </p>
    </div>
)

const Footer = () => (
    <div>
        <br />
        Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">
            Full Stack -websovelluskehitys
        </a>.
        <br />
        See <a href="https://github.com/fullstack-hy2020/routed-anecdotes">
            https://github.com/fullstack-hy2019/routed-anecdotes
        </a> for the source code.
    </div>
)

const CreateNew = (props) => {
    const contentInput = useField("content")
    const authorInput = useField("author")
    const infoInput = useField("info")

    const history = useHistory()

    const {addNewAnecdote, setNotification} = props

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewAnecdote({
            content: contentInput.value,
            author: authorInput.value,
            info: infoInput.value,
            votes: 0
        })
        history.push("/")

        setNotification(`Successfully added ${contentInput.value}.`)
        setTimeout(() => {
            setNotification(null)
        }, 10000)

    }

    return (
        <div>
            <h2> Create a new anecdote </h2>
            <form>
                <div>
                    Content:
                    <input {...contentInput} />
                    <button onClick = {contentInput.onReset}> Reset content input </button>
                </div>
                <div>
                    Author:
                    <input {...authorInput} />
                    <button onClick = {authorInput.onReset}> Reset author input </button>
                </div>
                <div>
                    URL for more info:
                    <input {...infoInput} />
                    <button onClick = {infoInput.onReset}> Reset URL input </button>
                </div>
                <button onClick = {handleSubmit}> Create </button>
            </form>
        </div>
    )

}

const App = () => {
    //const [page, setPage] = useState("anecdoteList")
    
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2
        }
    ])
    
    const [notification, setNotification] = useState(null)

    const addNewAnecdote = (anecdote) => {
        anecdote.id = Math.ceil(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }
    /*
    const anecdoteById = (id) => (
        anecdotes.find(anecdote =>
            anecdote.id === id
        )
    )
    */
    /*
    const vote = (id) => {
        const anecdoteToVote = anecdoteById(id)
        const votedAnecdote = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        setAnecdotes(anecdotes.map(anecdote =>
            (anecdote.id === id)
                ? votedAnecdote
                : anecdote)
        )
    }
    */
    /*
    const goToPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }
    */
    /*
    const content = () => {
        if (page === "anecdoteList") {
            return <AnecdoteList anecdotes = {anecdotes} />
        } else if (page === "createNew") {
            return <CreateNew />
        } else {
            return <About />
        }
    }
    */
    
    const match = useRouteMatch("/anecdotes/:id")
    const anecdote = (
        (match)
        ? anecdotes.find(anecdote => {
            return anecdote.id === Number(match.params.id)
        })
        : null
    )

    return (
        <div>
            <h1> Software anecdotes </h1>
            <Menu
                anecdotes = {anecdotes}
                addNewAnecdote = {addNewAnecdote}
                anecdote = {anecdote}
                setNotification = {setNotification}
            />
            {notification
                ? <p className = "notification"> {notification} </p>
                : null
            }
            <Footer />
        </div>
    )
}

export default App
