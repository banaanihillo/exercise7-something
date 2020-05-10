import React, {useState, useEffect} from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Message from "./components/Message"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import {showNotification} from "./reducers/notificationReducer"

import {useDispatch} from "react-redux"

require("./styles.css")

const App = () => {
    const dispatch = useDispatch()
    //const happy = useSelector(state => state.happy)
    const [blogs, setBlogs] = useState([])
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    /*
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    */
    const referenceToBlogForm = React.createRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs(blogs.reverse(blogs.sort((comparable1, comparable2) =>
                    comparable1.thanks - comparable2.thanks
                )))
            )
    }, [])

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

    const createBlog = (blogObject) => {
        referenceToBlogForm.current.toggleVisibility()

        blogService
            .createBlog({
                title: blogObject.title,
                author: blogObject.author,
                url: blogObject.url
            })
            .then(createdBlog => {
                setBlogs(blogs.concat(createdBlog))
            })
            .catch(error => {
                console.log(error)
                const notification = `Creation of a new blog failed: ${error}`
                dispatch(showNotification(notification, 10000))
            })
        /*
        setMessage(`Successfully added ${blogObject.title} by ${blogObject.author}.`)
        console.log(message)
        setTimeout(() => {
            setMessage(null)
        }, 6000)
        */
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

    const addThanks = (id) => {
        const blogToFind = blogs.find(blogToUpdate => blogToUpdate.id === id)
        const blogToThank = {...blogToFind, thanks: (blogToFind.thanks + 1)}
        blogService
            .updateBlog(id, blogToThank)
            .then(updatedBlog => {
                setBlogs(blogs.map(blog =>
                    (blog.id !== id)
                        ? blog
                        : updatedBlog
                ))
                const notification = `Added thanks for ${updatedBlog.title}.`
                dispatch(showNotification(notification))
            })
            .catch(error => {
                console.log(error)
                /*
                setErrorMessage("Something went wrong")
                setTimeout(() => {
                    setErrorMessage(null)
                }, 6000)
                */
            })
    }

    const deleteBlog = (id) => {
        if (window.confirm(`Are you sure you want to remove ${id}?`)) {
            blogService
                .deleteBlog(id)
                .then(() => {
                    setBlogs(blogs.filter(blog => blog.id !== id))
                    /*
                    setMessage(
                        `Removed ${id} successfully.`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 6000)
                    */
                })
                .catch(error => {
                    console.log(error)
                    /*
                    setErrorMessage("Removal failed for some reason")
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 6000)
                    */
                })
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
