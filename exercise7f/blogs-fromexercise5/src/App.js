import React, {useState, useEffect} from "react"
import Blog from "./components/Blog"
import User from "./components/User"
import loginService from "./services/login"
import Message from "./components/Message"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import {showNotification} from "./reducers/notificationReducer"
import {
    initializeBlogs, addBlog, thankBlog, removeBlog, commentBlog
} from "./reducers/blogReducer"
import {addUser, initializeUsers} from "./reducers/userReducer"
import {useDispatch, useSelector} from "react-redux"
import UserForm from "./components/UserForm"
import {setLoggedIn} from "./reducers/loginReducer"
import {Switch, Route, Link, useRouteMatch} from "react-router-dom"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
require("./styles.css")

const App = () => {
    const dispatch = useDispatch()
    //const happy = useSelector(state => state.happy)

    const blogs = useSelector(state => {
        return state.blogs.reverse(
            state.blogs.sort((comparable, comparator) =>
                (comparable.thanks - comparator.thanks)
            )
        )
    })
    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    //const [user, setUser] = useState(null)
    const users = useSelector(state => state.users)
    const loggedInUser = useSelector(state => state.loggedIn)
    /*
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    */
    const referenceToBlogForm = React.createRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])


    useEffect(() => {
        const currentlyLoggedIn = window.localStorage.getItem("currentlyLoggedIn")
        if (currentlyLoggedIn) {
            dispatch(setLoggedIn(JSON.parse(currentlyLoggedIn)))
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const loggedIn = await loginService.login({
                userName, password
            })
            window.localStorage.setItem(
                "currentlyLoggedIn", JSON.stringify(loggedIn)
            )
            dispatch(setLoggedIn(loggedIn))
            setUserName("")
            setPassword("")
        } catch (error) {
            console.log(error)
            /*
            setErrorMessage("Incorrect login info.")
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            */
        }
    }

    const createBlog = (blog) => {
        referenceToBlogForm.current.toggleVisibility()
        
        try {
            dispatch(addBlog(blog))
            const notification = `Added new blog: ${blog.title}.`
            dispatch(showNotification(notification))
        } catch (error) {
            console.log(error)
            const notification = `Creation of a new blog failed: ${error}`
            dispatch(showNotification(notification, 10000))
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel = "Log in">
            <LoginForm
                userName = {userName}
                password = {password}
                handleUserNameChange = {({target}) => setUserName(target.value)}
                handlePasswordChange = {({target}) => setPassword(target.value)}
                handleSubmit = {handleLogin}
            />
        </Togglable>
    )

    const blogForm = () => (
        <Togglable buttonLabel = "Click to create a new blog" ref = {referenceToBlogForm}>
            <BlogForm createBlog = {createBlog} />
        </Togglable>
    )

    const createUser = (user) => {
        dispatch(addUser(user))
        dispatch(showNotification(`Added a new user: ${user.userName}.`))
    }

    const userForm = () => (
        <Togglable buttonLabel = "Add a new user">
            <UserForm createUser = {createUser} />
        </Togglable>
    )

    const addThanks = (blog) => {
        try {
            dispatch(thankBlog(blog))
            const notification = `Added thanks for ${blog.title}.`
            dispatch(showNotification(notification))
        } catch (error) {
            console.log(error)
            dispatch(showNotification(`Gratitude failure: ${error}`, 10000))
        }
    }

    const deleteBlog = (blog) => {
        if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
            try {
                dispatch(removeBlog(blog))
                dispatch(showNotification(`Removed ${blog.title} successfully.`))
            } catch (error) {
                console.log(error)
                dispatch(showNotification(`Unsuccessful removal: ${error}`))
            }
        }
    }

    const addComment = (blog, comment) => {
        dispatch(commentBlog(blog, comment))
        dispatch(showNotification(`Added comment "${comment}" to ${blog.title}.`))
    }

    const userMatch = useRouteMatch("/users/:id")
    const individualUser = (userMatch)
        ? users.find(user => user.id === userMatch.params.id)
        : null
    
    const blogMatch = useRouteMatch("/blogs/:id")
    const individualBlog = (blogMatch)
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    return (
        <div>
            
            {(loggedInUser === null)
                ? loginForm()
                : <div>
                    <Link to = "/"> Main page </Link>
                    <Link to = "/blogs"> Blogs </Link>
                    <Link to = "/users"> Users </Link>
                    <br />
                    <h1> Blog application </h1>
                    <Message />
                    <Switch>
                        <Route path = "/blogs/:id">
                            <Blog
                                blog = {individualBlog}
                                addThanks = {addThanks}
                                deleteBlog = {deleteBlog}
                                user = {loggedInUser}
                                addComment = {addComment}
                            />
                            <br />
                            <Link to = "/blogs"> Back to list of blogs </Link>
                        </Route>
                        <Route path = "/blogs">
                            <Blogs blogs = {blogs} blogForm = {blogForm} />
                        </Route>

                        <Route path = "/users/:id">
                            <User user = {individualUser} />
                            <br />
                            <Link to = "/users"> Back to list of users </Link>
                        </Route>
                        <Route path = "/users">
                            <Users users = {users} userForm = {userForm} />
                        </Route>
                        <Route path = "/">
                            <p> Logged in as {loggedInUser.userName}
                                <button onClick = {() => {
                                    window.localStorage.removeItem("currentlyLoggedIn")
                                    dispatch(setLoggedIn(null))
                                    dispatch(showNotification("Logged out successfully."))
                                }}>
                                    Log out
                                </button>
                            </p>
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

export default App
