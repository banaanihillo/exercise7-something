import axios from "axios"
const address = "/api/login"


const login = async (credentials) => {
    const response = await axios.post(address, credentials)
    return response.data
}

export default {login}
