import React, {useState, useEffect} from "react"
import axios from "axios"

const useBlogs = (url) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setBlogs(response.data)
            })
    }, [url])

    return blogs
}

const App = () => {
    const [counter, setCounter] = useState(0)
    const [values, setValues] = useState([])
    const blogs = useBlogs(BACKEND_URL)

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className = "container">
            Hello, webpack!
            The counter value is currently {counter}.
            <button onClick = {handleClick}>
                Increase
            </button>
            <p>
                {blogs}
            </p>
            <p>
                {BACKEND_URL}
            </p>
        </div>
    )
}

export default App
