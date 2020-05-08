import React, {useState, useEffect} from "react"
import axios from "axios"

const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useResource = (address) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(address)
            .then(response => {
                setResources(response.data)
            })
            .catch((error) => {
                console.log(`Something unexpected happened: ${error}`)
            })
    },
    [address]
    )

    const create = async (resource) => {
        const response = await axios.post(address, resource)
        setResources(resources.concat(response.data))
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

const App = () => {
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const name = useField("text")
    const number = useField("text")

    const [blogs, blogService] = useResource("http://localhost:3002/blogs")
    const [persons, personService] = useResource("http://localhost:3002/persons")

    const handleBlogSubmission = (event) => {
        event.preventDefault()
        blogService.create({
            title: title.value,
            author: author.value,
            url: url.value
        })
    }
    const handlePersonSubmission = (event) => {
        event.preventDefault()
        personService.create({
            name: name.value,
            number: number.value
        })
    }

    return (
        <div>
            <h1> Application of all kinds of things </h1>
            <h2> Blogs </h2>
            <form onSubmit = {handleBlogSubmission}>
                Title: <input {...title} /> <br/>
                Author: <input {...author} /> <br/>
                URL: <input {...url} /> <br/>
                <button> Create new blog </button>
            </form>
            {blogs.map(blog =>
                <li key = {blog.id}>
                    {blog.title}, by {blog.author}: {blog.url}
                </li>
            )}

            <h2> Persons </h2>
            <form onSubmit = {handlePersonSubmission}>
                Name: <input {...name} />
                Number: <input {...number} />
                <button> Create new person </button>
            </form>
            {persons.map(person =>
                <li key = {person.id}>
                    {person.name}: {person.number}
                </li>
            )}
        </div>
    )
}

export default App
