import axios from "axios"
const address = "http://localhost:3001/api/blogs"

let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getBlogs = async () => {
    const response = await axios.get(address)
    return response.data
}

const createBlog = async (blogObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const createdBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        thanks: 0,
        id: Math.ceil(Math.random() * 1000000000)
    }
    const response = await axios.post(address, createdBlog, config)
    return response.data
}

const thankBlog = async (blog) => {
    const thankedBlog = {...blog, thanks: (blog.thanks + 1)}
    const response = await axios.put(`${address}/${blog.id}`, thankedBlog)
    return response.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.delete(`${address}/${blog.id}`, config)
    return response.data
}

export default {
    getBlogs,
    createBlog,
    setToken,
    thankBlog,
    deleteBlog
}
