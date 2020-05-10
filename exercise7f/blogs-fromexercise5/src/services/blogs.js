import axios from "axios"
const address = "/api/blogs"

let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(address)
    const response = request.data
    return response
}

const createBlog = async (newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(address, newObject, config)
    return response.data
}

const updateBlog = (id, objectToUpdate) => {
    const request = axios.put(`${address}/${id}`, objectToUpdate)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.delete(`${address}/${id}`, config)
    return request.then(response => response.data)
}

export default {
    getAll,
    createBlog,
    updateBlog,
    setToken,
    deleteBlog
}

