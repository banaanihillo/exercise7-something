import React, {useState} from "react"
import {Switch, Route, Link, useRouteMatch, useHistory} from "react-router-dom"
import {useField} from "./hooks/index"
import {Table, Form, Button, Alert} from "react-bootstrap"
import styledComponents from "styled-components"
/* import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TextField,
    Button
} from "@material-ui/core/Container"
*/
const Navigation = styledComponents.div`
    background: HotPink;
    padding: 10px;
    color: black
`
require("./styles.css")

const Menu = (props) => {
    
    const {anecdotes, addNewAnecdote, anecdote, setNotification} = props
    
    const padding = {
        paddingRight: 10,
        color: "black"
    }

    return (
        <div>
            <Navigation>
                <Link to = "/" style = {padding}> Anecdotes </Link>
                <Link to = "/create" style = {padding}> Create new anecdote </Link>
                <Link to = "/about" style = {padding}> More information </Link>
            </Navigation>
            
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
        {/* <TableContainer component = {Paper}>
            <Table>
                <TableBody>
                    {anecdotes.map(anecdote =>
                        <TableRow key = {anecdote.id}>
                            <TableCell>
                                <Link to = {`/anecdotes/${anecdote.id}`}>
                                    {anecdote.content}
                                </Link>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        */}
        <Table striped>
            <tbody>
                {anecdotes.map(anecdote =>
                    <tr key = {anecdote.id}>
                        <td>
                            <Link to = {`/anecdotes/${anecdote.id}`}>
                                {anecdote.content}
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
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
            <Form onSubmit = {handleSubmit}>
                <Form.Group>
                    <Form.Label> Content: </Form.Label>
                    <Form.Control {...contentInput} />
                    <Button variant = "secondary" onClick = {contentInput.onReset}>
                        Reset content input
                    </Button>
                    <br />
                    <Form.Label> Author: </Form.Label>
                    <Form.Control {...authorInput} />
                    <Button variant = "secondary" onClick = {authorInput.onReset}>
                        Reset author input
                    </Button>
                    <br />
                    <Form.Label> URL for more info: </Form.Label>
                    <Form.Control {...infoInput} />
                    <Button variant = "secondary" onClick = {infoInput.onReset}>
                        Reset URL input
                    </Button>
                    <br />
                    <Button variant = "primary" type = "submit">
                        Add new anecdote
                    </Button>
                </Form.Group>
            </Form>
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
        //<Container>
        <div className = "container">
            <h1> Software anecdotes </h1>
            {notification
                ? <Alert variant = "success"> {notification} </Alert>
                : null
            }
            <Menu
                anecdotes = {anecdotes}
                addNewAnecdote = {addNewAnecdote}
                anecdote = {anecdote}
                setNotification = {setNotification}
            />
            <Footer />
        </div>
        //</Container>
    )
}

export default App
