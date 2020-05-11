import React, {useState, useEffect} from "react"
import Blog from "./components/Blog"
//import outdatedBlogService from "./services/blogs"
import blogService from "./services/blogService"
import loginService from "./services/login"
import Message from "./components/Message"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import {showNotification} from "./reducers/notificationReducer"
import {initializeBlogs, addBlog, thankBlog, removeBlog} from "./reducers/blogReducer"
import {useDispatch, useSelector} from "react-redux"
require("./styles.css")

const App = () => {
    const dispatch = useDispatch()
    //const happy = useSelector(state => state.happy)

    const blogs = useSelector(state => state.blogs)
    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    /*
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    */
    const referenceToBlogForm = React.createRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])


    useEffect(() => {
        const currentlyLoggedIn = window.localStorage.getItem("currentlyLoggedIn")
        if (currentlyLoggedIn) {
            const user = JSON.parse(currentlyLoggedIn)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                userName, password
            })
            window.localStorage.setItem(
                "currentlyLoggedIn", JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setUser(user)
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
    

    return (
        <div>
            <h1> Blog application </h1>
            <Message />
            {(user === null)
                ? loginForm()
                : <div>
                    <p> Logged in as {user.userName}
                        <button onClick = {() => {
                            window.localStorage.removeItem("currentlyLoggedIn")
                            setUser(null)
                            /*
                            setMessage("Logged out successfully.")
                            setTimeout(() => {
                                setMessage(null)
                            }, 3000)
                            */
                        }}>
                            Log out
                        </button>
                    </p>
                    {blogForm()}
                    <h3> List of blogs </h3>
                    {blogs.map(blog =>
                        <Blog
                            key = {blog.id}
                            blog = {blog}
                            addThanks = {addThanks}
                            deleteBlog = {deleteBlog}
                            user = {user}
                        />
                    )}
                </div>
            }
        </div>
    )
}

export default App
