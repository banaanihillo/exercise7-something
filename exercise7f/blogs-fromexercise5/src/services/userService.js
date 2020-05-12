import axios from "axios"
const address = "http://localhost:3001/api/users"

const getUsers = async () => {
    const response = await axios.get(address)
    return response.data
}

const createUser = async (newUser) => {
    const createdUser = {
        userName: newUser.userName,
        name: newUser.name,
        password: newUser.password
    }
    const response = await axios.post(address, createdUser)
    return response.data
}

export default {
    getUsers,
    createUser
}
